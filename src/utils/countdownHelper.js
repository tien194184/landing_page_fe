import React from "react";

export const useCountdown = (initialMinutes) => {
    const [minutes, setMinutes] = React.useState(initialMinutes);
    const [seconds, setSeconds] = React.useState(0);
    const [isActive, setIsActive] = React.useState(true);

    React.useEffect(() => {
        let totalSeconds = initialMinutes * 60;

        const updateTimer = () => {
            if (totalSeconds <= 0) {
                setIsActive(false);
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
    }, [initialMinutes, isActive]);

    return { minutes, seconds, isActive };
};