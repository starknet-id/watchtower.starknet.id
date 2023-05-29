import styles from "@/app/styles/components/dashboard/serviceLogs.module.css";
import request from "@/app/utils/request";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Service = ({
  services,
  types,
}: {
  services: Array<Service>;
  types: Array<Type>;
}) => {
  const params = useSearchParams();
  const cookies = useCookies();
  const [logs, setLogs] = useState<Array<Log>>([]);
  const serviceId = params.get("service_id");
  const [loaded, setLoaded] = useState(false);
  const service = services.find((service) => service._id === serviceId);

  const logId = window.location.hash.split("#log_")[1];

  useEffect(() => {
    if (!serviceId) return;
    const load = () =>
      request("/get_logs", {
        token: cookies[0].token,
        app_id: serviceId,
      }).then((res) => {
        if (res.status === "success") setLogs(res.logs.reverse());
        if (!loaded) setLoaded(true);
      });
    load();
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, [serviceId, loaded]);
  const getType = (typeName: string) =>
    types.find((type) => type.name === typeName);

  useEffect(() => {
    if (logId && loaded) {
      const element = document.getElementById(`log_${logId}`);
      if (element) element.scrollIntoView();
    }
  }, [logId, loaded]);

  return (
    <>
      <h1 className="text-outline">Logs - {service?.app_name}</h1>
      <div className={styles.container}>
        {logs.map((log, index) => (
          <div
            className={[styles.line, log._id === logId && styles.selected].join(
              " "
            )}
            key={`log_${index}`}
            id={`log_${log._id}`}
          >
            <p className={styles.date}>
              {new Date(log.timestamp * 1000).toLocaleDateString()}
            </p>
            <p className={styles.time}>
              {new Date(log.timestamp * 1000).toLocaleTimeString()}
            </p>
            <span
              style={{
                color: getType(log.type_)?.color,
              }}
              className="whitespace-pre-line"
            >
              {log.message}
            </span>
          </div>
        ))}
        {logs.length === 0 && <p className={styles.noLogs}>No logs found</p>}
      </div>
    </>
  );
};

export default Service;
