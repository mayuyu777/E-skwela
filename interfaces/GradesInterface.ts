export default interface GradesInterface {
    grade_id : number;
    subject_assignment_id : number;
    student_id : number;
    first_grading: number;
    second_grading: number;
    third_grading: number;
    fourth_grading: number;
    final_grading: number;
    remarks: string;
    has_remedial: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  }
  