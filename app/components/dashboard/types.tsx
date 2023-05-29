import { useCookies } from "react-cookie";
import Icon from "../icons/icon";
import Plus from "../icons/outline/plus";
import CreateTypeMenu from "./types/createTypeMenu";
import styles from "@/app/styles/components/dashboard/types.module.css";
import IconRouter from "../icons/iconRouter";
import SolidIcon from "../icons/solidIcon";
import TextDocument from "../icons/solid/textDocument";
import openContextMenu from "@/app/utils/openContextMenu";
import TypeContextMenu from "./types/typeContextMenu";

const Types = ({
  setMenu,
  types,
  setTypes,
}: {
  setMenu: SetMenu;
  types: Type[];
  setTypes: (types: Array<Type>) => void;
}) => {
  const cookies = useCookies();

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-outline mr-3">Groups</h1>
        <button
          className="button glass flex items-center"
          onClick={() =>
            setMenu(
              <CreateTypeMenu
                setMenu={setMenu}
                types={types}
                setTypes={setTypes}
              />
            )
          }
        >
          <Icon>
            <Plus />
          </Icon>
          <p>Create a new group</p>
        </button>
      </div>
      <section className={styles.container}>
        <div className={[styles.typeContainer, styles.disabled].join(" ")}>
          <SolidIcon>
            <TextDocument />
          </SolidIcon>
          <p>default</p>
        </div>
        {types.map((type) => (
          <div
            className={styles.typeContainer}
            key={`type_${type._id}`}
            onContextMenu={(e) =>
              openContextMenu(
                e,
                setMenu,
                <TypeContextMenu
                  setMenu={setMenu}
                  type={type}
                  types={types}
                  setTypes={setTypes}
                />,
                400
              )
            }
          >
            <SolidIcon>
              <IconRouter name={type.icon} />
            </SolidIcon>
            <p>{type.name}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default Types;
