import request from "@/app/utils/request";
import { useCookies } from "react-cookie";
import loadDbs from "./loadDbs";
import Popup from "../../UI/popup";
import { useState } from "react";

const SaveNow = ({
  db,
  setMenu,
  setDatabases,
  databases,
}: {
  db: Database;
  setMenu: SetMenu;
  setDatabases: (databases: Array<Database>) => void;
  databases: Array<Database>;
}) => {
  const cookies = useCookies();
  const [loading, setLoading] = useState(false);
  return (
    <button
      className="button glass filled ml-4"
      onClick={() => {
        if (loading) return;
        setLoading(true);
        setDatabases(
          db
            ? [
                ...databases.filter((d) => d._id !== db._id),
                {
                  ...db,
                  status: "connecting",
                },
              ]
            : databases
        );
        request(`/save_db`, {
          token: cookies[0].token,
          db_id: db?._id,
        }).then((res) => {
          loadDbs(cookies[0].token, setDatabases);
          setLoading(false);
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
      {loading ? "Saving..." : "Save now"}
    </button>
  );
};

export default SaveNow;
