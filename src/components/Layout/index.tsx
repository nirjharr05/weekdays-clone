import { useState } from "react";
import CardGrid from "@/components/CardGrid";
import FilterComponent from "@/components/Filters";

import { FilterTypes } from "@/interfaces/Filters";

import styles from "./Layout.module.css";

const Layout = () => {
    const [filterData, setFilterData] = useState<Partial<FilterTypes>>({});

    return (
        <div className={styles.content}>
            <header className={styles.header}>Search jobs</header>
            <FilterComponent getFilters={setFilterData} />
            <CardGrid filterData={filterData} />
        </div>
    );
};

export default Layout;
