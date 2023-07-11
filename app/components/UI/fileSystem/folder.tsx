import styles from "@/app/styles/components/UI/fileSystem.module.css";
import SolidIcon from "../../icons/solidIcon";
import Folder from "../../icons/paths/folder";
import Element from "./element";

export type FolderElementProps = {
  onSelected: (type: FileSystemElement) => void;
  element: FileSystemElement;
  sortFunction: (a: FileSystemElement, b: FileSystemElement) => number;
  FileElement: (props: any) => React.ReactNode;
  FolderElement: (props: any) => React.ReactNode;
};

const FolderElement = ({
  onSelected,
  element,
  sortFunction,
  FileElement,
  FolderElement,
}: FolderElementProps) => {
  return (
    <div
      className={[styles.elementContainer, styles.folderContainer].join(" ")}
    >
      <div className={styles.folder} onClick={() => onSelected(element)}>
        <SolidIcon>
          <Folder />
        </SolidIcon>
        <p>{element.name}</p>
      </div>
      <div className={styles.subElements}>
        {(element.children || []).sort(sortFunction).map((elt, index) => (
          <Element
            key={element.name + index}
            element={elt}
            onSelected={onSelected}
            sortFunction={sortFunction}
            FileElement={FileElement}
            FolderElement={FolderElement}
          />
        ))}
      </div>
    </div>
  );
};

export default FolderElement;
