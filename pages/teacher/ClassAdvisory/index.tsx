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
  Heading
} from "@chakra-ui/react";
import moment from "moment";
import axios from "axios";
import SectionAssignmentInterface from "@/interfaces/ClassSectionsInterface";
import SectionInterface from "@/interfaces/SectionInterface";
import SchoolYearInterface from "@/interfaces/SchoolYearInterface";
import Link from "next/link";

interface SectionAssignmentWithSections extends SectionAssignmentInterface {
  sections: SectionInterface;
  school_year: SchoolYearInterface;
  _count: {student_enrollment: number};
}

export default function ClassAdvisory() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sa, setSA] = useState<SectionAssignmentWithSections[]>([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const take = 2;

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
      getClassAdvisory();
    }
  }, [session, page]);

  function getClassAdvisory(){
    axios
    .post("/api/teacher/getClassAdvisory", { school_id: session?.user?.school_id, page: page, take: take, search: search })
    .then((res) => {
      console.log(res.data)
      setTotalItems(res.data.count);
      setSA(res.data.sections);
    });
  }

  function searchClassAdvisory(){
    console.log(search)
    getClassAdvisory();
  }

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
        position={"relative"}
      >
        <Heading py="4vh">Class Advisory</Heading>
        <Flex w="80%" flexDirection="column" gap="1rem">
          <Flex gap="0.5rem" alignItems="center" w="40%">
            <Input 
              size={"sm"} 
              placeholder="Type here..."
              onChange={(e) => {
                setSearch((prev)=>e.target.value);
              }}/>
            <Button size={"sm"} w={"7pc"} colorScheme="teal" onClick={searchClassAdvisory}>Search</Button>
          </Flex>
          <TableContainer w="full" rounded='md' p="0">
            <Table variant="simple" size={"sm"}>
              <Thead bg='teal.500'>
                <Tr>
                  <Th color={"whiteAlpha.800"}>SCHOOL YEAR</Th>
                  <Th color={"whiteAlpha.800"}>SECTION NAME</Th>
                  <Th color={"whiteAlpha.800"}>GRADE LEVEL</Th>
                  <Th color={"whiteAlpha.800"}>Population</Th>
                  <Th color={"whiteAlpha.800"}>ACTION</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sa.map((data) => (
                  <Tr key={data.id}>
                    <Td>{data.school_year.start + " - " + (data.school_year.start + 1)}</Td>
                    <Td>{data.sections.name}</Td>
                    <Td>{data.sections.academic_level}</Td>
                    <Td>{data._count?.student_enrollment}</Td>
                    <Td color='teal.500' textDecor={"underline"}>
                      <Link
                        href={`/teacher/ClassAdvisory/${data.id}`}
                        style={{ cursor: "pointer" }}
                      >
                        Check Class
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
        <Flex gap={"10px"} alignItems={"center"} position={"absolute"} bottom={"5pc"}>
          <Button size={"sm"} onClick={()=>setPage((prev)=> --prev)} isDisabled={page > 1? false : true}>Prev</Button>
          <Text fontSize={"12px"} color={"gray.600"}>{ (((page-1)*take)+sa.length) + " of " + totalItems }</Text>
          <Button size={"sm"} onClick={()=>setPage((prev)=> ++prev)} isDisabled={(((page-1)*take)+sa.length) === totalItems? true : false}>Next</Button>
        </Flex>
      </Flex>
    </Layout>
  );
}
