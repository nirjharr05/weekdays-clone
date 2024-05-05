import { useState, useRef, useEffect } from "react";
import DropdownToggle from "@/svg/DropdownToggle";
import styles from "./MultiSelectDropdown.module.css";

const MultiSelectDropdown = (props: any) => {
    const { id, placeholder, data, type } = props;
    const [localData, setLocalData] = useState<any>(data);
    const [initialData] = useState<any>(data);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setLocalData(data);
    }, [data]);

    const handleSelect = (item: string | number, category?: string) => {
        if (type === "select_single") {
            setSelectedItems([item]);
            setIsOpen(false);
            return;
        }
        if (type === "select_category" && category) {
            setSelectedItems((prev) => [...prev, item]);
            const updatedCategory = localData[category].filter(
                (i: any) => i !== item,
            );
            setLocalData({
                ...localData,
                [category]: updatedCategory,
            });
            if (updatedCategory.length === 0) {
                const newData = { ...localData };
                delete newData[category];
                setLocalData(newData);
            }
        }
        setIsOpen(false);
    };

    const handleRemove = (item: string | number) => {
        if (type === "select_category") {
            const category = Object.keys(initialData).find((key) =>
                initialData[key].includes(item),
            );
            if (category) {
                const updatedCategory = [
                    ...(localData[category] || []),
                    item,
                ].sort() as (string | number)[];
                setLocalData({
                    ...localData,
                    [category]: updatedCategory,
                });
            }
        }
        setSelectedItems((prev) => prev.filter((i) => i !== item));
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const clearAll = () => {
        if (type === "select_category") {
            const newData = { ...initialData };
            setLocalData(newData);
        }
        setSelectedItems([]);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className={styles.multiSelectDropdown}
            ref={wrapperRef}
            tabIndex={0}
            key={id}
        >
            <div className={styles.inputLike} onClick={toggleDropdown}>
                {selectedItems.length === 0 ? (
                    <div className={styles.placeholder}>{placeholder}</div>
                ) : (
                    selectedItems.map((item, index) => (
                        <div key={index} className={styles.tag}>
                            <div className={styles.tagText}>{item}</div>
                            <button onClick={() => handleRemove(item)}>
                                ×
                            </button>
                        </div>
                    ))
                )}
                {selectedItems.length > 0 && (
                    <button className={styles.clearButton} onClick={clearAll}>
                        ×
                    </button>
                )}
                <div className={styles.indicator}>
                    <span className={styles.separator} />
                    <div className={styles.svgHolder}>
                        <DropdownToggle className={styles.dropdownToggle} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className={styles.dropdown}>
                    {type === "select_single"
                        ? localData.map((item: any) => (
                              <div
                                  key={item.value.toString()}
                                  className={styles.item}
                                  onClick={() => handleSelect(item.value)}
                              >
                                  {item.label}
                              </div>
                          ))
                        : Object.keys(localData).map((category) => (
                              <div key={category}>
                                  <div className={styles.category}>
                                      {category}
                                  </div>
                                  {localData[category].map((item: any) => (
                                      <div
                                          key={item.toString()}
                                          className={styles.item}
                                          onClick={() =>
                                              handleSelect(item, category)
                                          }
                                      >
                                          {item}
                                      </div>
                                  ))}
                              </div>
                          ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
