import styles from "@/app/styles/components/dashboard/fileSystem.module.css";
import SolidIcon from "../../icons/solidIcon";
import Folder from "../../icons/paths/folder";
import Element from "./element";

const FolderElement = ({
  name,
  childrenElements,
  sortFunction,
}: {
  name: string;
  childrenElements: FileSystemElement[];
  sortFunction: (a: FileSystemElement, b: FileSystemElement) => number;
}) => {
  return (
    <div
      className={[styles.elementContainer, styles.folderContainer].join(" ")}
    >
      <SolidIcon>
        <Folder />
      </SolidIcon>
      <p>{name}</p>
      <div className={styles.subElements}>
        {childrenElements.sort(sortFunction).map((element, index) => (
          <Element
            id={element.id}
            type={element.type}
            key={element.name + index}
            name={element.name}
            icon={element.icon}
            color={element.color}
            childrenElements={element.children}
            sortFunction={sortFunction}
          />
        ))}
      </div>
    </div>
  );
};

export default FolderElement;
