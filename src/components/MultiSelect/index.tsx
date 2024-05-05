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

    const handleSelect = (item: string | number, category?: string) => {
        if (type === "select_single") {
            setSelectedItems((prev) => [...prev, item]);
            const updatedData = localData.filter((i: any) => i.value !== item);
            setLocalData(updatedData);
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
        setSelectedItems((prev) => prev.filter((i) => i !== item));

        if (type === "select_single") {
            const itemDetails = initialData.find((i: any) => i.value === item);
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
                setLocalData({
                    ...localData,
                    [category]: updatedCategory,
                });
            }
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const clearAll = () => {
        const newData =
            type === "select_single" ? initialData : { ...initialData };
        setLocalData(newData);
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
                                  onClick={() => handleSelect(item.value)}
                              >
                                  {item.label}
                              </div>
                          ))
                        : localData &&
                          Object.keys(localData).length > 0 &&
                          Object.keys(localData).map((category) => (
                              <div key={category}>
                                  <div className={styles.category}>
                                      {category}
                                  </div>
                                  {localData[category]?.map(
                                      (item: any, idx: number) => (
                                          <div
                                              key={`${item.toString()}_${idx}`}
                                              className={styles.item}
                                              onClick={() =>
                                                  handleSelect(item, category)
                                              }
                                          >
                                              {item}
                                          </div>
                                      ),
                                  )}
                              </div>
                          ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
