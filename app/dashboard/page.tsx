"use client";

import Background from "../components/UI/background";
import DashboardMenu from "../components/dashboard/menu";
import { useSearchParams } from "next/navigation";
import styles from "../styles/dashboard.module.css";
import Home from "../components/dashboard/home";
import { useEffect, useState } from "react";
import request from "../utils/request";
import { useCookies } from "react-cookie";
import Service from "../components/dashboard/service";

const Dashboard = () => {
  const cookies = useCookies();
  const params = useSearchParams();
  const page = params.get("page") || "home";
  const [services, setServices] = useState<Array<any>>([]);

  const token = cookies[0].token;

  useEffect(() => {
    request("/get_services", { token: token }).then((res) => {
      if (res.status === "success") {
        setServices(res.services);
      }
    });
  }, [token]);

  return (
    <>
      <Background />
      <div className={styles.container}>
        {page === "home" ? <Home services={services} /> : null}
        {page === "service" ? <Service services={services} /> : null}
      </div>
      <DashboardMenu />
    </>
  );
};

export default Dashboard;
