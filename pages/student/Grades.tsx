import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { hasAccess } from "@/lib/routes";
import Layout from "@/components/pages/Layout";
import SessionInterface from "@/interfaces/SessionInterface";
import {
  Flex,
  Input,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Heading,
  TableContainer,
  Button,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import moment from "moment";
import axios from "axios";
import SectionAssignmentInterface from "@/interfaces/ClassSectionsInterface";
import SectionInterface from "@/interfaces/SectionInterface";
import SchoolYearInterface from "@/interfaces/SchoolYearInterface";
import StudentInterface from "@/interfaces/StudentInterface";
import SectioningInterface from "@/interfaces/SectioningInterface";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
import GradesInterface from "@/interfaces/GradesInterface";
import SubjectAssignmentInterface from "@/interfaces/ClassSubjectInterface";
import SubjectInterface from "@/interfaces/SubjectInterface";

interface SubjectAssignmentWithSubject extends SubjectAssignmentInterface {
  subjects: SubjectInterface;
}

interface GradesWithStudent extends GradesInterface {
  students: StudentInterface;
  average: number;
  subject_assignment: SubjectAssignmentWithSubject;
}

export default function StudentGrades() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [grades, setGrades] = useState<GradesWithStudent[][]>([]);
  const sectionName = router.query.section_name;

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
      .post("/api/student/getGrades", { school_id: session?.user?.school_id })
      .then((res) => {
        if (res.data) {
          const response = res.data as GradesWithStudent[][];
          const resWithAve = response.map((data) => {
            return data.map((data) => {
              let count = 0;
              if (data["first_grading"]) {
                count++;
              }
              if (data["second_grading"]) {
                count++;
              }
              if (data["third_grading"]) {
                count++;
              }
              if (data["fourth_grading"]) {
                count++;
              }

              const attributeCount = count;
              const sum =
                data.first_grading + data.second_grading + data.third_grading + data.fourth_grading;

              const average = sum / attributeCount;
              return { ...data, average: average };
            })
          })
          setGrades(resWithAve.sort((a, b) => b[0].academic_level - a[0].academic_level));
        }
      });
  }, []);

  return (
    <Layout>
      <Flex
        alignItems="center"
        mt="4vh"
        w={"80vw"}
        minH={"80vh"}
        h={"auto"}
        bg="white"
        boxShadow="lg"
        flexDirection="column"
        gap="1rem"
        p="1rem"
      >
        {
          grades.length > 0 ? 
          (<Flex flexDirection="column" gap="2rem" pt={"4pc"} pb={"5pc"}>
            {grades.map((data) => (
              <TableContainer p={"10px"} bg="gray.100" key={data[0].id}>
                <Flex alignContent="center">
                  <Spacer />
                  <Text fontWeight={"bold"}>{"Grade " + data[0].class_subjects?.class_sections?.sections?.academic_level + " - " + data[0].class_subjects?.class_sections?.sections?.name}</Text>
                  <Spacer />
                </Flex>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Subject</Th>
                      <Th>1st Quarter</Th>
                      <Th>2nd Quarter</Th>
                      <Th>3rd Quarter</Th>
                      <Th>4th Quarter</Th>
                      <Th>Average</Th>
                      <Th>REMARKS</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((data) => (
                      <Tr key={data.id}>
                        <Td>{data.class_subjects?.subjects?.name}</Td>
                        <Td>{data.first_grading}</Td>
                        <Td>{data.second_grading}</Td>
                        <Td>{data.third_grading}</Td>
                        <Td>{data.fourth_grading}</Td>
                        <Td>{data.average}</Td>
                        <Td>{data.remarks}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table> 
              </TableContainer>
            ))}
          </Flex>)
          : 
          (
            <Flex w={"80%"} bg={"gray.200"} padding={"3pc"} mt={"3pc"} alignItems={"center"} justifyContent={"center"}>
              <Text color={"gray.500"} fontWeight={"medium"} fontSize={"25px"}>No Grades</Text>
            </Flex>
          )
        }
      </Flex>
    </Layout>
  );
}