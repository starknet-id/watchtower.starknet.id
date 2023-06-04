import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const DeleteUserButton = ({
  setMenu,
  setUsers,
  users,
  user,
}: {
  setMenu: SetMenu;
  setUsers: (users: Array<User>) => void;
  users: Array<User>;
  user: User;
}) => {
  const cookies = useCookies();
  const router = useRouter();
  return (
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
              ).then((res) => {
                if (res.status === "success") {
                  setUsers(users.filter((u) => u._id !== user._id));
                  router.push("/dashboard?page=users");
                }
              })
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
  );
};

export default DeleteUserButton;
