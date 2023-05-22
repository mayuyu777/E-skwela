import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { hasAccess } from "@/lib/routes";
import Layout from "@/components/pages/Layout";

export default function Home(){
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(status === 'unauthenticated'){
            router.push('/SignIn');
        }
        const res = hasAccess(router.pathname, session?.user.name.role);
        if(!res.authorized){
            router.push(res.path);
        }
    },[session])

    return(
        <Layout>
            <>Home Student</>
        </Layout>
    );
}

