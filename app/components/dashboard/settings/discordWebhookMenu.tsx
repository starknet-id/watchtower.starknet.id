import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import TextInput from "../../UI/textInput";

const DiscordWebhookMenu = ({ setMenu }: { setMenu: SetMenu }) => {
  const router = useRouter();
  const cookies = useCookies();

  return (
    <Popup
      title="Set global Discord webhook"
      then={() => {
        const webhook = document.getElementById("webhook") as HTMLInputElement;
        request(`/set_discord_webhook`, {
          new_webhook: webhook.value,
          token: cookies[0].token,
        });
      }}
      buttonName={"Change"}
      setMenu={setMenu}
      cross={true}
      actionBar={<TextInput id="webhook" placeholder="Discord webhook URL" />}
    />
  );
};

export default DiscordWebhookMenu;
