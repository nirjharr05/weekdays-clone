import styles from "./Expanded.module.css";

const JobCardExpanded = (props: any) => {
    const { data, setOpen, setActiveCardData, setActiveCardId } = props;

    const salaryStringBuilder = (
        minSalary: number | null,
        maxSalary: number | null,
        currency: string | null = "INR",
    ): string => {
        if (minSalary === null && maxSalary === null) {
            return "Not Available";
        }
        if (minSalary === null) {
            return `0 - ${maxSalary} ${currency}`;
        }
        if (maxSalary === null) {
            return `${minSalary}+ ${currency}`;
        }
        return `${currency} ${minSalary} - ${maxSalary}`;
    };

    const handleClose = () => {
        setActiveCardData({});
        setActiveCardId(null);
        setOpen(false);
    };

    const randomizeType = () => {
        const types = ["Remote", "Hybrid", "In Office"];
        const randomIndex = Math.floor(Math.random() * types.length);
        return types[randomIndex];
    };
    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div
                className={styles.expandedCard}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeButton} onClick={handleClose}>
                    Close
                </button>
                <div className={styles.dataHolder}>
                    About the role
                    <div className={styles.overview}>
                        <img src={data?.logoUrl ?? ""} alt="company-logo" />
                        <h4>Overview</h4>

                        <p>
                            Company name: <strong>{data?.companyName}</strong> |
                            HQ Location : <strong>{data?.location}</strong> |
                            <a href={data?.jdLink}>Website</a>
                        </p>
                    </div>
                    <div className={styles.role}>
                        Role : <strong>{data?.jobRole}</strong>
                    </div>
                    <div className={styles.metrics}>
                        <ul>
                            <li>
                                Salary:{" "}
                                {salaryStringBuilder(
                                    data?.minJdSalary ?? null,
                                    data?.maxJdSalary ?? null,
                                    data?.salaryCurrencyCode,
                                )}{" "}
                                per annum
                            </li>
                            <li>
                                Experience :{" "}
                                {data?.minExp ? `${data?.minExp}+ years` : "-"}
                            </li>
                            <li>Location : {data?.location}</li>
                            <li>Type: {randomizeType()}</li>
                        </ul>
                    </div>
                    <div className={styles.jobDescription}>
                        <h3>Job Description</h3>
                        <p>{data?.jobDetailsFromCompany}</p>
                    </div>
                    <div className={styles.cardFooter}>
                        <button className={styles.easyApply}>
                            ⚡ Easy Apply
                        </button>
                        <button className={styles.unlockReferral}>
                            Unlock Referral links
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCardExpanded;
