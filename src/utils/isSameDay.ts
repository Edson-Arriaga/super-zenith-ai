export function isSameDay(date1: Date, date2: Date): boolean {
    const utcDate1 = new Date(date1.toISOString().substring(0, 10));
    const utcDate2 = new Date(date2.toISOString().substring(0, 10));

    return utcDate1.getTime() === utcDate2.getTime();
}
