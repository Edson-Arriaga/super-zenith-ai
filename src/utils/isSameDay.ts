export function isSameDay(date1: Date, date2: Date): boolean {
    return date1.toISOString().substring(0, 10) === date2.toISOString().substring(0, 10)
}
