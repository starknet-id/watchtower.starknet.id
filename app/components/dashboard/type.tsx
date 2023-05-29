import { useSearchParams } from "next/navigation";
import SolidIcon from "../icons/solidIcon";
import IconRouter from "../icons/iconRouter";
import styles from "@/app/styles/components/dashboard/type.module.css";
import iconList from "@/app/utils/iconList";
import colorList from "@/app/utils/colorList";
import { useEffect } from "react";
import request from "@/app/utils/request";
import { useCookies } from "react-cookie";
import Switch from "../UI/switch";
import contactList from "@/app/utils/contactList";
import SelectBox from "../UI/selectBox";

const Type = ({
  types,
  setTypes,
}: {
  types: Array<Type>;
  setTypes: (types: Array<Type>) => void;
}) => {
  const cookies = useCookies();
  const params = useSearchParams();
  const typeId = params.get("type_id");
  const type = types.find((t) => t._id === typeId);

  useEffect(() => {
    if (type) {
      request(`/edit_type`, {
        token: cookies[0].token,
        type_id: type._id,
        name: type.name,
        icon: type.icon,
        color: type.color,
        notifications: type.notifications,
        importance: type.importance,
      });
    }
  }, [type]);

  return (
    <>
      <div className="flex items-center">
        <div
          style={{
            color: type?.color,
          }}
          className="mr-3"
        >
          {type ? (
            <SolidIcon width={45}>
              <IconRouter name={type.icon} />
            </SolidIcon>
          ) : null}
        </div>
        <h1 className="text-outline">Groups - {type?.name}</h1>
      </div>
      <div className={styles.container}>
        <div className={[styles.selector, styles.iconSelector].join(" ")}>
          {iconList.map((icon, index) => (
            <div
              className={styles.item}
              key={`icon_${index}`}
              onClick={() => {
                if (type) {
                  setTypes(
                    types.map((t) => {
                      if (t._id === type._id) {
                        return {
                          ...t,
                          icon,
                        };
                      }
                      return t;
                    })
                  );
                }
              }}
            >
              <SolidIcon width={30}>
                <IconRouter name={icon} />
              </SolidIcon>
            </div>
          ))}
        </div>
        <div className={[styles.selector, styles.colorSelector].join(" ")}>
          {colorList.map((color, index) => (
            <div
              className={styles.item}
              key={`color_${index}`}
              onClick={() => {
                if (type) {
                  setTypes(
                    types.map((t) => {
                      if (t._id === type._id) {
                        return {
                          ...t,
                          color,
                        };
                      }
                      return t;
                    })
                  );
                }
              }}
            >
              <div
                style={{
                  backgroundColor: color,
                }}
                className={styles.color}
              ></div>
            </div>
          ))}
        </div>
      </div>
      {contactList.map((contact, index) => (
        <div
          className="flex items-center mr-3 mt-2 mb-1"
          key={`contact_${index}`}
        >
          <Switch
            checked={!!type?.notifications.includes(contact)}
            setChecked={(value) => {
              if (type) {
                setTypes(
                  types.map((t) => {
                    if (t._id === type._id) {
                      return {
                        ...t,
                        notifications: [...t.notifications, contact],
                      };
                    }
                    return t;
                  })
                );
              }
            }}
          />
          <p className="ml-2">{contact}</p>
        </div>
      ))}
      <div className="flex mt-4">
        <label className="mr-3">Importance: </label>
        <SelectBox
          placeholder="Importance"
          selected={type?.importance || 0}
          setSelected={(value: string | number) => {
            if (type) {
              setTypes(
                types.map((t) => {
                  if (t._id === type._id) {
                    return {
                      ...t,
                      importance: value as number,
                    };
                  }
                  return t;
                })
              );
            }
          }}
          options={[
            {
              value: 0,
              name: "Low",
            },
            {
              value: 1,
              name: "Medium",
            },
            {
              value: 2,
              name: "High",
            },
          ]}
        />
      </div>
    </>
  );
};

export default Type;
