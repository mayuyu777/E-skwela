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
  TableContainer,
  Button,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import moment from "moment";
import axios from "axios";
import SectionAssignmentInterface from "@/interfaces/SectionAssignmentInterface";
import SectionInterface from "@/interfaces/SectionInterface";
import SchoolYearInterface from "@/interfaces/SchoolYearInterface";
import StudentInterface from "@/interfaces/StudentInterface";
import SectioningInterface from "@/interfaces/SectioningInterface";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
import GradesInterface from "@/interfaces/GradesInterface";
import SubjectAssignmentInterface from "@/interfaces/SubjectAssignmentInterface";
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
  const [grades, setGrades] = useState<GradesWithStudent[]>([]);
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
      .get("/api/teacher/getSubjectGrades", { params: { section_name: sectionName } })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          const response = res.data as GradesWithStudent[];

          const resWithAve = response.map((data) => {
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
          });
          setGrades(resWithAve);
        }
      });
  }, [session]);

  return (
    <Layout>
      <Flex
        alignItems="center"
        mt="4vh"
        w="80vw"
        h="80vh"
        bg="white"
        boxShadow="lg"
        flexDirection="column"
        gap="1rem"
        p="1rem"
      >
        <Flex w="100%"></Flex>

        <Flex w="80%" flexDirection="column" gap="2rem">
          <TableContainer w="full" bg="gray.100">
            <Flex alignContent="center">
              <Spacer />
              <Text>HELLO TEST</Text>
              <Spacer />
            </Flex>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>FULLNAME</Th>
                  <Th>FIRST GRADING</Th>
                  <Th>SECOND GRADING</Th>
                  <Th>THIRD GRADING</Th>
                  <Th>FOURTH GRADING</Th>
                  <Th>AVERAGE</Th>
                  <Th>REMARKS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {grades.map((data) => (
                  <Tr key={data.grade_id}>
                    <Td>{`${data.students.first_name.toUpperCase()} ${data.students.last_name.toUpperCase()}`}</Td>
                    <Td>{data.first_grading}</Td>
                    <Td>{data.second_grading}</Td>
                    <Td>{data.third_grading}</Td>
                    <Td>{data.fourth_grading}</Td>
                    <Td>{data.average}</Td>
                    <Td>{data.final_grading}</Td>
                  </Tr>
                ))}
                {/* {sa.map((data) => (
                  
                  <Tr key={data.section_assigned_id}>
                    <Td>{`Grade ${data.}`}</Td>
                    <Td>{data.population}</Td>
                  </Tr>
                ))} */}
                {/* {teachers.map((data) => (
                  <Tr key={data.teacher_id}>
                    <Td>{data.position}</Td>
                    <Td>{data.first_name}</Td>
                    <Td>{data.middle_name}</Td>
                    <Td>{data.last_name}</Td>
                    <Td>{data.suffix}</Td>
                    <Td>{data.gender}</Td>
                    <Td>{moment(data.birthdate).format("MM-DD-YYYY")}</Td>
                    <Td>{data.age}</Td>
                    <Td>{data.contact_no}</Td>
                    <Td>{data.marital_status}</Td>
                  </Tr>
                ))} */}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Layout>
  );
}
