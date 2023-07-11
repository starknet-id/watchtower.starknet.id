const Element = ({
  onSelected,
  element,
  sortFunction = () => 0,
  FileElement,
  FolderElement,
}: {
  onSelected: (type: FileSystemElement) => void;
  element: FileSystemElement;
  sortFunction?: (a: FileSystemElement, b: FileSystemElement) => number;
  FileElement: (props: any) => React.ReactNode;
  FolderElement: (props: any) => React.ReactNode;
}) => {
  return (
    <>
      {element.type === "folder"
        ? FolderElement &&
          FolderElement({
            element,
            onSelected,
            sortFunction,
            FileElement,
            FolderElement,
          })
        : FileElement && FileElement({ element, onSelected })}
    </>
  );
};

export default Element;
