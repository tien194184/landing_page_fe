import React, { useState, useEffect } from 'react';

// Countdown Hook
export const useCountdown = (initialMinutes) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let totalSeconds = initialMinutes * 60;

        const updateTimer = () => {
            if (totalSeconds <= 0) {
                setIsActive(false);
                clearInterval(timerInterval);
                return;
            }
            totalSeconds--;

            const mins = Math.floor(totalSeconds / 60);
            const secs = totalSeconds % 60;

            setMinutes(mins);
            setSeconds(secs);
        };

        const timerInterval = setInterval(updateTimer, 1000);

        return () => clearInterval(timerInterval);
    }, [initialMinutes]); // Removed isActive from dependency array

    return { minutes, seconds, isActive };
};

export const formatNumberPriceInput = (value) => {
    // Remove non-numeric characters and format with periods
    const rawValue = value.replace(/\D/g, '');
    return rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const formatNumberWithSuffix = (value) => {
    const num = parseInt(value.replace(/\D/g, ''), 10);

    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + 'M';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1) + 'k';
    } else {
        return num.toString();
    }
};
export const formatNumberWithSuffixB = (value) => {
    const num = parseInt(value.replace(/\D/g, ''), 10);

    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + 'M';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
};

export const formatTime = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
};
