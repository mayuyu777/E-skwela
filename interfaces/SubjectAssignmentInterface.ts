export default interface SubjectAssignmentInterface {
  subject_assignment_id: number;
  subject_id: number;
  teacher_id: number;
  school_yr_id: number;
  section_assigned_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  day: string;
  time_start: string;
  time_end: string;
}
