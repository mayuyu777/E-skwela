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

interface LN {
  gender: string;
  suffix: string;
  middle_name: string;
}

interface StudentWithGender extends StudentInterface {
  learner_info: LN;
}

interface SectionWithStudents extends SectioningInterface {
  students: StudentWithGender;
}

interface SectionAssignmentWithSections extends SectionAssignmentInterface {
  sectioning: SectionWithStudents[];
}

export default function ClassAdvisory() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sa, setSA] = useState<SectionAssignmentWithSections[]>([]);
  const sectionName = router.query.section_name;

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
    axios
      .get("/api/teacher/getClassAdvisoryByName", { params: { section_name: sectionName } })
      .then((res) => {
        console.log(res.data);
        setSA(res.data);
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
        <Flex w="100%">
          <Link href="/teacher/ClassAdvisory">
            <ArrowBackIcon />
          </Link>
          <Spacer />

          <Text mr="auto" ml="auto">
            CLASS ADVISORY LIST
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
                  <Th>GENDER</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sa.map((data) => {
                  return data.sectioning.map((sec) => (
                    <Tr key={sec.sectioning_id}>
                      <Td>{`${sec.students.first_name.toUpperCase()} ${sec.students.learner_info.middle_name.toUpperCase()} ${sec.students.last_name.toUpperCase()}, ${sec.students.learner_info.suffix.toUpperCase()}`}</Td>
                      <Td>{sec.students.learner_info.gender.toUpperCase()}</Td>
                    </Tr>
                  ));
                })}
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
