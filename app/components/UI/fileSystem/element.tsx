import FileElement from "./file";
import FolderElement from "./folder";

const Element = ({
  type,
  id,
  name,
  icon = "",
  color = "",
  children = [],
  sortFunction = () => 0,
}: {
  type: "folder" | "file";
  id: string;
  name: string;
  icon?: string;
  color?: string;
  children?: FileSystemElement[];
  sortFunction?: (a: FileSystemElement, b: FileSystemElement) => number;
}) => {
  return type === "folder" ? (
    <FolderElement
      name={name}
      sortFunction={sortFunction}
      children={children}
    />
  ) : (
    <FileElement id={id} name={name} color={color} icon={icon} />
  );
};

export default Element;
