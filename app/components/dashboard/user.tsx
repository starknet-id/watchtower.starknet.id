import { useCookies } from "react-cookie";
import { useSearchParams } from "next/navigation";
import SolidIcon from "../icons/solidIcon";
import UserIcon from "./user/userIcon";
import Switch from "../UI/switch";
import { useEffect, useState } from "react";
import request from "@/app/utils/request";

const User = ({
  users,
  setUsers,
}: {
  users: Array<User>;
  setUsers: (users: Array<User>) => void;
}) => {
  const [permissions, setPermissions] = useState<Record<Permission, boolean>>({
    administrator: false,
  });
  const [loaded, setLoaded] = useState(false);
  const cookies = useCookies();
  const params = useSearchParams();
  const userId = params.get("user_id");

  const user = users.find((user) => user._id === userId);

  useEffect(() => {
    if (user) {
      const userPermissions = user.permissions;
      const keys = Object.keys(permissions);
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index] as Permission;
        setPermissions((permissions) => ({
          ...permissions,
          [key]: userPermissions.includes(key),
        }));
      }
      setLoaded(true);
    }
  }, [user]);

  useEffect(() => {
    if (user && permissions && loaded) {
      request(`/set_user_permissions`, {
        token: cookies[0].token,
        target_user_id: user._id,
        new_permissions: Object.keys(permissions).filter(
          (permission) => permissions[permission as Permission]
        ),
      });
    }
  }, [user, permissions, loaded]);

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
        <div className="flex items-center mt-1">
          {Object.keys(permissions).map((permission) => (
            <div className="flex items-center mr-3 mt-1" key={permission}>
              <Switch
                checked={permissions[permission as Permission]}
                setChecked={(value) => {
                  if (user) {
                    setPermissions((permissions) => ({
                      ...permissions,
                      [permission]: value,
                    }));
                    setUsers(
                      ((users: Array<User>) =>
                        users.map((u) =>
                          u._id === user._id
                            ? {
                                ...u,
                                permissions: Object.keys(permissions).filter(
                                  (p) => !permissions[p as Permission]
                                ) as Permission[],
                              }
                            : u
                        ))(users)
                    );
                  }
                }}
              />
              <p className="ml-2">{permission}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default User;
