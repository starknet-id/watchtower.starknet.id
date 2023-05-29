const SolidIcon = ({
  children,
  width = 30,
}: {
  children: React.ReactNode;
  width?: number;
}) => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={width} height={width}>
      {children}
    </svg>
  );
};

export default SolidIcon;
