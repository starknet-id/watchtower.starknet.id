import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import styles from "@/app/styles/components/dashboard/user.module.css";

const UserContextmenu = ({
  setUsers,
  setMenu,
  users,
  user,
}: {
  setUsers: (users: Array<User>) => void;
  setMenu: SetMenu;
  users: Array<User>;
  user: User;
}) => {
  const cookies = useCookies();

  return (
    <>
      <h2 className="text-outline">{user.username}</h2>
      <div className={styles.contextMenuActions}>
        <button
          className="button glass danger"
          onClick={() =>
            setMenu(
              <Popup
                title="Delete user"
                then={() =>
                  request(
                    `/delete_user`,
                    {
                      user_id: user._id,
                      token: cookies[0].token,
                    },
                    { method: "DELETE" }
                  ).then(
                    (res) =>
                      res.status === "success" &&
                      setUsers(users.filter((u) => u._id !== user._id))
                  )
                }
                buttonName={"Continue"}
                setMenu={setMenu}
                type="error"
                cross={true}
              >
                <p>Are you sure you want to delete this user?</p>
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

export default UserContextmenu;
