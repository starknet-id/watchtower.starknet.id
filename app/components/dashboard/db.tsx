import styles from "@/app/styles/components/dashboard/home.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Icon from "../icons/icon";
import Plus from "../icons/paths/plus";
import AddDatabaseMenu from "./db/addDbMenu";
import dashboardStyles from "@/app/styles/dashboard.module.css";
import TextInput from "../UI/textInput";
import { useEffect } from "react";
import request from "@/app/utils/request";
import { useCookies } from "react-cookie";

const Database = ({
  databases,
  setDatabases,
}: {
  databases: Array<Database>;
  setDatabases: (databases: Array<Database>) => void;
  setMenu: SetMenu;
  permissions: Array<Permission>;
}) => {
  const cookies = useCookies();
  const params = useSearchParams();
  const dbId = params.get("db_id");
  const db = databases.find((d) => d._id === dbId);

  useEffect(() => {
    if (db) {
      request(`/edit_db`, {
        token: cookies[0].token,
        db_id: db._id,
        name: db.name,
        connection_string: db.connection_string,
      });
    }
  }, [db]);

  return (
    <div>
      <h1 className={dashboardStyles.title}>Database: {db?.name}</h1>
      <div className="flex items-center">
        <label className="mr-3">Rename: </label>
        <TextInput
          placeholder="Name"
          value={db?.name || ""}
          onChange={(e) => {
            if (db) {
              setDatabases(
                databases.map((t) => {
                  if (t._id === db._id) {
                    return {
                      ...t,
                      name: e.target.value,
                    };
                  }
                  return t;
                })
              );
            }
          }}
        />
      </div>
      <div className="flex items-center">
        <label className="mr-3">Connection string: </label>
        <TextInput
          value={db?.connection_string || ""}
          placeholder="Connection string"
          onChange={(e) => {
            if (db) {
              setDatabases(
                databases.map((t) => {
                  if (t._id === db._id) {
                    return {
                      ...t,
                      connection_string: e.target.value,
                    };
                  }
                  return t;
                })
              );
            }
          }}
        ></TextInput>
      </div>
    </div>
  );
};

export default Database;
