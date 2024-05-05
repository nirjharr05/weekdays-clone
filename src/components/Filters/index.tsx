import { useEffect, useState } from "react";
import MultiSelectDropdown from "@/components/MultiSelect";
import SingleSearch from "@/components/SearchInput";
import {
    rolesData,
    experienceYears,
    modeOfWork,
    minimumBasePay,
} from "@/data/FilterData";
import { FilterTypesValues } from "@/interfaces/Filters";
import styles from "./Filters.module.css";

const FilterComponent = (props: any) => {
    const { getFilters } = props;
    const [filterItems, setFilterItems] = useState<Partial<FilterTypesValues>>(
        {},
    );

    const handleFilterChange = (filterId: string, selectedItems: any) => {
        setFilterItems((prevItems) => ({
            ...prevItems,
            [filterId]: selectedItems,
        }));
    };

    const filterMetaData = [
        {
            id: "jobRole",
            placeholder: "Roles",
            type: "select_category",
            data: rolesData,
        },
        {
            id: "minExp",
            placeholder: "Experience",
            type: "select_single",
            data: experienceYears,
        },
        {
            id: "location",
            placeholder: "Remote",
            type: "select_single",
            data: modeOfWork,
        },
        {
            id: "minJdSalary",
            placeholder: "Minimum Base Pay Salary",
            type: "select_single",
            data: minimumBasePay,
        },
        {
            id: "companyName",
            placeholder: "Search Company Name",
            type: "input",
        },
    ];

    useEffect(() => {
        getFilters(filterItems);
    }, [filterItems]);

    return (
        <div className={styles.filterBar}>
            <div className={styles.inputHolder}>
                {filterMetaData.map((filter: any) => {
                    const { id, placeholder, data, type } = filter;
                    return ["select_single", "select_category"].includes(
                        type,
                    ) ? (
                        <MultiSelectDropdown
                            key={id}
                            id={id}
                            placeholder={placeholder}
                            data={data}
                            type={type}
                            setFilterItems={(id: string, items: any) =>
                                handleFilterChange(id, items)
                            }
                        />
                    ) : type === "input" ? (
                        <SingleSearch
                            key={id}
                            id={id}
                            placeholder={placeholder}
                            setFilterItems={(value: string) =>
                                handleFilterChange(id, [value])
                            }
                        />
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default FilterComponent;
