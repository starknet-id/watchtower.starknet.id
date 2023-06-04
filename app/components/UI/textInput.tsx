import styles from "@/app/styles/components/UI/textInput.module.css";

const TextInput = ({
  value = "",
  type = "text",
  placeholder,
  onChange,
  id,
}: {
  value?: string;
  type?: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}) => {
  return (
    <input
      type={type}
      className={styles.input}
      placeholder={placeholder}
      value={onChange && value}
      defaultValue={!onChange ? value : undefined}
      onChange={onChange}
      id={id}
    />
  );
};

export default TextInput;
