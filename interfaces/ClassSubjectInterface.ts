import SubjectInterface from "./SubjectInterface";
import ClassSectionsInterface from "./ClassSectionsInterface";

export default interface ClassSubjectInterface {
  id: string;
  subject_fk?: string;
  teacher_fk?: string;
  class_section_fk?: string;
  status: number;
  subjects?:  SubjectInterface;
  class_sections?: ClassSectionsInterface;
}
