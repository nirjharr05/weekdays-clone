import React from "react";
import styles from "./Expanded.module.css";

const JobCardExpanded = (props: any) => {
    const { data, onClose } = props;
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.expandedCard}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeButton} onClick={onClose}>
                    Close
                </button>
                <h2>
                    {data.title} - {data.location}
                </h2>
                <p>Company: {data.company}</p>
                <p>Salary: {data.salary}</p>
                <p>{data.experience}</p>
                <p>About: {data.about}</p>
                <p>Detailed Info: {data.detailedInfo}</p>
            </div>
        </div>
    );
};

export default JobCardExpanded;
