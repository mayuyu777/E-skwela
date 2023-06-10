import SchoolYearInterface from "./SchoolYearInterface"
import StudentInterface from "./StudentInterface"
export default interface StudentEnrollmentInterface {
    id: string,
    academic_level: number,
    class_section_fk?: string,
    student_fk?: string,
    enrolled_by_fk?: string,
    school_year_fk?: string,
    enrollment_status: number,
    status: number,
    school_year?: SchoolYearInterface,
    student?: StudentInterface,
}