import Icon from "../icons/icon";
import Plus from "../icons/paths/plus";
import CreateTypeMenu from "./types/createTypeMenu";
import styles from "@/app/styles/components/dashboard/types.module.css";
import IconRouter from "../icons/iconRouter";
import SolidIcon from "../icons/solidIcon";
import TextDocument from "../icons/paths/textDocument";
import { useRouter } from "next/navigation";
import dashboardStyles from "@/app/styles/dashboard.module.css";

const Types = ({
  setMenu,
  types,
  setTypes,
}: {
  setMenu: SetMenu;
  types: Type[];
  setTypes: (types: Array<Type>) => void;
}) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center">
        <h1 className={dashboardStyles.title}>Types</h1>
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
          <p>Create a new type</p>
        </button>
      </div>
      <section className={styles.container}>
        <div className={[styles.typeContainer, styles.disabled].join(" ")}>
          <SolidIcon>
            <TextDocument />
          </SolidIcon>
          <p>default</p>
        </div>
        <hr></hr>
        {types.map((type) => (
          <div key={`type_${type._id}`}>
            <div
              className={styles.typeContainer}
              onClick={() =>
                router.push(`/dashboard?page=type&type_id=${type._id}`)
              }
            >
              <div
                style={{
                  color: type?.color,
                }}
              >
                {" "}
                <SolidIcon>
                  <IconRouter name={type.icon} />
                </SolidIcon>
              </div>
              <p>{type.name}</p>
            </div>
            <hr></hr>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Types;
