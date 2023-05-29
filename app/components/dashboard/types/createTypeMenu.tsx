import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import styles from "@/app/styles/components/dashboard/users.module.css";

const CreateTypeMenu = ({
  setTypes,
  setMenu,
  types,
}: {
  setTypes: (types: Array<Type>) => void;
  setMenu: SetMenu;
  types: Array<Type>;
}) => {
  const cookies = useCookies();

  return (
    <Popup
      title="Create group"
      then={() => {
        const name = (document.getElementById("name") as HTMLInputElement)
          .value;
        request(
          `/add_type`,
          {
            name: name,
            token: cookies[0].token,
          },
          { method: "POST" }
        ).then(
          (res) =>
            res.status === "success" &&
            setTypes([
              ...types,
              {
                _id: res._id,
                name: name,
                color: "gray",
                icon: "default",
                importance: 0,
                notifications: [],
              },
            ])
        );
      }}
      buttonName={"Create"}
      setMenu={setMenu}
      cross={true}
    >
      <div className={styles.popupContent}>
        <div className="flex items-center mb-4">
          <label className="mr-2" htmlFor="name">
            Name
          </label>
          <input className="input glass white" type="text" id="name" />
        </div>
      </div>
    </Popup>
  );
};

export default CreateTypeMenu;
