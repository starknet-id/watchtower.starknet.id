import styles from "@/app/styles/components/UI/buttons.module.css";

const button = ({
  children,
  onClick,
  color = "",
  fit = true,
  additions = [],
}: {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
  fit?: boolean;
  additions?: string[];
}) => {
  return (
    <button
      onClick={onClick}
      className={[
        styles.button,
        styles.important,
        styles[color],
        fit && styles.fit,
        ...additions.map((addition) => styles[addition]),
      ].join(" ")}
    >
      {children}
    </button>
  );
};

export default button;
