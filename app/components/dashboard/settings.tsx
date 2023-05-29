import { useCookies } from "react-cookie";
import Icon from "../icons/icon";
import Key from "../icons/paths/key";
import ResetPasswordMenu from "./settings/resetPasswordMenu";

const Settings = ({ setMenu }: { setMenu: SetMenu }) => {
  const cookies = useCookies();

  return (
    <>
      <h1 className="text-outline mr-3">Settings</h1>
      <button
        className="button glass flex items-center"
        onClick={() => setMenu(<ResetPasswordMenu setMenu={setMenu} />)}
      >
        <Icon>
          <Key />
        </Icon>
        <p className="ml-1">Change password</p>
      </button>
    </>
  );
};

export default Settings;
