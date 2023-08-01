"use client";

import DashboardMenu from "../components/dashboard/menu";
import { useSearchParams } from "next/navigation";
import styles from "../styles/dashboard.module.css";
import Services from "../components/dashboard/services";
import { useEffect, useState } from "react";
import request from "../utils/request";
import { useCookies } from "react-cookie";
import Service from "../components/dashboard/service";
import Users from "../components/dashboard/users";
import Settings from "../components/dashboard/settings";
import Types from "../components/dashboard/types";
import User from "../components/dashboard/user";
import Type from "../components/dashboard/type";
import Logs from "../components/dashboard/logs";
import Databases from "../components/dashboard/dbs";

const Dashboard = () => {
  const cookies = useCookies();
  const params = useSearchParams();
  const page = params.get("page") || "logs";
  const [services, setServices] = useState<Array<any>>([]);
  const [users, setUsers] = useState<Array<User>>([]);
  const [permissions, setPermissions] = useState<Array<Permission>>([]);
  const [types, setTypes] = useState<Array<Type>>([]);
  const [databases, setDatabases] = useState<Array<Database>>([]);
  const [menu, setMenu] = useState<Menu>(null);

  const token = cookies[0].token;

  useEffect(() => {
    request("/get_services", { token: token }).then((res) => {
      if (res.status === "success") {
        setServices(res.services);
      }
    });
    request("/get_users", { token: token }).then((res) => {
      if (res.status === "success") {
        setUsers(res.users);
      }
    });
    request("/get_permissions", { token: token }).then((res) => {
      if (res.status === "success") {
        setPermissions(res.permissions);
      }
    });
    request("/get_types", { token: token }).then((res) => {
      if (res.status === "success") {
        setTypes(res.types);
      }
    });
    request("/get_dbs", { token: token }).then((res) => {
      if (res.status === "success") {
        console.log(res);
        setDatabases(res.databases);
      }
    });
  }, [token]);

  return (
    <>
      <div className={styles.container}>
        {page === "services" ? (
          <Services
            setMenu={setMenu}
            services={services}
            setServices={setServices}
            permissions={permissions}
          />
        ) : null}
        {page === "service" ? (
          <Service
            services={services}
            setMenu={setMenu}
            permissions={permissions}
            setServices={setServices}
          />
        ) : null}
        {page === "db" ? (
          <Databases
            databases={databases}
            setMenu={setMenu}
            permissions={permissions}
            setDatabases={setDatabases}
          />
        ) : null}
        {page === "logs" ? (
          <Logs services={services} types={types} setMenu={setMenu} />
        ) : null}
        {page === "settings" ? (
          <Settings permissions={permissions} setMenu={setMenu} />
        ) : null}
        {page === "types" ? (
          <Types setMenu={setMenu} types={types} setTypes={setTypes} />
        ) : null}
        {page === "type" ? (
          <Type types={types} setTypes={setTypes} setMenu={setMenu} />
        ) : null}
        {page === "users" ? (
          <Users
            users={users}
            setMenu={setMenu}
            setUsers={setUsers}
            permissions={permissions}
          />
        ) : null}
        {page === "user" ? (
          <User users={users} setUsers={setUsers} setMenu={setMenu} />
        ) : null}
      </div>
      <DashboardMenu permissions={permissions} page={page} />
      {menu}
    </>
  );
};

export default Dashboard;
