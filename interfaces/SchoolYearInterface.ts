export default interface SchoolYearInterface{
    id: string,
    start?: number | null,
    enrollment_open: number,
    status: number,
    date_started: string,
    date_ended: string | null,
    created_at: string
}