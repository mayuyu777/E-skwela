import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { hasAccess } from "@/lib/routes";
import Layout from "@/components/pages/Layout";
import SessionInterface from "@/interfaces/SessionInterface";
import TeacherAnnouncementPage from "@/screens/Teacher/Announcement";

export default function Announcements() {
  const { data: session, status } = useSession();
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

  return (
    <Layout>
      <TeacherAnnouncementPage />
    </Layout>
  );
}
