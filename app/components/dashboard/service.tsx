import { useSearchParams } from "next/navigation";
import dashboardStyles from "@/app/styles/dashboard.module.css";
import GenerateTokenButton from "./service/generateTokenButton";
import Code from "../UI/code";
import Icon from "../icons/icon";
import TextDocument from "../icons/paths/textDocument";
import Link from "next/link";
import DeleteServiceButton from "./service/deleteServiceButton";
import styles from "@/app/styles/components/dashboard/service.module.css";

const Service = ({
  services,
  setMenu,
  permissions,
  setServices,
}: {
  services: Array<Service>;
  setMenu: SetMenu;
  permissions: Array<string>;
  setServices: (services: Array<Service>) => void;
}) => {
  const params = useSearchParams();
  const serviceId = params.get("service_id");
  const service = services.find((service) => service._id === serviceId);

  return (
    <div className={styles.container}>
      <div className="flex items-center">
        <h1 className={dashboardStyles.title}>
          Services - {service?.app_name}
        </h1>
        <Link href={`/dashboard?page=logs&services=${serviceId}`}>
          <button className="button glass flex items-center">
            <Icon>
              <TextDocument />
            </Icon>
            <p>View logs</p>
          </button>
        </Link>
      </div>
      <hr className="hr-soft"></hr>
      <Code>
        <div className="text-xs">
          <span className="text-blue-500">POST</span>{" "}
          {process.env.NEXT_PUBLIC_API_URL}/service/add_message
        </div>
        {"{"}
        <div>
          <span className="text-blue-500">{"\t"}&quot;token&quot;</span>:{" "}
          <span className="text-green-500">&quot;your_token&quot;</span>,
        </div>
        <div>
          <span className="text-blue-500">{"\t"}&quot;log&quot;</span>: {"{"}
          <div>
            <span className="text-blue-500">{"\t\t"}&quot;app_id&quot;</span>:{" "}
            <span className="text-green-500">&quot;{serviceId}&quot;</span>,
          </div>
          <div>
            <span className="text-blue-500">{"\t\t"}&quot;type&quot;</span>:{" "}
            <span className="text-green-500">&quot;default&quot;</span>,
          </div>
          <div>
            <span className="text-blue-500">{"\t\t"}&quot;message&quot;</span>:{" "}
            <span className="text-green-500">
              &quot;This is a test message.&quot;
            </span>
            ,
          </div>
          <div>
            <span className="text-blue-500">{"\t\t"}&quot;timestamp&quot;</span>
            : <span className="text-green-500">&quot;1685805954515&quot;</span>
          </div>
          {"\t}"}
        </div>
        {"}"}
      </Code>
      <div className="mt-2">
        {permissions.find((p) => p === "administrator") && service && (
          <>
            <GenerateTokenButton service={service} setMenu={setMenu} />
            <br></br>
            <DeleteServiceButton
              service={service}
              services={services}
              setServices={setServices}
              setMenu={setMenu}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Service;
