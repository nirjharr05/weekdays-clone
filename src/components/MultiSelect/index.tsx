import { useState, useRef, useEffect } from "react";

import DropdownToggle from "@/svg/DropdownToggle";

import styles from "./MultiSelectDropdown.module.css";

const MultiSelectDropdown = (props: any) => {
    const { id, placeholder, data, type, setFilterItems } = props;
    const [localData, setLocalData] = useState<any>(data);
    const [initialData] = useState<any>(data);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const categoryOrderRef = useRef(Object.keys(data));

    const handleSelect = (item: any, category?: string) => {
        if (type === "select_single") {
            setSelectedItems((prev) => [...prev, item]);
            const updatedData = localData.filter(
                (i: any) => i?.value !== item?.value,
            );
            setLocalData(updatedData);
        } else if (type === "select_category" && category) {
            setSelectedItems((prev) => [...prev, item]);
            const updatedCategory = localData[category].filter(
                (i: any) => i !== item,
            );
            const newData = { ...localData, [category]: updatedCategory };
            if (updatedCategory.length === 0) {
                delete newData[category];
            }
            setLocalData(newData);
        }
        setIsOpen(false);
    };

    const handleRemove = (item: any) => {
        setSelectedItems((prev) => prev.filter((i) => i !== item));
        if (type === "select_single") {
            const itemDetails = initialData.find(
                (i: any) => i?.value === item?.value,
            );
            if (itemDetails) {
                setLocalData((prevData: any) =>
                    [...prevData, itemDetails].sort(
                        (a: any, b: any) => a.value - b.value,
                    ),
                );
            }
        } else if (type === "select_category") {
            const category = Object.keys(initialData).find((key) =>
                initialData[key].some((i: any) => i === item),
            );
            if (category) {
                const updatedCategory = [
                    ...(localData[category] || []),
                    item,
                ].sort((a: any, b: any) => a - b);
                const newData = { ...localData, [category]: updatedCategory };
                setLocalData(newData);
            }
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const clearAll = () => {
        setLocalData(
            type === "select_single" ? initialData : { ...initialData },
        );
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
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setLocalData(data);
    }, [data]);

    useEffect(() => {
        setFilterItems(id, selectedItems);
    }, [selectedItems, id]);

    return (
        <div
            className={styles.multiSelectDropdown}
            ref={wrapperRef}
            tabIndex={0}
            key={id}
        >
            <div className={styles.inputLike} onClick={toggleDropdown}>
                <div className={styles.tagHolder}>
                    <div
                        className={`${styles.placeholder} ${selectedItems.length > 0 ? styles.filled : ""}`}
                    >
                        {placeholder}
                    </div>
                    {selectedItems.map((item, index) => (
                        <div key={index} className={styles.tag}>
                            <div className={styles.tagText}>{item.label}</div>
                            <button onClick={() => handleRemove(item)}>
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <div className={styles.actionHolder}>
                    {selectedItems.length > 0 && (
                        <button
                            className={styles.clearButton}
                            onClick={clearAll}
                        >
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
            </div>
            {isOpen && (
                <div className={styles.dropdown}>
                    {type === "select_single"
                        ? localData &&
                          localData.length > 0 &&
                          localData.map((item: any, idx: number) => (
                              <div
                                  key={`${item.value.toString()}_${idx}`}
                                  className={styles.item}
                                  onClick={() => handleSelect(item)}
                              >
                                  {item.label}
                              </div>
                          ))
                        : categoryOrderRef.current.map(
                              (category) =>
                                  localData[category] && (
                                      <div key={category}>
                                          <div className={styles.category}>
                                              {category}
                                          </div>
                                          {localData[category].map(
                                              (item: any, idx: number) => (
                                                  <div
                                                      key={`${item.value.toString()}_${idx}`}
                                                      className={styles.item}
                                                      onClick={() =>
                                                          handleSelect(
                                                              item,
                                                              category,
                                                          )
                                                      }
                                                  >
                                                      {item.label}
                                                  </div>
                                              ),
                                          )}
                                      </div>
                                  ),
                          )}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
