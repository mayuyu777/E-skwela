import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { hasAccess } from "@/lib/routes";
import SessionInterface from "@/interfaces/SessionInterface";
import AdminLayout from "@/components/pages/AdminLayout";

export default function Home() {
  const { data: session, status } = useSession();
  const sessionData = getSession();
  const router = useRouter();

  useEffect(() => {
    let sessionUser = session?.user as SessionInterface;
    if (status === "unauthenticated") {
      router.push("/SignIn");
    }
    const res = hasAccess(router.pathname, sessionUser?.role);

    if (!res.authorized) {
      router.push(res.path);
    }
  }, [session]);

  return <AdminLayout>Text</AdminLayout>;
}
