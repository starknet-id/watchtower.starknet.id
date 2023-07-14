import React, { useEffect, useState } from "react";
import FileSystem from "./fileSystem";
import FileElt from "./file";
import FolderElt from "./folder";

const TypeSystem = ({
  types,
  onSelected,
  FileElement = FileElt,
  FolderElement = FolderElt,
  inline = false,
  minimiseFiles = false,
  filter,
}: {
  types: Array<Type>;
  onSelected: (type: FileSystemElement) => void;
  FileElement?: (props: any) => React.ReactNode;
  FolderElement?: (props: any) => React.ReactNode;
  inline?: boolean;
  minimiseFiles?: boolean;
  filter?: (element: FileSystemElement) => boolean;
}) => {
  const [tree, setTree] = useState<FileSystemElement[]>([]);
  useEffect(() => {
    // Types names can contain slashes, e.g. "foo/bar". This means that the type is contained in a folder.
    // This function will create a tree of folders and types, e.g.:
    // [
    //   {
    //     "name": "foo",
    //     "type": "folder",
    //     "children": [
    //        {
    //           "name": "bar",
    //           "type": "file",
    //           "icon": "foo",
    //           "color": "#000000"
    //        }
    //     ]
    //   }
    // ]
    const createTree = (types: Array<Type>): FileSystemElement[] => {
      const tree: FileSystemElement[] = [];
      types.forEach((type) => {
        const typeParts = type.name.split("/");
        let currentFolder = tree;
        typeParts.forEach((part, index) => {
          const existingFolder = currentFolder.find(
            (element) => element.name === part && element.type === "folder"
          );
          if (existingFolder) {
            currentFolder = existingFolder.children || [];
          } else {
            const newFolder: FileSystemElement = {
              id: type._id,
              name: part,
              type: index === typeParts.length - 1 ? "file" : "folder",
              children: [],
              icon: index === typeParts.length - 1 ? type.icon : "",
              color: index === typeParts.length - 1 ? type.color : "",
              path: type.name,
            };
            currentFolder.push(newFolder);
            currentFolder = newFolder.children || [];
          }
        });
      });
      return tree;
    };
    setTree(createTree(types));
  }, [types]);
  return (
    <FileSystem
      FileElement={FileElement}
      FolderElement={FolderElement}
      onSelected={onSelected}
      tree={tree}
      inline={inline}
      minimiseFiles={minimiseFiles}
      filter={filter}
    />
  );
};

export default TypeSystem;
