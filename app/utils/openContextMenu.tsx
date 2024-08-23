import ContextMenu from "../components/UI/contextMenu";

const openContextMenu = (
  e: React.MouseEvent,
  setMenu: SetMenu,
  children: React.ReactNode,
  width?: number
) => {
  e.preventDefault();
  e.stopPropagation();
  // Get screen dimensions
  const screenWidth = window.innerWidth;
  const centerX = screenWidth / 2 - (width || 0) / 2;
  const y = e.clientY;
  setMenu(
    <ContextMenu setMenu={setMenu} x={centerX} y={y} width={width}>
      {children}
    </ContextMenu>
  );
};

export default openContextMenu;
