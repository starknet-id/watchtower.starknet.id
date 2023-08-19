import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
const DeleteDbButton = ({
  db,
  databases,
  setDatabases,
  setMenu,
}: {
  db: Database;
  databases: Array<Database>;
  setDatabases: (databases: Array<Database>) => void;
  setMenu: SetMenu;
}) => {
  const cookies = useCookies();
  const router = useRouter();
  return (
    <button
      className="button glass danger"
      onClick={() =>
        setMenu(
          <Popup
            title="Delete database"
            then={() =>
              request(
                `/delete_db`,
                {
                  db_id: db._id,
                  token: cookies[0].token,
                },
                { method: "DELETE" }
              ).then((res) => {
                if (res.status === "success") {
                  setDatabases(databases.filter((d) => d._id !== db._id));
                  router.push("/dashboard?page=dbs");
                }
              })
            }
            buttonName={"Continue"}
            setMenu={setMenu}
            type="error"
            cross={true}
          >
            <p>Are you sure you want to delete this database?</p>
          </Popup>
        )
      }
    >
      Delete database
    </button>
  );
};

export default DeleteDbButton;
