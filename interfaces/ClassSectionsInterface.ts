import SectionInterface from "./SectionInterface";
import SchoolYearInterface from "./SchoolYearInterface";

export default interface ClassSectionsInterface {
  id: string,
  section_fk: string,
  school_year_fk: string,
  class_advisor_fk: string,
  status: number,
  sections?: SectionInterface,
  school_year?: SchoolYearInterface
}
