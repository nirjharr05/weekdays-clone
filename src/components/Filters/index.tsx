import MultiSelectDropdown from "@/components/MultiSelect";
import SingleSearch from "@/components/SearchInput";
import {
    rolesData,
    numberOfEmployees,
    experienceYears,
    modeOfWork,
    minimumBasePay,
} from "@/data/FilterData";
import styles from "./Filters.module.css";

const FilterComponent = (props: any) => {
    const filterMetaData = [
        {
            id: "roles",
            placeholder: "Roles",
            type: "select_category",
            data: rolesData,
        },
        // {
        //     id: "numberOfEmployees",
        //     placeholder: "Number of Employees",
        //     type: "select_single",
        //     data: numberOfEmployees,
        // },
        {
            id: "experience",
            placeholder: "Experience",
            type: "select_single",
            data: experienceYears,
        },
        {
            id: "modeOfWork",
            placeholder: "Remote",
            type: "select_single",
            data: modeOfWork,
        },
        {
            id: "minimumBasePay",
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

    return (
        <div className={styles.filterBar}>
            <div className={styles.inputHolder}>
                {filterMetaData.map((filter: any) => {
                    const { id, placeholder, data, type } = filter || {};

                    return ["select_single", "select_category"].includes(
                        type,
                    ) ? (
                        <MultiSelectDropdown
                            key={id}
                            placeholder={placeholder}
                            data={data}
                            type={type}
                        />
                    ) : ["input"].includes(type) ? (
                        <SingleSearch key={id} placeholder={placeholder} />
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default FilterComponent;
