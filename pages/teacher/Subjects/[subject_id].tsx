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
  Heading,
  useDisclosure,
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  IconButton, 
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
import StudentInformationModal from "@/components/pages/StudentInformationModal";
import ClassSubjectInterface from "@/interfaces/ClassSubjectInterface";
import GradesInterface from "@/interfaces/GradesInterface";
import { LuMoreHorizontal } from 'react-icons/lu';
import { MdEditSquare, MdPersonOutline, MdCheck } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { v4 as uuidv4 } from 'uuid';

interface Student {
  student: StudentInterface
}

export default function ClassAdvisory() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sa, setSA] = useState<ClassSubjectInterface>({} as ClassSubjectInterface);
  const [students, setStudents] = useState<Student[]>([]);
  const [student, setStudent] = useState<StudentInterface>({} as StudentInterface);
  const [studentGrade, setstudentGrade] = useState<GradesInterface>({} as GradesInterface);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [formIndex, setFormIndex] = useState(-1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const take = 2;
  const subjectID = router.query.subject_id;

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
    .post("/api/teacher/getSubjectByID", { subject_id: subjectID, page: page, take: take, search: search })
    .then((res) => {
      console.log(res.data)
      setSA(res.data.subject);
      setStudents(res.data.students);
      setTotalItems(res.data.count);
      setFormIndex(-1);
    });
  }

  function updateGrade(){
    axios
    .post("/api/teacher/editGrades", { grade: studentGrade })
    .then((res) => {
      getStudents();
    });
  }

  function getGradeAverage(grade: GradesInterface): number {
    return (((grade.first_grading || 0) +
            (grade.second_grading || 0) +
            (grade.third_grading || 0) +
            (grade.fourth_grading || 0)) / 4);
  }

  const openStudentModal = (data: StudentInterface) => {
    setStudent(data);
    onOpen();
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
          <Link href="/teacher/Subjects">
            <ArrowBackIcon />
          </Link>
          <Spacer />
          <Heading py="4vh">
            {sa.subjects?.name + " - " + sa.class_sections?.sections?.name + " " + sa.class_sections?.sections?.academic_level + " (" + sa.class_sections?.school_year?.start 
            + "-" + (sa?.class_sections?.school_year?.start? (sa?.class_sections?.school_year?.start+1) : null) + ")"}
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
                  <Th color={"whiteAlpha.800"}>1st</Th>
                  <Th color={"whiteAlpha.800"}>2nd</Th>
                  <Th color={"whiteAlpha.800"}>3rd</Th>
                  <Th color={"whiteAlpha.800"}>4th</Th>
                  <Th color={"whiteAlpha.800"}>Final</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  students?.map((data, index) => (
                    <Tr 
                        key={data.student.id} 
                        bg={formIndex === index? "gray.200" : "none"}
                        _hover={{
                          bg: "gray.100"
                        }}>
                      <Td>{data.student.school_id}</Td>
                      <Td>{data.student.first_name + " " + data.student.middle_name + " " + data.student.last_name}
                        {data.student.suffix? (", " + data.student.suffix) : null}</Td>
                      <Td>{formIndex === index? <Input size={"sm"} textAlign={"center"} p={"0"} borderColor={"gray.300"} bg={"white"} type="number" min={0} max={100} placeholder="0" value={studentGrade.first_grading} onChange={(e)=>parseInt(e.target.value)>100? null : setstudentGrade((prev)=>({...prev, first_grading: parseInt(e.target.value)}))}/> : (data.student?.grades[0]?.first_grading || 0)}</Td>
                      <Td>{formIndex === index? <Input size={"sm"} textAlign={"center"} p={"0"} borderColor={"gray.300"} bg={"white"} type="number" min={0} max={100} placeholder="0" value={studentGrade.second_grading} onChange={(e)=>parseInt(e.target.value)>100? null : setstudentGrade((prev)=>({...prev, second_grading: parseInt(e.target.value)}))}/> : (data.student?.grades[0]?.second_grading || 0)}</Td>
                      <Td>{formIndex === index? <Input size={"sm"} textAlign={"center"} p={"0"} borderColor={"gray.300"} bg={"white"} type="number" min={0} max={100} placeholder="0" value={studentGrade.third_grading} onChange={(e)=>parseInt(e.target.value)>100? null : setstudentGrade((prev)=>({...prev, third_grading: parseInt(e.target.value)}))}/> : (data.student?.grades[0]?.third_grading || 0)}</Td>
                      <Td>{formIndex === index? <Input size={"sm"} textAlign={"center"} p={"0"} borderColor={"gray.300"} bg={"white"} type="number" min={0} max={100} placeholder="0" value={studentGrade.fourth_grading} onChange={(e)=>parseInt(e.target.value)>100? null : setstudentGrade((prev)=>({...prev, fourth_grading: parseInt(e.target.value)}))}/> : (data.student?.grades[0]?.fourth_grading || 0)}</Td>
                      <Td><Text size={"sm"}>{formIndex === index? getGradeAverage(studentGrade) : getGradeAverage(data.student?.grades[0] || {} as GradesInterface)}</Text></Td>
                      <Td p={"0"} pr={"5px"}>
                        <Flex justifyContent={"center"}>
                        {
                          formIndex === index?
                          (
                            <Flex gap={"3px"}>
                              <IconButton size={"sm"} aria-label='Save' icon={<MdCheck/>} onClick={updateGrade}/>
                              <IconButton size={"sm"} variant={"ghost"} aria-label='Cancel' icon={<RxCross2/>} onClick={()=>setFormIndex(-1)}/>
                            </Flex>
                          ) : 
                          (
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<LuMoreHorizontal />}
                                variant='outline'
                                size={"sm"}
                              />
                              <MenuList>
                                <MenuItem
                                  icon={<MdEditSquare/>} 
                                  onClick={()=>{ 
                                    setstudentGrade(data.student?.grades[0] || 
                                      ({
                                        id: data?.student?.grades[0]?.id || uuidv4(),
                                        academic_level: sa?.subjects?.academic_level,
                                        class_subject_fk: sa?.id,
                                        student_fk: data?.student.id,
                                        school_year_fk: sa?.class_sections?.school_year?.id,
                                        first_grading: 0,
                                        second_grading: 0,
                                        third_grading: 0,
                                        fourth_grading: 0,
                                        remarks: "",
                                      } as GradesInterface)); 
                                    setFormIndex(index);
                                  }}
                                  >
                                  Edit Grade
                                </MenuItem>
                                <MenuItem icon={<MdPersonOutline/>} onClick={()=>{ setStudent(data.student); onOpen();}}>
                                  View Student
                                </MenuItem> 
                              </MenuList>
                            </Menu>
                          )
                        }
                        </Flex>
                      </Td>
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
      <StudentInformationModal isOpen={isOpen} onClose={onClose} student={student}/>
    </Layout>
  );
}
