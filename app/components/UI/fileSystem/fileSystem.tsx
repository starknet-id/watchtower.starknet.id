import Element from "./element";

const FileSystem = ({
  tree,
  onSelected,
  FileElement,
  FolderElement,
}: {
  tree: FileSystemElement[];
  onSelected: (type: FileSystemElement) => void;
  FileElement: (props: any) => React.ReactNode;
  FolderElement: (props: any) => React.ReactNode;
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

  return (
    <>
      {tree.sort(sortFunction).map((element, index) => (
        <Element
          FileElement={FileElement}
          FolderElement={FolderElement}
          element={element}
          sortFunction={sortFunction}
          onSelected={onSelected}
          key={element.name + index}
        />
      ))}
    </>
  );
};

export default FileSystem;
