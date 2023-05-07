
const routes = [
    {
        role: 'admin',
        access: ['/admin/Home']
    },
    {
        role: 'teacher',
        access: ['/teacher/Home','/teacher/About','/teacher/Advisory','/teacher/Subjects','/teacher/Schedule']
    },
    {
        role: 'student',
        access: ['/student/Home','/student/About','/student/Grades','/student/Schedule','/student/Enrollment']
    }
]


export function hasAccess(path:string, role:string){
    let firstpath = '';
    let authorized = false;
    routes.forEach(element => {
        if(element.role === role){
            firstpath = element.access[0];
            element.access.forEach(element => {
                if(element === path){
                    authorized = true;
                }
            });
        }
    });

    return {
        authorized: authorized,
        path: authorized? path : firstpath
    }
   
}