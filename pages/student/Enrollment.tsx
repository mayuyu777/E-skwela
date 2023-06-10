import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { hasAccess } from "@/lib/routes";
import Layout from "@/components/pages/Layout";
import SessionInterface from "@/interfaces/SessionInterface";
import axios from "axios";
import StudentEnrollmentInterface from "@/interfaces/StudentEnrollmentInterface";
import SchoolYearInterface from "@/interfaces/SchoolYearInterface";
import { school_year_enrollment_open } from "@/constants/school_year_enrollment_open";
import { student_enrollment_stat } from "@/constants/student_enrollment_stat";
import { academicLevelLimit } from "@/constants/academic_level_limit";
import { enrollment_status } from "@/constants/enrollment_status";
import {
  Flex,
  Text,
  Stack,
  Button 
} from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [studentCurEnrollment, setStudentCurEnrollment] = useState<StudentEnrollmentInterface>();
  const [latestSchoolYear, setlatestSchoolYear] = useState<SchoolYearInterface>();

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
      .post("/api/student/getEnrollment", { school_id: session?.user?.school_id })
      .then((res) => {
        if(res.data){
          setlatestSchoolYear(res.data.latestSchoolYear as SchoolYearInterface);
          setStudentCurEnrollment(res.data.studentEnrollment as StudentEnrollmentInterface);
        }
      });
  },[session]);

  function submitEnrollment(studentCurEnrollment: StudentEnrollmentInterface, nextGrade: number){
    axios
      .post('/api/student/updateEnrollment', {
        id: studentCurEnrollment.id,
      })
      .then((res) => {
        if(res?.data){
          axios
          .post('/api/student/postEnrollment', {
            id: uuidv4(),
            academic_level: nextGrade,
            class_section_fk: null,
            student_fk: studentCurEnrollment.student_fk,
            enrolled_by_fk: null,
            school_year_fk: latestSchoolYear?.id,
            enrollment_status: student_enrollment_stat.pending,
            status: enrollment_status.active
          })
          .then((res) => {
            if(res?.data){
              router.reload();
            }
          })
          .catch((error) => {
            console.log(error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  function enrollmentContent(studentCurEnrollment: StudentEnrollmentInterface){
    const nextGrade = studentCurEnrollment.academic_level + 1;
    switch(studentCurEnrollment.enrollment_status) {
      case student_enrollment_stat.pending:
        return <Text color={"gray.500"} fontSize={"18px"} fontWeight={"medium"}>
                  Your enrollment application is still being processed.
                </Text>
        break;
      case student_enrollment_stat.enrollee:
        return <Text color={"gray.500"} fontSize={"18px"} fontWeight={"medium"}>
                  You are currently enrolled.
                </Text>
        break;
      case student_enrollment_stat.eligible:
        if(nextGrade <= academicLevelLimit){
          return (
            <Flex w={"full"} h={"auto"} justifyContent="center" alignItems={"center"} flexDirection="column">
              <Text color={"gray.500"} fontSize={"18px"} fontWeight={"medium"}>
                Enrollment is open. You are eligible to enroll to the next academic level.
              </Text>
              <Button colorScheme="green" variant='solid' mt={"2pc"} onClick={() => submitEnrollment(studentCurEnrollment, nextGrade)}>
                { "+ Enroll to Grade " + nextGrade}
              </Button>
            </Flex>
          );
        }else{
          return <Text color={"gray.500"} fontSize={"18px"} fontWeight={"medium"}>
                    Congratulations! You have completed Highschool.
                  </Text>
        }
        break;
      case student_enrollment_stat.not_eligible:
        return <Text color={"gray.500"} fontSize={"18px"} fontWeight={"medium"}>
                  You are not eligible to enroll. Please see your class advisor or contact admin for help.
                </Text>
        break;
      default:
        return <Text color={"gray.500"} fontSize={"18px"} fontWeight={"medium"}>Not Found</Text>
        break;
    }
  }

  return (
    <Layout>
      <Flex
        alignItems="center"
        mt="4vh"
        w={"80vw"}
        h={"80vh"}
        bg="white"
        boxShadow="lg"
        flexDirection="column"
        gap="1rem"
        p="1rem"
      >
        <Flex bg={"gray.200"} w={"80%"} h={"auto"} mt={"3pc"} p="3pc" justifyContent="center" flexDirection="row">
        {
          latestSchoolYear?.enrollment_open === school_year_enrollment_open.open ? 
          ( studentCurEnrollment !== null? 
              enrollmentContent(studentCurEnrollment as StudentEnrollmentInterface) 
              : 
              <Text color={"gray.500"} fontSize={"18px"} fontWeight={"medium"}>
                No active enrollment application
              </Text>
          )
          : 
          (
            <Text color={"gray.500"} fontSize={"18px"} fontWeight={"medium"}>
              Enrollment has either ended or not started. Please check again later.
            </Text>
          )
        }
        </Flex>
      </Flex>
    </Layout>
  );
}
