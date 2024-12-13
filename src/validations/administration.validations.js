export function validateDates(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
        return false;
    }

    const date = new Date(dateString);

    const timestamp = date.getTime();
    if (isNaN(timestamp)) {
        return false;
    }

    const [year, month, day] = dateString.split('-').map(Number);
    return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() + 1 === month &&
        date.getUTCDate() === day
    );
}

export function validatePeriod(start, end) {
    const START_DATE = new Date(start);
    const END_DATE = new Date(end);

    return START_DATE < END_DATE
}