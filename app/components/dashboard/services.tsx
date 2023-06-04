import styles from "@/app/styles/components/dashboard/home.module.css";
import openContextMenu from "@/app/utils/openContextMenu";
import { useRouter } from "next/navigation";
import Icon from "../icons/icon";
import Plus from "../icons/paths/plus";
import CreateServiceMenu from "./services/createServiceMenu";
import Link from "next/link";
import TextDocument from "../icons/paths/textDocument";
import dashboardStyles from "@/app/styles/dashboard.module.css";

const Services = ({
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

  const getLink = (service: any) => {
    return `/dashboard?page=service&service_id=${service._id}`;
  };

  return (
    <>
      <div className="flex items-center">
        <h1 className={dashboardStyles.title}>Services</h1>
        {permissions.find((p) => p === "administrator") && (
          <button
            className="button glass flex items-center mr-3"
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
        <Link href={`/dashboard?page=logs`}>
          <button className="button glass flex items-center">
            <Icon>
              <TextDocument />
            </Icon>
            <p>View logs</p>
          </button>
        </Link>
      </div>
      <div className={styles.servicesContainer}>
        {services.map((service, index) => (
          <div
            className={styles.service}
            key={`service_${index}`}
            onClick={() => router.push(getLink(service))}
          >
            <p>{service.app_name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Services;
