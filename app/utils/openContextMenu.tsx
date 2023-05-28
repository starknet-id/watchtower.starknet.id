import ContextMenu from "../components/UI/contextMenu";

const openContextMenu = (
  e: React.MouseEvent,
  setMenu: SetMenu,
  children: React.ReactNode,
  width?: number
) => {
  e.preventDefault();
  e.stopPropagation();
  setMenu(
    <ContextMenu setMenu={setMenu} x={e.clientX} y={e.clientY} width={width}>
      {children}
    </ContextMenu>
  );
};

export default openContextMenu;
