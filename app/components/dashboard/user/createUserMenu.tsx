import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import styles from "@/app/styles/components/dashboard/users.module.css";
import TextInput from "../../UI/textInput";

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
        <TextInput fit={true} id="username" placeholder="Username" />
        <div className="mt-4" />
        <TextInput fit={true} id="password" placeholder="Password" />
      </div>
    </Popup>
  );
};

export default CreateUserMenu;
