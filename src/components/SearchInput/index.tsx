import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import styles from "./SingleSearch.module.css";

const SingleSearch = (props: any) => {
    const { placeholder, onSearch } = props;
    const [inputValue, setInputValue] = useState("");

    const debouncedSearch = debounce((value: any) => {
        onSearch(value);
    }, 300);
    useEffect(() => {
        debouncedSearch(inputValue);
        return () => {
            debouncedSearch.cancel();
        };
    }, [inputValue]);

    const handleChange = (event: any) => {
        setInputValue(event.target.value);
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                className={`${styles.input} ${inputValue ? styles.filled : ""}`}
            />
            <label
                className={`${styles.label} ${inputValue ? styles.filled : ""}`}
            >
                {placeholder}
            </label>
        </div>
    );
};

export default SingleSearch;
