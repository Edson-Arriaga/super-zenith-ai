export default function getToday() : Date{
    const today = new Date()
    const timezoneOffset = today.getTimezoneOffset() / 60
    today.setHours(today.getHours() - timezoneOffset)
    return today
}