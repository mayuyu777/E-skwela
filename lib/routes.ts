
const routes = [
    {
        role: 'admin',
        access: ['/admin/home']
    },
    {
        role: 'teacher',
        access: ['/teacher/home','/teacher/about','/teacher/advisory','/teacher/subjects','/teacher/schedule','/teacher/home']
    },
    {
        role: 'student',
        access: ['/student/home','/student/about','/student/grades','/student/schedule','/student/enrollment']
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