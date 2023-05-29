import styles from "@/app/styles/components/UI/switch.module.css";

const Switch = ({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}) => {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        title="Toggle switch"
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default Switch;
