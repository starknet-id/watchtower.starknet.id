import request from "@/app/utils/request";

const loadDbs = async (
  token: string,
  setDatabases: (databases: Array<Database>) => void
) => {
  request("/get_dbs", { token: token }).then((res) => {
    if (res.status === "success") {
      setDatabases(res.databases);
    }
  });
};

export default loadDbs;
