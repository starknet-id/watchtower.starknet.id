import styles from "@/app/styles/components/dashboard/home.module.css";
import openContextMenu from "@/app/utils/openContextMenu";
import { useRouter } from "next/navigation";
import Popup from "../UI/popup";
import request from "@/app/utils/request";
import { useCookies } from "react-cookie";
import Icon from "../icons/icon";
import Plus from "../icons/plus";

const Home = ({
  services,
  setServices,
  setMenu,
}: {
  services: Array<any>;
  setServices: (services: Array<Service>) => void;
  setMenu: SetMenu;
}) => {
  const router = useRouter();
  const cookies = useCookies();

  const getLink = (service: any) => {
    return `/dashboard?page=service&service_id=${service._id}`;
  };

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-outline mr-3">Logs</h1>
        <button className="button glass flex items-center">
          <Icon>
            <Plus />
          </Icon>
          <p>Create new service</p>
        </button>
      </div>
      <div className={styles.servicesContainer}>
        {services.map((service, index) => (
          <div
            className={styles.service}
            key={`service_${index}`}
            onClick={() => router.push(getLink(service))}
            onContextMenu={(e) =>
              openContextMenu(
                e,
                setMenu,
                <>
                  <h2 className="text-outline">{service.app_name}</h2>
                  <div className={styles.contextMenuActions}>
                    <button
                      className="button glass"
                      onClick={() =>
                        window.open(
                          `/dashboard?page=service&service_id=${service._id}`
                        )
                      }
                    >
                      Open in new tab
                    </button>
                    <button
                      className="button glass danger"
                      onClick={() =>
                        setMenu(
                          <Popup
                            title="Delete service"
                            then={() =>
                              request(
                                `/delete_service`,
                                {
                                  app_id: service._id,
                                  token: cookies[0].token,
                                },
                                { method: "DELETE" }
                              ).then(
                                (res) =>
                                  res.status === "success" &&
                                  setServices(
                                    services.filter(
                                      (s) => s._id !== service._id
                                    )
                                  )
                              )
                            }
                            buttonName={"Continue"}
                            setMenu={setMenu}
                            type="error"
                            cross={true}
                          >
                            <p>Are you sure you want to delete this service?</p>
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
            <p>{service.app_name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
