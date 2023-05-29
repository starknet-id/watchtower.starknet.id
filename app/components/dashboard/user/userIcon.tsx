import User from "../../icons/solid/user";
import WarningShield from "../../icons/solid/warningShield";
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
