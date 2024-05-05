import { useState } from "react";

import CardGrid from "@/components/CardGrid";
import FilterComponent from "@/components/Filters";

import { FilterTypes } from "@/interfaces/Filters";

import styles from "./Layout.module.css";

const Layout = () => {
    const [filterData, setFilterData] = useState<Partial<FilterTypes>>({});
    const [count, setCount] = useState<number>(0);

    return (
        <div className={styles.content}>
            <header className={styles.headerContainer}>
                <div className={styles.header}>
                    Search jobs
                    <span className={styles.badge}>{count}</span>
                </div>
            </header>
            <FilterComponent getFilters={setFilterData} />
            <CardGrid filterData={filterData} setCount={setCount} />
        </div>
    );
};

export default Layout;
