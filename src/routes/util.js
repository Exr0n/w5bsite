// from gpt 
export function setHourlyInterval(targetHour, callback) {
    // Helper function to calculate the delay until the next occurrence
    function getDelayUntilNextHour(targetHour) {
        const now = new Date();
        const nextTargetTime = new Date(now);

        // Set the next occurrence of the target hour
        nextTargetTime.setHours(targetHour, 0, 1, 0); // Target hour:00:00
        if (now >= nextTargetTime) {
            // If it's already past the target hour, set to tomorrow
            nextTargetTime.setDate(nextTargetTime.getDate() + 1);
        }

        // Return the delay in milliseconds
        return nextTargetTime - now;
    }

    // Calculate initial delay
    const initialDelay = getDelayUntilNextHour(targetHour);

    let interval = null;

    // Set the initial timeout to align with the target hour
    const timeout = setTimeout(() => {
        callback();
        // Once aligned, set a fixed interval of 24 hours
        interval = setInterval(callback, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    }, initialDelay);
    return () => { clearTimeout(timeout); interval !== null && clearInterval(interval); }
}

export function setSecondInterval(targetSecond, callback) {
    // Helper to get delay until next occurrence of targetSecond
    function getDelay() {
        const now = new Date();
        const next = new Date(now);

        // If we're already past the target second in this minute, move to next minute
        if (now.getSeconds() >= targetSecond) {
            next.setMinutes(next.getMinutes() + 1);
        }
        // Set to target second, zero milliseconds
        next.setSeconds(targetSecond, 0);

        return next - now;
    }

    let intervalId = null;

    // Align to the upcoming targetSecond
    const timeoutId = setTimeout(() => {
        callback();
        // After the first trigger, call callback every 60 seconds
        intervalId = setInterval(callback, 60 * 1000);
    }, getDelay());

    // Return a cleanup function
    return () => {
        clearTimeout(timeoutId);
        if (intervalId) {
            clearInterval(intervalId);
        }
    };
}