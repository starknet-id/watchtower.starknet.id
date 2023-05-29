import BookMark from "./paths/bookmark";
import Bullet from "./paths/bullet";
import TextDocument from "./paths/textDocument";
import User from "./paths/user";
import WarningShield from "./paths/warningShield";
import Warning from "./paths/warning";
import Error from "./paths/error";
import Rocket from "./paths/rocket";

const IconRouter = ({ name }: { name: string }) => {
  let icon = null;
  switch (name) {
    case "textDocument":
      icon = <TextDocument />;
      break;
    case "user":
      icon = <User />;
      break;
    case "warningShield":
      icon = <WarningShield />;
      break;
    case "warning":
      icon = <Warning />;
      break;
    case "rocket":
      icon = <Rocket />;
      break;
    case "error":
      icon = <Error />;
      break;
    case "bullet":
      icon = <Bullet />;
      break;
    default:
      icon = <BookMark />;
      break;
  }
  return icon;
};

export default IconRouter;
