import { useState, useEffect, useCallback } from "react";

const useDynamicRowCompletion = (
    containerRef: any,
    itemWidth: any,
    gap = 0,
) => {
    const [itemsPerRow, setItemsPerRow] = useState<number>(3);
    const updateItemsPerRow = useCallback(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const calculatedItemsPerRow = Math.floor(
                (containerWidth + gap) / (itemWidth + gap),
            );
            setItemsPerRow(calculatedItemsPerRow);
        }
    }, [containerRef, itemWidth, gap]);

    useEffect(() => {
        updateItemsPerRow();
        window.addEventListener("resize", updateItemsPerRow);
        return () => {
            window.removeEventListener("resize", updateItemsPerRow);
        };
    }, [updateItemsPerRow]);

    return itemsPerRow;
};

export default useDynamicRowCompletion;
