import styles from "@/app/styles/components/dashboard/logs.module.css";
import { useRouter } from "next/navigation";

const LogsFilters = ({
  services,
  targetServiceIds,
  setRefresh,
}: {
  services: Array<Service>;
  targetServiceIds: Array<string>;
  setRefresh: (refresh: boolean) => void;
}) => {
  const router = useRouter();

  const setSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    router.push(`${window.location.pathname}?${params.toString()}`);
    setRefresh(true);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.category}>
        {services.map((service) => (
          <div className={styles.item} key={`service_filter_${service._id}`}>
            <input
              type="checkbox"
              id={`service_filter_${service._id}`}
              checked={targetServiceIds.includes(service._id)}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  targetServiceIds.push(service._id);
                } else {
                  targetServiceIds.splice(
                    targetServiceIds.indexOf(service._id),
                    1
                  );
                }
                setSearchParams("services", targetServiceIds.join(","));
              }}
            />
            <label htmlFor={`service_filter_${service._id}`}>
              {service.app_name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsFilters;
