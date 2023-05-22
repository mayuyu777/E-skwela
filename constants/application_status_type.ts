export const application_status_type = {
    new: 0,          //Only for new student applicants. Application is being processed
    rejected: 1,     //Only for new student applicants. Application is rejected
    enrollee: 2,     //New applicant is accepted
    eligible: 3,     //Only for official students. Eligible to enroll to the next year level
    not_eligible: 4, //Only for official students. Needs to settle account or other grade issue tob be able to enroll to the next year level
}
    