import Cross from "../icons/paths/cross";
import Icon from "../icons/icon";
import DraggableMenu from "./draggableMenu";
import styles from "@/app/styles/components/UI/contextMenu.module.css";

const ContextMenu = ({
  children,
  setMenu,
  x,
  y,
  width,
}: {
  children: React.ReactNode;
  setMenu: SetMenu;
  x: number;
  y: number;
  width?: number;
}) => {
  return (
    <DraggableMenu xDefault={x} yDefault={y}>
      <div
        style={{ width: width && width + "px" }}
        className={styles.container}
      >
        <div className={styles.close} onClick={() => setMenu(null)}>
          <Icon>
            <Cross />
          </Icon>
        </div>
        {children}
      </div>
    </DraggableMenu>
  );
};
export default ContextMenu;
