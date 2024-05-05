import { useState, useEffect, useCallback, useRef } from "react";

import JobCard from "@/components/JobCard/Standard";
import JobCardExpanded from "@/components/JobCard/Expanded";

import useDynamicRowCompletion from "@/hooks/useDynamicRowCompletion";

import ApiService from "@/services/APIService";

import { JobDetails } from "@/interfaces/JobItem";

import styles from "./CardGrid.module.css";

const CardGrid = (props: any) => {
    const { filterData, setCount } = props;
    const [items, setItems] = useState<JobDetails[]>([]);
    const [filteredItems, setFilteredItems] = useState<JobDetails[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noMoreData, setNoMoreData] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [activeCardData, setActiveCardData] = useState<JobDetails[]>([]);
    const [activeCardId, setActiveCardId] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    // hooks and ref added to know how many items are there per row as per screen size
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsPerRow = useDynamicRowCompletion(containerRef, 360, 40);

    const checkRowCompletion = useCallback(() => {
        if (filteredItems.length % itemsPerRow !== 0 && !noMoreData) {
            fetchData();
        }
    }, [filteredItems, itemsPerRow, noMoreData]);

    const applyFilters = () => {
        const activeFilters = Object.fromEntries(
            Object.entries(filterData).filter(
                ([_, filters]: any) => filters.length > 0,
            ),
        );

        if (Object.keys(activeFilters).length === 0) {
            setFilteredItems(items);
            return;
        }

        const newFilteredItems = items.filter((item: any) => {
            return Object.entries(activeFilters).every(
                ([key, filters]: any) => {
                    switch (key) {
                        case "minExp":
                        case "minJdSalary":
                            return filters.some((filter: any) => {
                                return (
                                    item[key] != null &&
                                    Number(item[key]) >= Number(filter.value)
                                );
                            });
                        case "location":
                            return filters.some((filter: any) => {
                                const itemLocation = item[key]
                                    ? item[key].toString().toLowerCase()
                                    : "";
                                const filterValue = filter.value
                                    .toString()
                                    .toLowerCase();

                                switch (filterValue) {
                                    case "remote":
                                        return itemLocation === "remote";
                                    case "office":
                                        return itemLocation !== "remote";
                                    case "hybrid":
                                        return itemLocation.includes("hybrid");
                                    default:
                                        return false;
                                }
                            });
                        case "city":
                            return filters.some(
                                (filter: any) =>
                                    item["location"] &&
                                    item["location"]
                                        .toString()
                                        .toLowerCase() ===
                                        filter.value.toString().toLowerCase(),
                            );
                        case "jobRole":
                            return filters.some(
                                (filter: any) =>
                                    item[key] &&
                                    item[key].toString().toLowerCase() ===
                                        filter.value.toString().toLowerCase(),
                            );
                        default:
                            return (
                                item[key] &&
                                item[key]
                                    .toString()
                                    .toLowerCase()
                                    .includes(filters.toLowerCase())
                            );
                    }
                },
            );
        });

        setFilteredItems(newFilteredItems);
    };

    const fetchData = useCallback(async () => {
        if (isLoading || noMoreData) return;

        setIsLoading(true);
        try {
            const response = await ApiService.post(
                "https://api.weekday.technology/adhoc/getSampleJdJSON",
                { page, limit: 30 },
            );
            const data = response?.jdList || [];
            if (data.length > 0) {
                setItems((prevItems) => [...prevItems, ...data]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setNoMoreData(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, noMoreData, page]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            isLoading
        ) {
            return;
        }

        fetchData();
    }, [isLoading, fetchData]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        applyFilters();
    }, [items, filterData]);

    useEffect(() => {
        checkRowCompletion();
    }, [filteredItems, checkRowCompletion]);

    useEffect(() => {
        setCount(filteredItems?.length);
    }, [filteredItems]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div ref={containerRef} className={styles.cardGridContainer}>
            {filteredItems.map((item: JobDetails, idx: number) => (
                <div key={`id_${idx}`} className={styles.card}>
                    <JobCard
                        id={`card_${idx}`}
                        data={item}
                        setActiveCardData={setActiveCardData}
                        setActiveCardId={setActiveCardId}
                        setOpen={setOpen}
                    />
                </div>
            ))}
            {isLoading && <div>Loading more...</div>}
            {noMoreData && <div>No more data.</div>}
            {open && (
                <JobCardExpanded
                    id={activeCardId}
                    data={activeCardData}
                    setActiveCardData={setActiveCardData}
                    setActiveCardId={setActiveCardId}
                    setOpen={setOpen}
                />
            )}
        </div>
    );
};

export default CardGrid;
