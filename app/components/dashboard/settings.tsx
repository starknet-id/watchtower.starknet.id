import Icon from "../icons/icon";
import Key from "../icons/paths/key";
import ResetPasswordMenu from "./settings/resetPasswordMenu";
import styles from "@/app/styles/components/dashboard/settings.module.css";
import Chat from "../icons/paths/chat";
import Mail from "../icons/paths/mail";
import Hashtag from "../icons/paths/hashtag";
import DiscordWebhookMenu from "./settings/discordWebhookMenu";
import dashboardStyles from "@/app/styles/dashboard.module.css";

const Settings = ({
  setMenu,
  permissions,
}: {
  setMenu: SetMenu;
  permissions: Array<Permission>;
}) => {
  return (
    <div>
      <h1 className={dashboardStyles.title}>Settings</h1>
      <hr className="hr-soft"></hr>
      <main className={styles.container}>
        <section className={styles.section}>
          <button
            className="button glass flex items-center"
            onClick={() => setMenu(<ResetPasswordMenu setMenu={setMenu} />)}
          >
            <Icon>
              <Key />
            </Icon>
            <p className="ml-1">Change password</p>
          </button>
        </section>
        <section className={[styles.section, styles.line].join(" ")}>
          <button
            className="button glass flex items-center"
            onClick={() => alert("Not implemented yet")}
          >
            <Icon>
              <Chat />
            </Icon>
            <p className="ml-1">Connect Telegram</p>
          </button>
          <button
            className="button glass flex items-center"
            onClick={() => alert("Not implemented yet")}
          >
            <Icon>
              <Mail />
            </Icon>
            <p className="ml-1">Connect email</p>
          </button>
        </section>
        {permissions.includes("administrator") && (
          <>
            <h2 className="text-outline">Admin</h2>
            <section className={styles.section}>
              <button
                className="button glass flex items-center"
                onClick={() =>
                  setMenu(<DiscordWebhookMenu setMenu={setMenu} />)
                }
              >
                <Icon>
                  <Hashtag />
                </Icon>
                <p className="ml-1">Set Discord Webhook</p>
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Settings;
