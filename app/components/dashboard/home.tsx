import styles from "@/app/styles/components/dashboard/home.module.css";
import openContextMenu from "@/app/utils/openContextMenu";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import Icon from "../icons/icon";
import Plus from "../icons/plus";
import CreateServiceMenu from "./home/createServiceMenu";
import ServiceContextMenu from "./home/serviceContextMenu";

const Home = ({
  services,
  setServices,
  setMenu,
  permissions,
}: {
  services: Array<any>;
  setServices: (services: Array<Service>) => void;
  setMenu: SetMenu;
  permissions: Array<Permission>;
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
        {permissions.find((p) => p === "administrator") && (
          <button
            className="button glass flex items-center"
            onClick={() =>
              setMenu(
                <CreateServiceMenu
                  setMenu={setMenu}
                  setServices={setServices}
                  services={services}
                />
              )
            }
          >
            <Icon>
              <Plus />
            </Icon>
            <p>Create new service</p>
          </button>
        )}
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

                <ServiceContextMenu
                  setMenu={setMenu}
                  service={service}
                  setServices={setServices}
                  services={services}
                  permissions={permissions}
                />,

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
