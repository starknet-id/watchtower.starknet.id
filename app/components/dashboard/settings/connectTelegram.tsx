import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/components/dashboard/users.module.css";

const ConnectTelegram = ({ setMenu }: { setMenu: SetMenu }) => {
  const router = useRouter();
  const cookies = useCookies();

  return (
    <Popup
      title="Change password"
      then={() => {
        const webhook = document.getElementById("webhook") as HTMLInputElement;
        request(`/set_discord_webhook`, {
          new_webhook: webhook.value,
          token: cookies[0].token,
        }).then((res) => {
          if (res.status === "success") setMenu(null);
        });
      }}
      buttonName={"Change"}
      setMenu={setMenu}
      cross={true}
    >
      <></>
    </Popup>
  );
};

export default ConnectTelegram;
