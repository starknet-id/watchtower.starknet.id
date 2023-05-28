import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import styles from "@/app/styles/components/dashboard/home.module.css";
import CopyButton from "../../UI/copyButton";

const ServiceContextMenu = ({
  setServices,
  service,
  setMenu,
  services,
  permissions,
}: {
  setServices: (services: Array<Service>) => void;
  service: Service;
  setMenu: SetMenu;
  services: Array<Service>;
  permissions: Array<Permission>;
}) => {
  const cookies = useCookies();

  return (
    <>
      <h2 className="text-outline">{service.app_name}</h2>
      <div className={styles.contextMenuActions}>
        <button
          className="button glass"
          onClick={() =>
            window.open(`/dashboard?page=service&service_id=${service._id}`)
          }
        >
          Open in new tab
        </button>
        {permissions.find((p) => p === "administrator") && (
          <>
            <button
              className="button glass danger"
              onClick={() =>
                setMenu(
                  <Popup
                    title="Generate new token"
                    then={() =>
                      request(`/regenerate_service_token`, {
                        app_id: service._id,
                        token: cookies[0].token,
                      }).then(
                        (res) =>
                          res.status === "success" &&
                          setMenu(
                            <Popup
                              title="Success"
                              then={() => setMenu(null)}
                              setMenu={setMenu}
                              type="success"
                            >
                              <p>
                                Successfully generated new token for{" "}
                                <strong>{service.app_name}</strong>
                              </p>
                              <div className="flex gap-2">
                                <p className="break-all">{res.token}</p>
                                <div className="w-fit">
                                  <CopyButton text={res.token} />
                                </div>
                              </div>
                            </Popup>
                          )
                      )
                    }
                    buttonName={"Continue"}
                    setMenu={setMenu}
                    type="error"
                    cross={true}
                  >
                    <p>
                      Are you sure you want to generate a new token for{" "}
                      <strong> {service.app_name}</strong>? This will invalidate
                      the old token.
                    </p>
                  </Popup>
                )
              }
            >
              Generate new token
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
                            services.filter((s) => s._id !== service._id)
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
          </>
        )}
      </div>
    </>
  );
};

export default ServiceContextMenu;
