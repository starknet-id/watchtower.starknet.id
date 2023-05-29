import styles from "@/app/styles/components/UI/selectBox.module.css";
import { useState } from "react";

const SelectBox = ({
  options,
  selected,
  setSelected,
  placeholder,
}: {
  options: Array<{ name: string; value: string | number }>;
  selected: number | string | null;
  setSelected: (value: string | number) => void;
  placeholder: string;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div
        className={styles.selected}
        onClick={() => setOpen(!open)}
        style={{
          color: selected ? "white" : "var(--text)",
        }}
      >
        {selected !== null
          ? options.find((o) => o.value === selected)?.name
          : placeholder}
      </div>
      {open ? (
        <div className={styles.options}>
          <input
            type="text"
            className={styles.search}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filteredOptions.map((option) => (
            <div
              className={styles.option}
              key={option.value}
              onClick={() => {
                setSelected(option.value);
                setOpen(false);
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SelectBox;
