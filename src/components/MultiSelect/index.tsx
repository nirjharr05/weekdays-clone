import React, { useState, useRef, useEffect } from "react";
import DropdownToggle from "../../svg/DropdownToggle";

import styles from "./MultiSelectDropdown.module.css";

function MultiSelectDropdown() {
    const [items, setItems] = useState<any>({
        Engineering: ["Backend", "Frontend", "Fullstack"],
        Design: ["UX", "UI"],
        "Project Management": ["Scrum Master", "Product Owner"],
    });
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const wrapperRef = useRef<any>(null);

    const handleSelect = (item: any, category: any) => {
        setSelectedItems((prev: any) => [...prev, item]);
        setItems((prev: any) => ({
            ...prev,
            [category]: prev[category].filter((i: any) => i !== item),
        }));
        setIsOpen(false);
    };

    const handleRemove = (item: any) => {
        const category: any = Object.keys(items).find(
            (key) => items[key].includes(item) || [],
        );
        setSelectedItems((prev) => prev.filter((i: any) => i !== item));
        setItems((prev: any) => ({
            ...prev,
            [category]: [...prev[category], item].sort(),
        }));
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const clearAll = () => {
        const newItems = { ...items };
        selectedItems.forEach((item) => {
            const category: any = Object.keys(items).find(
                (key) => newItems[key].includes(item) || [],
            );
            newItems[category].push(item);
        });
        setItems(newItems);
        setSelectedItems([]);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }
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
        >
            <div className={styles.inputLike} onClick={toggleDropdown}>
                {selectedItems.length === 0 ? (
                    <div className={styles.placeholder}>Select Roles</div>
                ) : (
                    selectedItems.map((item) => (
                        <div key={item} className={styles.tag}>
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
                    <div className={styles.dropdownArrowContainer}>
                        <DropdownToggle className={styles.dropdownToggle} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className={styles.dropdown}>
                    {Object.keys(items).map((category) => (
                        <div key={category}>
                            <div className={styles.category}>{category}</div>
                            {items[category].map((item: any) => (
                                <div
                                    key={item}
                                    className={styles.item}
                                    onClick={() => handleSelect(item, category)}
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
}

export default MultiSelectDropdown;
