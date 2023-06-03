import styles from "@/app/styles/components/UI/checkboxItem.module.css";

const CheckboxItem = ({
  name,
  checked,
  onChange,
  icon = null,
}: {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}) => {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        className="checkbox"
        checked={checked}
        onChange={onChange}
        title={`checkbox_${name}`}
      />
      <span className={styles.label}></span>
      {icon}
      <span className={styles.name}>{name}</span>
    </label>
  );
};

export default CheckboxItem;
