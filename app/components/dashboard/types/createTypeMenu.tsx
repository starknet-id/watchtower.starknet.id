import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useCookies } from "react-cookie";
import TextInput from "../../UI/textInput";

const CreateTypeMenu = ({
  setTypes,
  setMenu,
  types,
}: {
  setTypes: (types: Array<Type>) => void;
  setMenu: SetMenu;
  types: Array<Type>;
}) => {
  const cookies = useCookies();

  return (
    <Popup
      title="Create type"
      then={() => {
        const name = (document.getElementById("name") as HTMLInputElement)
          .value;
        request(
          `/add_type`,
          {
            name: name,
            token: cookies[0].token,
          },
          { method: "POST" }
        ).then(
          (res) =>
            res.status === "success" &&
            setTypes([
              ...types,
              {
                _id: res._id,
                name: name,
                color: "gray",
                icon: "default",
                importance: 0,
                notifications: [],
                parents: [],
              },
            ])
        );
      }}
      buttonName={"Create"}
      setMenu={setMenu}
      cross={true}
      actionBar={<TextInput id="name" placeholder="Name" />}
    />
  );
};

export default CreateTypeMenu;
