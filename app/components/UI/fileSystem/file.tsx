import styles from "@/app/styles/components/dashboard/fileSystem.module.css";
import SolidIcon from "../../icons/solidIcon";
import IconRouter from "../../icons/iconRouter";
import Link from "next/link";

const FileElement = ({
  id,
  name,
  color,
  icon,
}: {
  id: string;
  name: string;
  color: string;
  icon: string;
}) => {
  return (
    <Link href={`/dashboard?page=type&type_id=${id}`} passHref>
      <div
        className={[styles.elementContainer, styles.fileContainer].join(" ")}
        style={{
          color: color,
        }}
      >
        <SolidIcon>
          <IconRouter name={icon} />
        </SolidIcon>
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default FileElement;
