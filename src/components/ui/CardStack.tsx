"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CardStack = ({
    items,
    offset,
    scaleFactor,
}: {
    items: {
        id: number;
        content: React.ReactNode;
    }[];
    offset?: number;
    scaleFactor?: number;
}) => {
    const CARD_OFFSET = offset || 10;
    const SCALE_FACTOR = scaleFactor || 0.06;
    const [cards, setCards] = useState(items);

    useEffect(() => {
        startFlipping();
    }, []);

    const startFlipping = () => {
        const interval = setInterval(() => {
            setCards((prevCards: { id: number; content: React.ReactNode }[]) => {
                const newArray = [...prevCards]; // create a copy of the array
                newArray.unshift(newArray.pop()!); // move the last element to the front
                return newArray;
            });
        }, 5000);

        return () => clearInterval(interval);
    };

    return (
        <div className="relative h-96 w-full md:w-96">
            {cards.map((card, index) => {
                return (
                    <motion.div
                        key={card.id}
                        className="absolute dark:bg-black bg-white h-96 w-full md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
                        style={{
                            transformOrigin: "top center",
                        }}
                        animate={{
                            top: index * -CARD_OFFSET,
                            scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
                            zIndex: cards.length - index, // decrease z-index for cards that are behind
                        }}
                    >
                        {card.content}
                    </motion.div>
                );
            })}
        </div>
    );
};
