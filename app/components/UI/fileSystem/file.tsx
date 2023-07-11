import styles from "@/app/styles/components/UI/fileSystem.module.css";
import SolidIcon from "../../icons/solidIcon";
import IconRouter from "../../icons/iconRouter";

export type FileElementProps = {
  onSelected: (type: FileSystemElement) => void;
  element: FileSystemElement;
};

const FileElement = ({ onSelected, element }: FileElementProps) => {
  return (
    <div
      className={[styles.elementContainer, styles.fileContainer].join(" ")}
      style={{
        color: element.color,
      }}
      onClick={() => onSelected(element)}
    >
      <SolidIcon>
        <IconRouter name={element.icon || ""} />
      </SolidIcon>
      <p>{element.name}</p>
    </div>
  );
};

export default FileElement;
