import styles from "@/app/styles/components/UI/code.module.css";

const Code = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.code}>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default Code;
