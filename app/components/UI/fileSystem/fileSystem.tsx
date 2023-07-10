import Element from "./element";

const FileSystem = ({ tree }: { tree: FileSystemElement[] }) => {
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

  return (
    <>
      {tree.sort(sortFunction).map((element, index) => (
        <Element
          id={element.id}
          type={element.type}
          key={element.name + index}
          name={element.name}
          icon={element.icon}
          color={element.color}
          children={element.children}
          sortFunction={sortFunction}
        />
      ))}
    </>
  );
};

export default FileSystem;
