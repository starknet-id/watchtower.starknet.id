import styles from "@/app/styles/components/UI/code.module.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Code = ({ children }: { children: React.ReactNode }) => {
  return (
    <SyntaxHighlighter language={"json"} style={anOldHope}>
      {children}
    </SyntaxHighlighter>
  );
};

export default Code;
