import { isMatch, parseISO, isValid } from 'date-fns';

export function validateDates(dateString) {
    if (!isMatch(dateString, 'yyyy-MM-dd')) return false;

    const date = parseISO(dateString);

    return isValid(date);
}

export function validatePeriod(start, end) {
    const START_DATE = new Date(start);
    const END_DATE = new Date(end);

    return START_DATE < END_DATE
}