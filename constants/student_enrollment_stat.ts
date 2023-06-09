export const student_enrollment_stat = {
    new: 0,          //Only for new student applicants. Application is being processed
    rejected: 1,     //Only for new student applicants. Application is rejected
    pending: 2,      //Enrolling or new applicant is accepted
    enrollee: 3,     //Student is currently enrolled
    eligible: 4,     //Only for official students. Eligible to enroll to the next year level
    not_eligible: 5, //Only for official students. Needs to settle account or other grade issue tob be able to enroll to the next year level
}
    