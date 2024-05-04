/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import JobCard from "@/components/JobCard/Standard";
import ApiService from "@/services/APIService";

import styles from "./CardGrid.module.css";

const CardGrid = () => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response: any = await ApiService.post(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          page,
          limit: 9,
        }
      );
      const data = response?.jdList;
      if (data && data?.length > 0) {
        setItems((prevItems: any) => [...prevItems, ...data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={styles.cardGridContainer}>
      <JobCard />
      {items?.map((item, idx) => (
        <div key={`item_${idx}`} className={styles.card}></div>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default CardGrid;
