import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import styles from "@/app/styles/components/dashboard/users.module.css";

const CreateUserMenu = ({
  setUsers,
  setMenu,
  users,
}: {
  setUsers: (users: Array<User>) => void;
  setMenu: SetMenu;
  users: Array<User>;
}) => {
  const cookies = useCookies();

  return (
    <Popup
      title="Create user"
      then={() => {
        const username = (
          document.getElementById("username") as HTMLInputElement
        )?.value;
        const password = (
          document.getElementById("password") as HTMLInputElement
        )?.value;
        request(
          `/add_user`,
          {
            username,
            password,
            token: cookies[0].token,
          },
          { method: "POST" }
        ).then(
          (res) =>
            res.status === "success" &&
            setUsers([
              ...users,
              {
                _id: res._id,
                username,
                permissions: [],
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
          <label className="mr-2" htmlFor="username">
            Username
          </label>
          <input className="input glass white" type="text" id="username" />
        </div>
        <div className="flex items-center">
          <label className="mr-2" htmlFor="password">
            Password
          </label>
          <input className="input glass white" type="password" id="password" />
        </div>
      </div>
    </Popup>
  );
};

export default CreateUserMenu;
