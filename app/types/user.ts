type User = {
  _id: string;
  username: string;
  password?: string;
  permissions: Permission[];
};
