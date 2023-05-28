import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import styles from "@/app/styles/components/dashboard/users.module.css";

const CreateServiceMenu = ({
  setServices,
  setMenu,
  services,
}: {
  setServices: (services: Array<Service>) => void;
  setMenu: SetMenu;
  services: Array<Service>;
}) => {
  const cookies = useCookies();

  return (
    <Popup
      title="Create service"
      then={() => {
        const app_name = (
          document.getElementById("app_name") as HTMLInputElement
        )?.value;
        request(
          `/create_service`,
          {
            app_name,
            token: cookies[0].token,
          },
          { method: "POST" }
        ).then(
          (res) =>
            res.status === "success" &&
            setServices([
              ...services,
              {
                _id: res._id,
                app_name: app_name,
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
          <label className="mr-2" htmlFor="app_name">
            App name
          </label>
          <input className="input glass white" type="text" id="app_name" />
        </div>
      </div>
    </Popup>
  );
};

export default CreateServiceMenu;
