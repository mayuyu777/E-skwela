import { role } from "@/constants/role";

const routes = [
  {
    role: role.admin,
    access: [
      "/admin/Dashboard",
      "/admin/Students",
      "/admin/Teachers",
      "/admin/Sections",
      "/admin/Subjects",
      "/admin/Announcements",
      "/admin/Accounts",
      "/admin/Enrollment",
      "/admin/Admission",
      "/admin/SchoolYear",
    ],
  },
  {
    role: role.teacher,
    access: [
      "/teacher/Announcements",
      "/teacher/About",
      "/teacher/ClassAdvisory",
      "/teacher/ClassAdvisory/*",
      "/teacher/Subjects/*",
      "/teacher/Subjects",
      "/teacher/Schedule",
    ],
  },
  {
    role: role.student,
    access: [
      "/student/Announcements",
      "/student/About",
      "/student/Grades",
      "/student/Schedule",
      "/student/Enrollment",
    ],
  },
];

export function hasAccess(path: string, role: number) {
  let firstpath = "";
  let authorized = false;

  routes.forEach((element) => {
    if (element.role == role) {
      firstpath = element.access[0];

      element.access.forEach((element) => {
        if (element === path) {
          authorized = true;
        }

        if (element.includes("teacher/Subjects/") && path.includes("teacher/Subjects/")) {
          authorized = true;
          console.log('success')
        }

        if (element.includes("teacher/ClassAdvisory/") && path.includes("teacher/ClassAdvisory/")) {
          authorized = true;
        }
      });
    }
  });


  return {
    authorized: authorized,
    path: authorized ? path : firstpath,
  };
}
