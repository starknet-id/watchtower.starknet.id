const Icon = ({
  children,
  width = 30,
}: {
  children: React.ReactNode;
  width?: number;
}) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      width={width}
      height={width}
    >
      {children}
    </svg>
  );
};

export default Icon;
