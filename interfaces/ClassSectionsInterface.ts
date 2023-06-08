import SectionInterface from "./SectionInterface";

export default interface ClassSectionsInterface {
  id: string,
  section_fk: string,
  school_year_fk: string,
  class_advisor_fk: string,
  status: number,
  sections?: SectionInterface,
}
