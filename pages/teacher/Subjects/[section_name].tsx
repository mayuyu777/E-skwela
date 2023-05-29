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
import EditGradesModal from "@/screens/Teacher/Subjects/components/EditGradesModal";

interface SubjectAssignmentWithSubject extends SubjectAssignmentInterface {
  subjects: SubjectInterface;
}

interface GradesWithStudent extends GradesInterface {
  students: StudentInterface;
  average: number;
  subject_assignment: SubjectAssignmentWithSubject;
}

export default function ClassAdvisory() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [grades, setGrades] = useState<GradesWithStudent[]>([]);
  const sectionName = router.query.section_name;
  const subjectName = router.query.subject;
  const [refreshList, setRefreshList] = useState(false);
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
      .get("/api/teacher/getSubjectGrades", {
        params: { section_name: sectionName, subject: subjectName },
      })
      .then((res) => {
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
  }, [session, refreshList]);

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
        <Flex w="100%">
          <Link href="/teacher/Subjects">
            <ArrowBackIcon />
          </Link>
          <Spacer />

          <Text mr="auto" ml="auto">
            SUBJECT{" "}
            {grades.length > 0 ? grades[0].subject_assignment.subjects.name.toUpperCase() : ""} :
            CLASS {sectionName?.toString().toUpperCase()}
          </Text>
          <Spacer />
        </Flex>

        <Flex w="80%" flexDirection="column" gap="2rem">
          <Flex gap="1rem" alignItems="center" w="40%">
            <Text>Search</Text> <Input />
          </Flex>
          <TableContainer w="full">
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
                  <Th>ACTION</Th>
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
                    <Td>{parseFloat(data.average.toString()).toFixed(2)}</Td>
                    <Td>{data.remarks}</Td>
                    <Td>
                      <EditGradesModal
                        refreshList={refreshList}
                        setRefreshList={setRefreshList}
                        grades={data}
                      />
                    </Td>
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
