import Icon from "../icons/icon";
import Plus from "../icons/paths/plus";
import CreateTypeMenu from "./types/createTypeMenu";
import styles from "@/app/styles/components/dashboard/types.module.css";
import IconRouter from "../icons/iconRouter";
import SolidIcon from "../icons/solidIcon";
import TextDocument from "../icons/paths/textDocument";
import { useRouter } from "next/navigation";
import dashboardStyles from "@/app/styles/dashboard.module.css";
import TypeSystem from "../UI/fileSystem/typeSystem";

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
      <h1 className={dashboardStyles.title}>Types</h1>
      <button
        className="button glass flex items-center my-4"
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
      <section className={styles.container}>
        <TypeSystem types={types} />
      </section>
    </div>
  );
};

export default Types;
