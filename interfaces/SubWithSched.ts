import ClassScheduleInterface from "./ClassScheduleInterface";
import SubjectInterface from "./SubjectInterface";

export default interface SubWithSched { 
    subjects: SubjectInterface,
    class_schedules: ClassScheduleInterface
}