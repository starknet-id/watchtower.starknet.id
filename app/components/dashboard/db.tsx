import styles from "@/app/styles/components/dashboard/db.module.css";
import { useSearchParams } from "next/navigation";
import dashboardStyles from "@/app/styles/dashboard.module.css";
import TextInput from "../UI/textInput";
import { useEffect, useState } from "react";
import request from "@/app/utils/request";
import { useCookies } from "react-cookie";
import DeleteDbButton from "./db/deleteDbButton";
import loadDbs from "./db/loadDbs";
import ButtonContainer from "../UI/buttonContainer";
import Popup from "../UI/popup";

const Database = ({
  databases,
  setDatabases,
  setMenu,
}: {
  databases: Array<Database>;
  setDatabases: (databases: Array<Database>) => void;
  setMenu: SetMenu;
}) => {
  const cookies = useCookies();
  const params = useSearchParams();
  const dbId = params.get("db_id");
  const db = databases.find((d) => d._id === dbId);
  const [reconnectLoading, setReconnectLoading] = useState(false);

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
      <div className="flex items-center">
        <h1 className={dashboardStyles.title}>Database: {db?.name}</h1>

        <p
          className={[styles.status, styles[db?.status || "connecting"]].join(
            " "
          )}
        >
          {db?.status || "connecting"}
        </p>
        <ButtonContainer loading={reconnectLoading}>
          <button
            className="button glass ml-3"
            onClick={() => {
              setReconnectLoading(true);
              setDatabases(
                databases.map((t) => {
                  if (t._id === db?._id) {
                    return {
                      ...t,
                      status: "connecting",
                    };
                  }
                  return t;
                })
              );
              request(`/check_db_connection`, {
                token: cookies[0].token,
                db_id: db?._id,
              }).then((res) => {
                loadDbs(cookies[0].token, setDatabases);
                setReconnectLoading(false);
                if (res.message) {
                  setMenu(
                    <Popup title={"Error"} setMenu={setMenu} actionBar={null}>
                      {res.message}
                    </Popup>
                  );
                }
              });
            }}
          >
            Reconnect
          </button>
        </ButtonContainer>
      </div>
      <div className="flex items-center my-2">
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
      <div className="flex items-center my-2">
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
      <section className="mb-4">
        <h2>Collections</h2>
        {!db?.collections || db?.collections?.length === 0 ? (
          <>
            <p className="inactive">No collections found</p>
          </>
        ) : (
          db?.collections?.map((c, index) => (
            <div key={`c_${index}`}>➡ {c}</div>
          ))
        )}
      </section>
      {db && (
        <DeleteDbButton
          db={db}
          databases={databases}
          setDatabases={setDatabases}
          setMenu={setMenu}
        />
      )}
    </div>
  );
};

export default Database;
