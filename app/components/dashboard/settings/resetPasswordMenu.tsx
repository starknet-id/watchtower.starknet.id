import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/components/dashboard/users.module.css";

const ResetPasswordMenu = ({ setMenu }: { setMenu: SetMenu }) => {
  const router = useRouter();
  const cookies = useCookies();

  return (
    <Popup
      title="Change password"
      then={() => {
        const password1 = (
          document.getElementById("password1") as HTMLInputElement
        )?.value;
        const password2 = (
          document.getElementById("password2") as HTMLInputElement
        )?.value;
        if (password1 !== password2) {
          alert("Passwords don't match");
          return;
        }
        request(`/change_password`, {
          new_password: password1,
          token: cookies[0].token,
        }).then((res) => {
          if (res.status === "success")
            cookies[1]("token", "", {
              path: "/",
            });
          router.push("/");
        });
      }}
      buttonName={"Change"}
      setMenu={setMenu}
      cross={true}
    >
      <div className={styles.popupContent}>
        <div className="flex items-center mb-4">
          <label htmlFor="password1" className="mr-2">
            New password
          </label>
          <input className="input glass white" type="password" id="password1" />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="password2" className="mr-2">
            Repeat password
          </label>
          <input className="input glass white" type="password" id="password2" />
        </div>
      </div>
    </Popup>
  );
};

export default ResetPasswordMenu;
