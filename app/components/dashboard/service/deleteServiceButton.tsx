import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const DeleteServiceButton = ({
  service,
  services,
  setServices,
  setMenu,
}: {
  service: Service;
  services: Array<Service>;
  setServices: (services: Array<Service>) => void;
  setMenu: SetMenu;
}) => {
  const cookies = useCookies();
  const router = useRouter();
  return (
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
              ).then((res) => {
                if (res.status === "success") {
                  setServices(services.filter((s) => s._id !== service._id));
                  router.push("/dashboard?page=services");
                }
              })
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
      Delete service
    </button>
  );
};

export default DeleteServiceButton;
