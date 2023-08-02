import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import TextInput from "../../UI/textInput";
import loadDbs from "./loadDbs";
import { useState } from "react";
import BlackScreen from "../../UI/blackScreen";
import Loading from "../../UI/loading";

const AddDatabaseMenu = ({
  databases,
  setDatabases,
  setMenu,
}: {
  databases: Array<Database>;
  setDatabases: (databases: Array<Database>) => void;
  setMenu: SetMenu;
}) => {
  const cookies = useCookies();

  return (
    <Popup
      title="Add database"
      then={() => {
        setMenu(
          <BlackScreen>
            <Loading />
          </BlackScreen>
        );
        const name = (document.getElementById("name") as HTMLInputElement)
          ?.value;
        const connectionString = (
          document.getElementById("connection_string") as HTMLInputElement
        )?.value;
        request(
          `/add_db`,
          {
            name,
            connection_string: connectionString,
            token: cookies[0].token,
          },
          { method: "POST" }
        ).then((res) => {
          setMenu(null);
          loadDbs(cookies[0].token, setDatabases);
        });
      }}
      buttonName={"Create"}
      setMenu={setMenu}
      cross={true}
      actionBar={
        <>
          <TextInput id="name" placeholder="Database name" />
          <TextInput id="connection_string" placeholder="Connection string" />
        </>
      }
    ></Popup>
  );
};

export default AddDatabaseMenu;
