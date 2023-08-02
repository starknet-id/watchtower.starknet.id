type Database = {
  _id: string;
  name: string;
  connection_string: string;
  status?: "connected" | "disconnected" | "connecting";
  collections?: Array<any>;
};
