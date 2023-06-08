import ClassSubjectInterface from "./ClassSubjectInterface";
import SchoolYearInterface from "./SchoolYearInterface";
import SubjectInterface from "./SubjectInterface";
export default interface GradesInterface {
  id : string,
  academic_level: number,
  class_subject_fk?: string,
  student_fk?: string,
  school_year_fk?: string,
  first_grading: number,
  second_grading: number,
  third_grading: number,
  fourth_grading: number,
  remarks?: string | null,
  class_subjects?: ClassSubjectInterface,
  school_year?: SchoolYearInterface,
}
  