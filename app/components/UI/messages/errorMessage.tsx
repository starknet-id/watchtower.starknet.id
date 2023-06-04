import styles from "@/app/styles/components/UI/messages.module.css";

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={[styles.message, styles.error].join(" ")}>{children}</div>
  );
};

export default ErrorMessage;
