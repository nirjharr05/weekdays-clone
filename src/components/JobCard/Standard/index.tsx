import React, { useState } from "react";
import JobCardExpanded from "@/components/JobCard/Expanded";
import styles from "./Standard.module.css";

const JobCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const dummyData = {
    title: "Senior Mobile Engineer",
    company: "Outbrain",
    location: "Gurugram",
    salary: "₹14 - 18 LPA",
    about:
      "Outbrain (Nasdaq: OB) is a leading technology platform that drives business results by engaging people across the open web...",
    experience: "3 years",
    detailedInfo:
      "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.",
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.header}></div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.companyProfile}>
          <div className={styles.logoHolder}>Image</div>
          <div className={styles.dataHolder}>
            <div className={styles.position}>
              <h3>{dummyData.company}</h3>
              <h2>{dummyData.title}</h2>
            </div>
            <p>{dummyData.location}</p>
          </div>
        </div>
        <p className={styles.salaryHolder}>
          Estimated Salary : {dummyData.salary}
        </p>
        <div className={styles.aboutCompany}>
          <div className={styles.data}>
            <p className={styles.jdHeader}>Job Description:</p>
            <p className={styles.jdBody}>{dummyData.detailedInfo}</p>
          </div>
          <div className={styles.showMore}>
            <button
              className={styles.button}
              onClick={() => setIsExpanded(true)}
            >
              View job
            </button>
          </div>
          <div className={styles.experienceHolder}>
            <h3>Minimum Experience</h3>
            <h2>{dummyData.experience}</h2>
          </div>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <button className={styles.easyApply}>Easy Apply</button>
        <button className={styles.unlockReferral}>Unlock Referral links</button>
      </div>

      {isExpanded && (
        <JobCardExpanded
          data={dummyData}
          onClose={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default JobCard;
