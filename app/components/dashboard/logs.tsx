import styles from "@/app/styles/components/dashboard/logs.module.css";
import request from "@/app/utils/request";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import openContextMenu from "@/app/utils/openContextMenu";
import LogContextMenu from "./logs/logContextMenu";
import LogsFilters from "./logs/logsFilters";

const Logs = ({
  services,
  types,
  setMenu,
}: {
  services: Array<Service>;
  types: Array<Type>;
  setMenu: SetMenu;
}) => {
  const params = useSearchParams();
  const cookies = useCookies();
  const router = useRouter();
  const [logs, setLogs] = useState<Array<Log>>([]);
  const [loaded, setLoaded] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [targetServiceIds, setTargetServiceIds] = useState<Array<string>>([]);
  const [targetTypes, setTargetTypes] = useState<Array<Type>>([]);
  const targetServices = services.filter((service) =>
    targetServiceIds.includes(service._id)
  );
  const [logId, setLogId] = useState<string>("");
  const multipleServices = targetServices.length > 1;

  useEffect(() => {
    setLogId(
      typeof window !== "undefined"
        ? window.location.hash.split("#log_")[1]
        : ""
    );
  }, []);

  const select = (id: string) => {
    setLogId(id);
    router.push(`${window.location.href.split("#")[0]}#log_${id}`);
  };

  useEffect(() => {
    const targetServiceIds = params.get("services")?.split(",") || [];
    setTargetServiceIds(targetServiceIds.filter((id) => id !== ""));
    const targetTypeIds = params.get("types")?.split(",") || [];
    const targetTypesTemp = types.filter((type) =>
      targetTypeIds.includes(type._id)
    );
    setTargetTypes(targetTypesTemp);
  }, [params, types]);

  useEffect(() => {
    if (refresh) return setRefresh(false);
    if (!targetServiceIds) return;
    const load = () =>
      request("/get_logs", {
        token: cookies[0].token,
        target_apps: targetServiceIds.length
          ? targetServiceIds
          : services.map((service) => service._id),
        target_types: targetTypes.length
          ? targetTypes.map((type) => type.name)
          : undefined,
      }).then((res) => {
        if (res.status === "success") {
          const services = res.logs;
          const result = [];
          // Put all logs in one array
          const keys = Object.keys(services);
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const service = services[key];
            result.push(...service);
          }
          // Sort logs by timestamp
          result.sort((a, b) => b.timestamp - a.timestamp);
          setLogs(result);
        }
        if (!loaded) setLoaded(true);
      });
    load();
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, [loaded, refresh, targetServiceIds, targetTypes]);
  const getType = (typeName: string) =>
    types.find((type) => type.name === typeName);

  useEffect(() => {
    if (logId && loaded) {
      const element = document.getElementById(`log_${logId}`);
      if (element) element.scrollIntoView();
    }
  }, [logId, loaded]);

  const getApp = (id: string) => targetServices.find((app) => app._id === id);

  return (
    <>
      <h1 className="text-outline">
        Logs{" "}
        {!multipleServices && targetServices[0]
          ? ` - ${targetServices[0]?.app_name}`
          : ""}
      </h1>

      <LogsFilters
        services={services}
        setRefresh={setRefresh}
        targetServiceIds={targetServiceIds}
        types={types}
        targetTypes={targetTypes}
        setTargetTypes={setTargetTypes}
      />

      <div className={styles.container}>
        {logs.map((log, index) => (
          <div key={`log_${index}`}>
            {multipleServices && logs[index - 1]?.app_id !== log.app_id && (
              <>
                <h3 className={styles.appName}>
                  {getApp(log.app_id)?.app_name}
                </h3>
                <hr />
              </>
            )}
            <div
              className={[
                styles.line,
                log._id === logId && styles.selected,
              ].join(" ")}
              id={`log_${log._id}`}
              onClick={() => select(log._id)}
              style={
                getType(log.type_)?.importance
                  ? {
                      borderLeft:
                        getType(log.type_)?.color +
                        ` ${getType(log.type_)?.importance || 0}px solid`,
                      backgroundColor: getType(log.type_)?.color + "10",
                    }
                  : {
                      borderLeft: "none",
                    }
              }
              onContextMenu={(e) =>
                openContextMenu(e, setMenu, <LogContextMenu log={log} />)
              }
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
          </div>
        ))}
        {logs.length === 0 && <p className={styles.noLogs}>No logs found</p>}
      </div>
    </>
  );
};

export default Logs;
