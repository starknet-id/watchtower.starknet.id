import styles from "@/app/styles/components/dashboard/logs.module.css";
import { useRouter } from "next/navigation";
import CheckboxItem from "../../UI/checkboxItem";
import TypeSystem from "../../UI/fileSystem/typeSystem";
import FileElement, { FileElementProps } from "../../UI/fileSystem/file";
import FolderElement, { FolderElementProps } from "../../UI/fileSystem/folder";
import { useEffect } from "react";

const LogsFilters = ({
  services,
  targetServiceIds,
  setRefresh,
  types,
  targetTypes,
  setTargetTypes,
}: {
  services: Array<Service>;
  targetServiceIds: Array<string>;
  setRefresh: (refresh: boolean) => void;
  types: Array<Type>;
  targetTypes: Array<Type>;
  setTargetTypes: (targetTypes: Array<Type>) => void;
}) => {
  const router = useRouter();

  const setSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    router.push(`${window.location.pathname}?${params.toString()}`);
    setRefresh(true);
  };

  const fileFilter = (file: FileSystemElement) => {
    // Only show files that are in targetTypes
    if (file.type === "folder") return true;
    const type = types.find((t) => t._id === file.id);
    if (type && !targetTypes.includes(type)) return false;
    return true;
  };

  useEffect(() => {
    setSearchParams("types", targetTypes.map((type) => type._id).join(","));
  }, [targetTypes]);

  const getAllChildren = (element: FileSystemElement) => {
    // Get all folder children recursively
    const result: Array<FileSystemElement> = [];
    if (element.type === "folder") {
      const children = element.children || [];
      children.forEach((child) => {
        result.push(child);
        result.push(...getAllChildren(child));
      });
    }
    return result;
  };

  return (
    <div className={styles.filters}>
      <div className={styles.category}>
        {services.map((service) => (
          <div className={styles.item} key={`service_filter_${service._id}`}>
            <CheckboxItem
              name={service.app_name}
              checked={targetServiceIds.includes(service._id)}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  targetServiceIds.push(service._id);
                } else {
                  targetServiceIds.splice(
                    targetServiceIds.indexOf(service._id),
                    1
                  );
                }
                setSearchParams("services", targetServiceIds.join(","));
              }}
            />
          </div>
        ))}
      </div>
      <section className={styles.container}>
        <TypeSystem
          minimiseFiles
          inline
          filter={fileFilter}
          onSelected={(element) => {
            const setType = (type: Type) => {
              const index = targetTypes.findIndex((t) => t._id === element.id);
              if (index === -1 && type) {
                setTargetTypes([...targetTypes, type]);
              } else {
                const newTargetTypes = [...targetTypes];
                newTargetTypes.splice(index, 1);
                setTargetTypes(newTargetTypes);
              }
            };
            if (element.type === "file") {
              const type = types.find((t) => t._id === element.id);
              if (type) setType(type);
            }
            if (element.type === "folder") {
              const children = getAllChildren(element);
              // Check if any children are in targetTypes
              const childrenInTargetTypes = children.some((child) => {
                const type = types.find((t) => t._id === child.id);
                return type && targetTypes.includes(type);
              });
              if (childrenInTargetTypes) {
                // Remove all children from targetTypes
                const newTargetTypes = [...targetTypes];
                children.forEach((child) => {
                  const type = types.find((t) => t._id === child.id);
                  if (type) {
                    const index = newTargetTypes.findIndex(
                      (t) => t._id === child.id
                    );
                    newTargetTypes.splice(index, 1);
                  }
                });
                setTargetTypes(newTargetTypes);
              } else {
                // Add all children to targetTypes
                const newTargetTypes = [...targetTypes];
                children.forEach((child) => {
                  const type = types.find((t) => t._id === child.id);
                  if (type) newTargetTypes.push(type);
                });
                setTargetTypes(newTargetTypes);
              }
            }
          }}
          types={types}
          FileElement={(props: FileElementProps) => {
            return (
              <div
                className={[
                  styles.fileSystemElement,
                  targetTypes.find((t) => t._id === props.element.id) &&
                    styles.underline,
                ].join(" ")}
              >
                {FileElement(props)}
              </div>
            );
          }}
          FolderElement={(props: FolderElementProps) => {
            return (
              <div
                className={[
                  styles.fileSystemElement,
                  // Check if any children are in targetTypes
                  getAllChildren(props.element).some((child) => {
                    const type = types.find((t) => t._id === child.id);
                    return type && targetTypes.includes(type);
                  }) && styles.underline,
                ].join(" ")}
              >
                {FolderElement(props)}
              </div>
            );
          }}
        />
      </section>
    </div>
  );
};

export default LogsFilters;
