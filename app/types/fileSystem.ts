type FileSystemElement = {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: FileSystemElement[];
  icon?: string;
  color?: string;
  path?: string;
};
