import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import GenerateTokenButton from "./service/generateTokenButton";
import Code from "../UI/code";
import Icon from "../icons/icon";
import TextDocument from "../icons/paths/textDocument";
import Link from "next/link";

const Service = ({
  services,
  setMenu,
  permissions,
}: {
  services: Array<Service>;
  setMenu: SetMenu;
  permissions: Array<string>;
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const serviceId = params.get("service_id");
  const service = services.find((service) => service._id === serviceId);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-outline mr-3">Services - {service?.app_name}</h1>
        <Link href={`/dashboard?page=logs&services=${serviceId}`}>
          <button className="button glass flex items-center">
            <Icon>
              <TextDocument />
            </Icon>
            <p>View logs</p>
          </button>
        </Link>
      </div>
      <Code>
        <div className="text-xs">
          <span className="text-blue-500">POST</span>{" "}
          {process.env.NEXT_PUBLIC_API_URL}/service/add_message
        </div>
        {"{"}
        <div>
          <span className="text-blue-500">{"\t"}"token"</span>:{" "}
          <span className="text-green-500">"your_token"</span>,
        </div>
        <div>
          <span className="text-blue-500">{"\t"}"log"</span>: {"{"}
          <div>
            <span className="text-blue-500">{"\t\t"}"app_id"</span>:{" "}
            <span className="text-green-500">"{serviceId}"</span>,
          </div>
          <div>
            <span className="text-blue-500">{"\t\t"}"type"</span>:{" "}
            <span className="text-green-500">"default"</span>,
          </div>
          <div>
            <span className="text-blue-500">{"\t\t"}"message"</span>:{" "}
            <span className="text-green-500">"This is a test message."</span>,
          </div>
          <div>
            <span className="text-blue-500">{"\t\t"}"timestamp"</span>:{" "}
            <span className="text-green-500">"1627272880"</span>
          </div>
          {"\t}"}
        </div>
        {"}"}
      </Code>
      <div className="mt-3">
        {permissions.find((p) => p === "administrator") && service && (
          <GenerateTokenButton service={service} setMenu={setMenu} />
        )}
      </div>
    </>
  );
};

export default Service;
