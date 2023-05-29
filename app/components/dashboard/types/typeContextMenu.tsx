import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import styles from "@/app/styles/components/dashboard/users.module.css";

const TypeContextMenu = ({
  setTypes,
  setMenu,
  types,
  type,
}: {
  setTypes: (types: Array<Type>) => void;
  setMenu: SetMenu;
  types: Array<Type>;
  type: Type;
}) => {
  const cookies = useCookies();

  return (
    <>
      <h2 className="text-outline">{type.name}</h2>
      <div className={styles.contextMenuActions}>
        <button
          className="button glass danger"
          onClick={() =>
            setMenu(
              <Popup
                title="Delete group"
                then={() => {
                  console.log(type);
                  request(
                    `/delete_type`,
                    {
                      type_id: type._id,
                      token: cookies[0].token,
                    },
                    { method: "DELETE" }
                  ).then(
                    (res) =>
                      res.status === "success" &&
                      setTypes(types.filter((t) => t._id !== type._id))
                  );
                }}
                buttonName={"Continue"}
                setMenu={setMenu}
                type="error"
                cross={true}
              >
                <p>Are you sure you want to delete this group?</p>
              </Popup>
            )
          }
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default TypeContextMenu;
