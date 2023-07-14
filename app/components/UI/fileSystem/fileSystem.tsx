import styles from "@/app/styles/components/UI/fileSystem.module.css";
import Element from "./element";
import SelectBox from "../selectBox";

const FileSystem = ({
  tree,
  onSelected,
  FileElement,
  FolderElement,
  inline = false,
  minimiseFiles = false,
  filter,
}: {
  tree: FileSystemElement[];
  onSelected: (type: FileSystemElement) => void;
  FileElement: (props: any) => React.ReactNode;
  FolderElement: (props: any) => React.ReactNode;
  inline?: boolean;
  minimiseFiles?: boolean;
  filter?: (element: FileSystemElement) => boolean;
}) => {
  // sort elements : folders first, then files
  // and then sort by name
  const sortFunction = (a: FileSystemElement, b: FileSystemElement) => {
    if (a.type === "folder" && b.type === "file") {
      return -1;
    } else if (a.type === "file" && b.type === "folder") {
      return 1;
    } else {
      return a.name.localeCompare(b.name);
    }
  };

  const sorted = tree.sort(sortFunction);

  return (
    <>
      <div className={[styles.container, inline && styles.inline].join(" ")}>
        {sorted.filter(filter || (() => true)).map((element, index) => (
          <Element
            FileElement={FileElement}
            FolderElement={FolderElement}
            element={element}
            sortFunction={sortFunction}
            onSelected={onSelected}
            key={element.name + index}
          />
        ))}
      </div>
      {minimiseFiles && (
        <div className={styles.search}>
          <SelectBox
            placeholder="Types"
            setSelected={(value: string | number) =>
              onSelected(tree[value as number])
            }
            options={sorted.map((element, index) => {
              return {
                value: index,
                name: element.path || "",
              };
            })}
          />
        </div>
      )}
    </>
  );
};

export default FileSystem;
