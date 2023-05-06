import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { hasAccess } from "@/lib/routes";

export default function home(){
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(status === 'unauthenticated'){
        router.push('/auth/signin');
        }
        const res = hasAccess(router.pathname, session?.user.name.role);
        if(!res.authorized){
        router.push(res.path);
        }
    },[session])

    return(
        <>Home Teacher</>
    );
}

