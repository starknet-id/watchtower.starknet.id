import request from "@/app/utils/request";
import CopyButton from "../../UI/copyButton";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";

const GenerateTokenButton = ({
  service,
  setMenu,
}: {
  service: Service;
  setMenu: SetMenu;
}) => {
  const cookies = useCookies();
  return (
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
              <strong> {service.app_name}</strong>? This will invalidate the old
              token.
            </p>
          </Popup>
        )
      }
    >
      Generate new token
    </button>
  );
};

export default GenerateTokenButton;
