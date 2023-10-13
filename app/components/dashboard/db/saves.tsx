import Popup from "../../UI/popup";
import RelativeDate from "../../UI/relativeDate";
import styles from "../../../styles/components/dashboard/db.module.css";
import request from "@/app/utils/request";
import { useCookies } from "react-cookie";

const Saves = ({
  db,
  saves,
  setMenu,
  setSaves,
}: {
  db: Database;
  saves: Array<DbSave>;
  setMenu: SetMenu;
  setSaves: (saves: Array<DbSave>) => void;
}) => {
  const cookies = useCookies();
  return (
    <Popup title={`Saves (${db.name})`} setMenu={setMenu} actionBar={null}>
      <div className={styles.savesContainer}>
        {saves
          .sort((a, b) => {
            return parseInt(b.timestamp) - parseInt(a.timestamp);
          })
          .map((save, index) => (
            <div className={styles.save} key={`save_${index}`}>
              {save.manual ? <p className={styles.tag}>Manual</p> : null}
              <div className={styles.saveDate}>
                <RelativeDate date={save.timestamp} />
              </div>
              <div className={styles.saveActions}>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() =>
                    request(
                      `/delete_save`,
                      {
                        token: cookies[0].token,
                        save_id: save._id,
                      },
                      {
                        method: "DELETE",
                      }
                    ).then((res) => {
                      if (res.status === "success") {
                        setSaves(
                          saves.filter((s) => {
                            return s._id !== save._id;
                          })
                        );
                      }
                    })
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() =>
                    window.open(
                      `${process.env.NEXT_PUBLIC_API_URL}/download_save?save_id=${save._id}&token=${cookies[0].token}`,
                      "_blank"
                    )
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </div>
            </div>
          ))}
      </div>
    </Popup>
  );
};

export default Saves;
