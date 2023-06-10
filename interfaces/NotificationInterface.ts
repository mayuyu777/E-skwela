export default interface NotificationInterface {
    id: string,
    faculty_fk: string,
    student_fk: string,
    content: string,
    mark_as_read: boolean,
    created_at: Date
}