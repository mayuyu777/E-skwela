import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { hasAccess } from "@/lib/routes";
import Layout from "@/components/pages/Layout";
import SessionInterface from "@/interfaces/SessionInterface";
import axios from "axios";
import SubWithSched from "@/interfaces/SubWithSched";
import Schedule from "@/components/pages/Schedule";

export default function TeacherSchedule() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subjects, setSubjects] = useState<SubWithSched[]>([]);

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

  useEffect(() => {
    axios
      .post("/api/teacher/getSchedule", { school_id: session?.user?.school_id })
      .then((res) => {
        if (res.data) {
          setSubjects(res.data as SubWithSched[])
        }
      });
  },[session]);

  return (
    <Layout>
      <Schedule subjects={subjects}/>
    </Layout>
  );
}
