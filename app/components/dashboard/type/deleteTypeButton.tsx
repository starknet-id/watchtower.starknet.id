import request from "@/app/utils/request";
import Popup from "../../UI/popup";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const DeleteTypeButton = ({
  setMenu,
  type,
  types,
  setTypes,
}: {
  setMenu: SetMenu;
  type: Type;
  types: Array<Type>;
  setTypes: (types: Array<Type>) => void;
}) => {
  const cookies = useCookies();
  const router = useRouter();
  return (
    <button
      className="button glass danger"
      onClick={() =>
        setMenu(
          <Popup
            title="Delete group"
            then={() => {
              request(
                `/delete_type`,
                {
                  type_id: type._id,
                  token: cookies[0].token,
                },
                { method: "DELETE" }
              ).then((res) => {
                if (res.status === "success") {
                  setTypes(types.filter((t) => t._id !== type._id));
                  router.push("/dashboard?page=types");
                }
              });
            }}
            buttonName={"Continue"}
            setMenu={setMenu}
            type="error"
            cross={true}
          >
            <p>Are you sure you want to delete this group?</p>
          </Popup>
        )
      }
    >
      Delete
    </button>
  );
};

export default DeleteTypeButton;
