import FacultyInterface from "./FacultyInterface";

export default interface AnnouncementInterface {
  id: string;
  title: string;
  content: string;
  type: string;
  faculty?: FacultyInterface;
  created_at: string;
}
