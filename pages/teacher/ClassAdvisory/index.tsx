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
import SectionAssignmentInterface from "@/interfaces/SectionAssignmentInterface";
import SectionInterface from "@/interfaces/SectionInterface";
import SchoolYearInterface from "@/interfaces/SchoolYearInterface";
import Link from "next/link";

interface SectionAssignmentWithSections extends SectionAssignmentInterface {
  sections: SectionInterface;
  school_year: SchoolYearInterface;
}

export default function ClassAdvisory() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sa, setSA] = useState<SectionAssignmentWithSections[]>([]);

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
      .get("/api/teacher/getClassAdvisory", { params: { teacher_id: session?.user?.school_id } })
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
        <Text mr="auto" ml="auto">
          CLASS ADVISORY LIST
        </Text>
        <Flex w="80%" flexDirection="column" gap="2rem">
          <Flex gap="1rem" alignItems="center" w="40%">
            <Text>Search</Text> <Input />
          </Flex>
          <TableContainer w="full">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>SCHOOL YEAR</Th>
                  <Th>SECTION NAME</Th>
                  <Th>GRADE LEVEL</Th>
                  <Th>POPULATION</Th>
                  <Th>ACTION</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sa.map((data) => (
                  <Tr key={data.section_assigned_id}>
                    <Td>{`${moment(data.school_year.start_date.toString()).format("YYYY")}-${moment(
                      data.school_year.end_date.toString()
                    ).format("YYYY")}`}</Td>
                    <Td>{data.sections.section_name}</Td>
                    <Td>{`Grade ${data.sections.year_level}`}</Td>
                    <Td>{data.population}</Td>
                    <Td>
                      <Link
                        href={`/teacher/ClassAdvisory/${data.sections.section_name}`}
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
