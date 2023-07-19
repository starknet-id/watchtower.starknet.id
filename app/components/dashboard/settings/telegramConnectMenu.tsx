import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import TextInput from "../../UI/textInput";

const TelegramConnectMenu = ({ setMenu }: { setMenu: SetMenu }) => {
  const cookies = useCookies();

  return (
    <Popup
      title="Set global telegram chat"
      then={() => {
        const group_id = document.getElementById(
          "group_id"
        ) as HTMLInputElement;
        request(`/set_telegram_chat`, {
          new_group_id: group_id.value,
          token: cookies[0].token,
        });
      }}
      buttonName={"Change"}
      setMenu={setMenu}
      cross={true}
      actionBar={<TextInput id="group_id" placeholder="Telegram chat id" />}
    />
  );
};

export default TelegramConnectMenu;
