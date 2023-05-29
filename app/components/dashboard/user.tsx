import { useCookies } from "react-cookie";
import { useSearchParams } from "next/navigation";
import SolidIcon from "../icons/solidIcon";
import UserIcon from "./user/userIcon";

const User = ({ users, setMenu }: { users: Array<User>; setMenu: SetMenu }) => {
  const cookies = useCookies();
  const params = useSearchParams();
  const userId = params.get("user_id");

  const user = users.find((user) => user._id === userId);

  return (
    <>
      <div className="flex items-center">
        {user ? (
          <div className="mr-3">
            <SolidIcon width={45}>
              <UserIcon user={user} />
            </SolidIcon>
          </div>
        ) : null}
        <h1 className="text-outline mr-3">User - {user?.username}</h1>
      </div>
      <section className="mt-2">
        <h2>Permissions</h2>
      </section>
    </>
  );
};

export default User;
