import User from "../../icons/paths/user";
import WarningShield from "../../icons/paths/warningShield";
import SolidIcon from "../../icons/solidIcon";

const UserIcon = ({ user }: { user: User }) => {
  return (
    <SolidIcon width={25}>
      {user.permissions.includes("administrator") ? (
        <WarningShield />
      ) : (
        <User />
      )}
    </SolidIcon>
  );
};

export default UserIcon;
