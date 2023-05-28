import styles from "@/app/styles/components/dashboard/users.module.css";
import openContextMenu from "@/app/utils/openContextMenu";
import Popup from "../UI/popup";
import request from "@/app/utils/request";
import { useCookies } from "react-cookie";
import Icon from "../icons/icon";
import Plus from "../icons/plus";

const Users = ({
  users,
  setUsers,
  setMenu,
}: {
  users: Array<User>;
  setUsers: (services: Array<User>) => void;
  setMenu: SetMenu;
}) => {
  const cookies = useCookies();

  return (
    <>
      <h1 className="text-outline">Users</h1>
      <button
        className="button glass flex items-center"
        onClick={() =>
          setMenu(
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
                  <input
                    className="input glass white"
                    type="text"
                    id="username"
                  />
                </div>
                <div className="flex items-center">
                  <label className="mr-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="input glass white"
                    type="password"
                    id="password"
                  />
                </div>
              </div>
            </Popup>
          )
        }
      >
        <Icon>
          <Plus />
        </Icon>
        <p>Create user</p>
      </button>
      <div className={styles.servicesContainer}>
        {users.map((user, index) => (
          <div
            className={styles.service}
            key={`service_${index}`}
            onContextMenu={(e) =>
              openContextMenu(
                e,
                setMenu,
                <>
                  <h2 className="text-outline">{user.username}</h2>
                  <div className={styles.contextMenuActions}>
                    <button
                      className="button glass danger"
                      onClick={() =>
                        setMenu(
                          <Popup
                            title="Delete service"
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
                                  setUsers(
                                    users.filter((u) => u._id !== user._id)
                                  )
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
                </>,
                400
              )
            }
          >
            <p>{user.username}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
