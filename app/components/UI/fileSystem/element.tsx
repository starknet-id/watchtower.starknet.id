import FileElement from "./file";
import FolderElement from "./folder";

const Element = ({
  type,
  id,
  name,
  icon = "",
  color = "",
  childrenElements = [],
  sortFunction = () => 0,
}: {
  type: "folder" | "file";
  id: string;
  name: string;
  icon?: string;
  color?: string;
  childrenElements?: FileSystemElement[];
  sortFunction?: (a: FileSystemElement, b: FileSystemElement) => number;
}) => {
  return type === "folder" ? (
    <FolderElement
      name={name}
      sortFunction={sortFunction}
      childrenElements={childrenElements}
    />
  ) : (
    <FileElement id={id} name={name} color={color} icon={icon} />
  );
};

export default Element;
