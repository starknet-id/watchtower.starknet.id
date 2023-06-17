import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Code = ({ children }: { children: string }) => {
  return (
    <SyntaxHighlighter language={"json"} style={anOldHope}>
      {children}
    </SyntaxHighlighter>
  );
};

export default Code;
