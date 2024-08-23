import Cross from "../icons/paths/cross";
import Icon from "../icons/icon";
import DraggableMenu from "./draggableMenu";
import styles from "@/app/styles/components/UI/contextMenu.module.css";
import { useEffect, useState } from "react";

const ContextMenu = ({
  children,
  setMenu,
  x,
  y,
  width,
  renderCallback,
}: {
  children: React.ReactNode;
  setMenu: SetMenu;
  x: number;
  y: number;
  width?: number;
  renderCallback?: (height: number, width: number) => void;
}) => {
  const [uniqueId, setUniqueId] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setUniqueId(Math.random().toString());
    setRendered(false);
  }, [children]);

  useEffect(() => {
    if (renderCallback && uniqueId && !rendered) {
      const check = () => {
        const element = document.getElementById(uniqueId);
        const boundingRect = element?.getBoundingClientRect();
        const height = boundingRect?.height;
        const width = boundingRect?.width;
        if (element && height && width) {
          renderCallback(height, width);
          setRendered(true);
        }
      };
      check();
      const interval = setInterval(check, 10);
      return () => clearInterval(interval);
    }
  }, [uniqueId, rendered]);

  return (
    <DraggableMenu xDefault={x} yDefault={y}>
      <div
        style={{ width: width && width + "px" }}
        className={styles.container}
        id={uniqueId ?? undefined}
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
