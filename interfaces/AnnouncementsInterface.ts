import FacultyInterface from "./FacultyInterface";

export default interface AnnouncementInterface {
  id: string,
  title: string,
  content: string,
  type: number,
  faculty?: FacultyInterface,
  created_at: string,
  updated_at: string
}
