import ContextMenu from "../components/UI/contextMenu";

const openContextMenu = (
  e: React.MouseEvent,
  setMenu: SetMenu,
  children: React.ReactNode,
  width?: number,
  height?: number
) => {
  e.preventDefault();
  e.stopPropagation();
  // Get screen dimensions
  const screenWidth = window.innerWidth;
  const centerX = screenWidth / 2 - (width || 0) / 2;
  const centerY = Math.max(20, window.innerHeight / 2 - (height || 0) / 2);

  const renderCallback = (elementHeight: number, elementWidth: number) => {
    if (height && width) return;
    openContextMenu(
      e,
      setMenu,
      children,
      width || elementWidth,
      height || elementHeight
    );
  };

  setMenu(
    <ContextMenu
      setMenu={setMenu}
      x={centerX}
      y={centerY}
      width={width}
      renderCallback={renderCallback}
    >
      {children}
    </ContextMenu>
  );
};

export default openContextMenu;
