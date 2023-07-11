import styles from "@/app/styles/components/dashboard/logs.module.css";
import { useRouter } from "next/navigation";
import CheckboxItem from "../../UI/checkboxItem";
import TypeSystem from "../../UI/fileSystem/typeSystem";
import FileElement, { FileElementProps } from "../../UI/fileSystem/file";
import FolderElement, { FolderElementProps } from "../../UI/fileSystem/folder";

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
          onSelected={(element) => {
            const type = types.find((t) => t._id === element.id);
            const index = targetTypes.findIndex((t) => t._id === element.id);
            if (index === -1 && type) {
              targetTypes.push(type);
            } else {
              targetTypes.splice(index, 1);
            }
            setSearchParams(
              "types",
              targetTypes.map((type) => type._id).join(",")
            );
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
                  targetTypes.find((t) => t._id === props.element.id) &&
                    styles.underline,
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
