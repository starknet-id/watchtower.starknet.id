import ContextMenu from "../components/UI/contextMenu";

const openContextMenu = (
  e: React.MouseEvent,
  setMenu: SetMenu,
  children: React.ReactNode,
  width?: number
) => {
  e.preventDefault();
  e.stopPropagation();
  let x = e.clientX;
  let y = e.clientY;
  if (width) {
    if (x - width / 2 < 0) x = width / 2;
    if (x + width / 2 > window.innerWidth) x = window.innerWidth - width / 2;
    if (y - 100 < 0) y = 100;
    if (y + 100 > window.innerHeight) y = window.innerHeight - 100;
  }
  setMenu(
    <ContextMenu setMenu={setMenu} x={x} y={y} width={width}>
      {children}
    </ContextMenu>
  );
};

export default openContextMenu;
