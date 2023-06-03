import CopyButton from "../../UI/copyButton";

const LogContextMenu = ({ log }: { log: Log }) => {
  const keys = Object.keys(log);
  return (
    <>
      <pre>
        <code>
          <div className="flex">
            <div className="w-fit mr-3">
              <CopyButton text={JSON.stringify(log, null, 2)} />
            </div>
            {"{"}
          </div>
          {keys.map((key, index) => (
            <div key={`log_context_menu_${index}`}>
              <span className="text-blue-500">{"\t" + key}</span>:{" "}
              <span className="text-green-500">{(log as any)[key]}</span>
            </div>
          ))}
          {"}"}
        </code>
      </pre>
    </>
  );
};

export default LogContextMenu;
