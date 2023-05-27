import styles from "@/app/styles/components/dashboard/home.module.css";
import { useRouter } from "next/navigation";

const Home = ({ services }: { services: Array<any> }) => {
  const router = useRouter();
  return (
    <>
      <h1>Logs</h1>
      <div className={styles.servicesContainer}>
        {services.map((service, index) => (
          <div
            className={styles.service}
            key={`service_${index}`}
            onClick={() =>
              router.push(`/dashboard?page=service&service_id=${service._id}`)
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
