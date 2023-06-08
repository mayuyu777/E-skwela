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
} from "@chakra-ui/react";
import moment from "moment";
import axios from "axios";
import SectionAssignmentInterface from "@/interfaces/ClassSectionsInterface";
import SectionInterface from "@/interfaces/SectionInterface";
import SchoolYearInterface from "@/interfaces/SchoolYearInterface";
import Link from "next/link";
import SubjectAssignmentInterface from "@/interfaces/ClassSubjectInterface";
import SubjectInterface from "@/interfaces/SubjectInterface";

interface SectionAssignmentWithSections extends SectionAssignmentInterface {
  sections: SectionInterface;
}

interface SubjectAssignmentWithSubject extends SubjectAssignmentInterface {
  subjects: SubjectInterface;
  section_assignment: SectionAssignmentWithSections;
}

export default function TeacherSubjects() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sa, setSA] = useState<SubjectAssignmentWithSubject[]>([]);

  useEffect(() => {
    let sessionUser = session?.user as SessionInterface;
    if (status === "unauthenticated") {
      router.push("/SignIn");
    }
    const res = hasAccess(router.pathname, sessionUser?.role);
    console.log(sessionUser);
    if (!res.authorized) {
      router.push(res.path);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      axios
        .get("/api/teacher/getSubjects", {
          params: { year_id: 1, teacher_id: session.user?.school_id },
        })
        .then((res) => {
          console.log(res.data);
          setSA(res.data);
        });
    }
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
        <Text mr="auto" ml="auto">
          SUBJECTS LIST
        </Text>
        <Flex w="80%" flexDirection="column" gap="2rem">
          <Flex gap="1rem" alignItems="center" w="40%">
            <Text>2022-2023</Text>
          </Flex>
          <TableContainer w="full">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>SUBJECT NAME</Th>
                  <Th>SECTION NAME</Th>
                  <Th>GRADE</Th>
                  <Th>ACTION</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sa.map((data) => (
                  <Tr key={data.subject_assignment_id}>
                    <Td>{data.subjects.name.toUpperCase()}</Td>
                    <Td>{data.section_assignment.sections.section_name.toUpperCase()}</Td>
                    <Td>{`Grade ${data.section_assignment.sections.year_level}`.toUpperCase()}</Td>
                    <Td>
                      <Link
                        href={`/teacher/Subjects/${data.section_assignment.sections.section_name}?subject=${data.subjects.name}`}
                        style={{ cursor: "pointer" }}
                      >
                        <Button>Check Class</Button>
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Layout>
  );
}
