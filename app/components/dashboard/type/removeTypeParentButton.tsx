import request from "@/app/utils/request";
import Icon from "../../icons/icon";
import Trash from "../../icons/paths/trash";
import { useCookies } from "react-cookie";

const RemoveTypeParentButton = ({
  type,
  types,
  setTypes,
  parentId,
}: {
  type: Type;
  setTypes: (types: Array<Type>) => void;
  types: Array<Type>;
  parentId: string;
}) => {
  const cookies = useCookies();
  return (
    <button
      className="button glass flex items-center my-4"
      onClick={async () => {
        if (type) {
          const res = await request(`/remove_type_parent`, {
            token: cookies[0].token,
            type_id: type._id,
            parent_id: parentId,
          });
          if (res.status === "success")
            setTypes(
              types.map((t) => {
                if (t._id === type._id) {
                  return {
                    ...t,
                    parents: t.parents.filter((p) => p !== parentId),
                  };
                }
                return t;
              })
            );
        }
      }}
    >
      <Icon width={25}>
        <Trash />
      </Icon>
    </button>
  );
};

export default RemoveTypeParentButton;
