import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/components/dashboard/users.module.css";
import TextInput from "../../UI/textInput";

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
        <TextInput fit={true} id="password1" placeholder="New password" />
        <div className="mt-4" />
        <TextInput fit={true} id="password2" placeholder="Repeat password" />
      </div>
    </Popup>
  );
};

export default ResetPasswordMenu;
