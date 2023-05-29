import styles from "@/app/styles/components/UI/textInput.module.css";

const TextInput = ({
  value = "",
  type = "text",
  placeholder,
  onChange,
}: {
  value?: string;
  type?: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type={type}
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
