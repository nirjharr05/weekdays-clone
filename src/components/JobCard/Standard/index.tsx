import { useEffect, useState } from "react";
import { JobDetails } from "@/interfaces/JobItem";
import styles from "./Standard.module.css";

const JobCard = (props: any) => {
    const { id, data, setActiveCardData, setActiveCardId, setOpen } = props;
    const [cardData, setCardData] = useState<Partial<JobDetails>>({});

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

    useEffect(() => {
        setCardData(data);
    }, [data]);

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.header}>
                    {/* Randomizing the header as this is not coming part of API */}
                    <p>
                        <span>⌛</span>
                        Posted {Math.floor(Math.random() * 10) + 1} days ago
                    </p>
                </div>
            </div>
            <div className={styles.cardBody}>
                <div className={styles.companyProfile}>
                    <div className={styles.logoHolder}>
                        <img src={cardData?.logoUrl ?? ""} alt="company-logo" />
                    </div>
                    <div className={styles.dataHolder}>
                        <div className={styles.position}>
                            <h3 id={styles.companyName}>
                                {cardData?.companyName ?? "N/A"}
                            </h3>
                            <h2 id={styles.jobRole}>
                                {cardData?.jobRole ?? "N/A"}
                            </h2>
                        </div>
                        <p id={styles.location}>
                            {cardData?.location ?? "N/A"}
                        </p>
                    </div>
                </div>
                <p className={styles.salaryHolder}>
                    Estimated Salary : &nbsp;
                    {salaryStringBuilder(
                        cardData?.minJdSalary ?? null,
                        cardData?.maxJdSalary ?? null,
                        cardData?.salaryCurrencyCode,
                    )}
                </p>
                <div className={styles.aboutCompany}>
                    <div className={styles.data}>
                        <p className={styles.jdHeader}>Job Description:</p>
                        <p className={styles.jdBody}>
                            {cardData?.jobDetailsFromCompany}
                        </p>
                    </div>
                    <div className={styles.showMore}>
                        <button
                            className={styles.button}
                            onClick={() => {
                                setActiveCardId(id);
                                setActiveCardData(cardData);
                                setOpen(true);
                            }}
                        >
                            View job
                        </button>
                    </div>
                    <div className={styles.experienceHolder}>
                        <h3>Minimum Experience</h3>
                        <h2>
                            {cardData?.minExp
                                ? `${cardData?.minExp} years`
                                : "-"}
                        </h2>
                    </div>
                </div>
            </div>
            <div className={styles.cardFooter}>
                <button className={styles.easyApply}>Easy Apply</button>
                <button className={styles.unlockReferral}>
                    Unlock Referral links
                </button>
            </div>
        </div>
    );
};

export default JobCard;
