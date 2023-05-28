import { useEffect, useState } from "react";

const DraggableMenu = ({
  children,
  xDefault,
  yDefault,
}: {
  children: React.ReactNode;
  xDefault: number;
  yDefault: number;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [xStart, setXStart] = useState(0);
  const [yStart, setYStart] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    setX(xDefault);
    setY(yDefault);
  }, [xDefault, yDefault]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (isDragging) {
        setX(e.clientX - xStart);
        setY(e.clientY - yStart);
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [isDragging, xStart, yStart]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
      }}
      onMouseDown={(e) => {
        console;
        setIsDragging(true);
        setXStart(e.clientX - x);
        setYStart(e.clientY - y);
      }}
      onMouseUp={() => setIsDragging(false)}
    >
      {children}
    </div>
  );
};
export default DraggableMenu;
