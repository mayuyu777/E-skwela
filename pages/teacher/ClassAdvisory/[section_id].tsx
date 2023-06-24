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
  Heading
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
import { gender } from "@/constants/gender";

interface SectionAssignmentWithSections extends SectionAssignmentInterface {
  sections: any;
  school_year: SchoolYearInterface;
}

interface Student {
  student: StudentInterface
}

export default function ClassAdvisory() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sa, setSA] = useState<SectionAssignmentWithSections>({} as SectionAssignmentWithSections);
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const take = 2;
  const sectionID = router.query.section_id;

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
      getStudents();
    }
  }, [session, page]);

  function getStudents(){
    axios
    .post("/api/teacher/getClassAdvisoryByID", { section_id: sectionID, page: page, take: take, search: search })
    .then((res) => {
      console.log(res.data)
      const data = res.data.section as SectionAssignmentWithSections;
      setSA(data);
      setStudents(res.data.students);
      setTotalItems(res.data.count)
    });
  }

  return (
    <Layout>
      <Flex
        alignItems="center"
        mt="4vh"
        w="80vw"
        h="120vh"
        bg="white"
        boxShadow="lg"
        flexDirection="column"
        gap="1rem"
        p="1rem"
        position={"relative"}
        mb="4vh"
      >
        <Flex w="100%">
          <Link href="/teacher/ClassAdvisory">
            <ArrowBackIcon />
          </Link>
          <Spacer />
          <Heading py="4vh">
            {"Grade " + sa.sections?.academic_level + " - " + sa.sections?.name + " (" + sa.school_year?.start 
            + "-" + (sa?.school_year?.start? (sa?.school_year?.start+1) : null) + ")"}
          </Heading>
          <Spacer />
        </Flex>
        <Flex w="80%" flexDirection="column" gap="1rem">
          <Flex gap="0.5rem" alignItems="center" w="40%">
            <Input 
              size={"sm"} 
              placeholder="Type here..."
              value={search}
              onChange={(e) => {
                setSearch((prev)=>e.target.value);
              }}
              />
            <Button size={"sm"} w={"7pc"} colorScheme="teal" onClick={()=>{setPage(1); getStudents()}}>Search</Button>
          </Flex>
          <TableContainer w="full" rounded='md' p="0" h={"70vh"} borderColor={"gray.300"} borderWidth={'1px'}>
            <Table variant="simple" size={"md"}>
              <Thead bg='teal.500'>
                <Tr>
                  <Th color={"whiteAlpha.800"}>School Id</Th>
                  <Th color={"whiteAlpha.800"}>FULLNAME</Th>
                  <Th color={"whiteAlpha.800"}>GENDER</Th>
                  <Th color={"whiteAlpha.800"}>Age</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  students?.map((data) => (
                    <Tr 
                      key={data.student.id}
                      _hover={{
                        bg:"teal.100"
                      }}>
                      <Td>{data.student.school_id}</Td>
                      <Td>
                      {data.student.first_name + " " + data.student.middle_name + " " + data.student.last_name}
                      {data.student.suffix? (", " + data.student.suffix) : null}
                      </Td>
                      <Td>{gender[data.student.gender]}</Td>
                      <Td>{data.student.age}</Td>
                    </Tr>
                  ))
                }
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
        <Flex gap={"10px"} alignItems={"center"} position={"absolute"} bottom={"5pc"}>
          <Button size={"sm"} onClick={()=>setPage((prev)=> --prev)} isDisabled={page > 1? false : true}>Prev</Button>
          <Text fontSize={"15px"} color={"gray.600"}>{ (((page-1)*take)+students?.length) + " of " + totalItems }</Text>
          <Button size={"sm"} onClick={()=>setPage((prev)=> ++prev)} isDisabled={(((page-1)*take)+students?.length) === totalItems? true : false}>Next</Button>
        </Flex>
      </Flex>
    </Layout>
  );
}
