import AdminLayout from "@/components/pages/AdminLayout";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { hasAccess } from "@/lib/routes";
import SessionInterface from "@/interfaces/SessionInterface";
import { 
    Flex,
    TableContainer, 
    Table,
    Select, 
    Thead, 
    Tbody, 
    Tr, 
    Th, 
    Td, 
    Button, 
    Text, 
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    useToast,
    Menu, 
    MenuButton, 
    MenuList, 
    MenuItem,
    IconButton,
} from "@chakra-ui/react";
import { LuMoreHorizontal } from 'react-icons/lu';
import { prisma } from "../../prisma/client";
import axios from "axios";
import SchoolYearInterface from "@/interfaces/SchoolYearInterface";
import moment from "moment";
import { sy_enrollment_stat } from "@/constants/sy_enrollment_stat";
import { school_year_status, school_year_status_word } from "@/constants/school_year_status";
import { Button as AntButton, Form, Input as AntInput } from 'antd';

export default function SchoolYear(){
    const { data: session, status } = useSession();
    const [schoolYears, setSchoolYears] = useState<SchoolYearInterface[]>([]);
    const [curSY, setCurSY] = useState<SchoolYearInterface>({} as SchoolYearInterface);
    const [upSY, setUpSY] = useState<SchoolYearInterface>({} as SchoolYearInterface);
    const [selectedSY, setSelectedSY] = useState<SchoolYearInterface>({} as SchoolYearInterface);
    const [confirmText, setConfirmText] = useState("");
    const [inputConfirmText, setInputConfirmText] = useState("");
    const [action, setAction] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenSY, onOpen: onOpenSY, onClose: onCloseSY } = useDisclosure();
    const router = useRouter();
    const toast = useToast();

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
        getSchoolYears();
    }, []);

    function getSchoolYears(){
        axios.post("/api/schoolyear/getSchoolYears").then((res) => {
            setSchoolYears(res.data.school_years);
            setCurSY(res.data.cur_school_year);
            setUpSY(res.data?.school_years[0]);
        });
    }

    function startSY() {
        setConfirmText("startSY"+(upSY?.start || "now")+(Math.floor(Math.random() * 7777777) + 1111111));
        setAction(0);
        onOpen();
    }

    function endSY() {
        setConfirmText("endSY"+(curSY?.start || "now")+(Math.floor(Math.random() * 7777777) + 1111111));
        setAction(1);
        onOpen();
    }

    function openSYModal(sy: SchoolYearInterface) {
        setSelectedSY(sy);
        setConfirmText("editSY"+(curSY?.start || "now")+(Math.floor(Math.random() * 7777777) + 1111111));
        onOpenSY();
    }

    function deleteSY() {
        setConfirmText("deleteSY"+(curSY?.start || "now")+(Math.floor(Math.random() * 7777777) + 1111111));
        setAction(3);
        onOpenSY();
    }

    function executeAction(){
        if(confirmText === inputConfirmText){
            axios.post("/api/schoolyear/updateSchoolYear", { action:action, curSY:curSY, upSY:upSY }).then((res) => {
               if(res.status === 200){
                toast({
                    title: 'Success.',
                    description: "School Year updated successfully.",
                    status: 'success',
                    duration: 9000,
                    position: "top",
                });
                getSchoolYears();
               }
            });
            onClose();
        }else{
            toast({
                title: 'Action Confirmation.',
                description: "Text entered did not match the provided phrase.",
                status: 'error',
                duration: 9000,
                position: "top",
            });
            onClose();
        }
    }

    return (
       <AdminLayout>
            <Flex 
            mt="0.5vh"
            w={['90vw','90vw','80vw','80vw']}
            minH={"50vh"}
            bg="white"
            pb='5pc'
            mb="2pc"
            boxShadow="lg"
            flexDirection="column"
            position={"relative"}>
                <Text mt={"3pc"} textAlign={"center"} fontSize={"18px"} fontWeight={"semibold"} color={"gray.500"}>
                    Active S.Y: {curSY? (curSY.start + "-" + ((curSY.start || 0)+1)) : "Not Set"}
                </Text>
                <Flex mt={"2pc"} gap={"1rem"} w={"full"} justifyContent={"center"}>
                    <Button colorScheme={"green"} isDisabled={curSY? true : false} onClick={startSY}>Start School Year</Button>
                    <Button colorScheme={"red"} isDisabled={curSY? false : true} onClick={endSY}>End School Year</Button>
                </Flex>
                <TableContainer w="full" mt={"3pc"} overflowY={"scroll"} h={"39vh"}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th pos={"sticky"} top={"0"} bg={"white"} zIndex={"1000"}>School Year</Th>
                                <Th pos={"sticky"} top={"0"} bg={"white"}>Enrollment</Th>
                                <Th pos={"sticky"} top={"0"} bg={"white"}>Status</Th>
                                <Th pos={"sticky"} top={"0"} bg={"white"}>Created</Th>
                                <Th pos={"sticky"} top={"0"} bg={"white"}>Started</Th>
                                <Th pos={"sticky"} top={"0"} bg={"white"}>Ended</Th>
                                <Th pos={"sticky"} top={"0"} bg={"white"} w={"3pc"}></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                           {schoolYears?.map((val, index)=>(
                            <Tr key={val.id}>
                                <Td pos={"relative"}>
                                    {val.start + " - " + ((val?.start || 0)+1)}
                                    {
                                        val.status? 
                                        (
                                            <>
                                            <Flex p={"3px"} pos={"absolute"} background={"linear-gradient(90deg, rgba(108,165,186,1) 0%, rgba(99,169,192,1) 32%, rgba(63,185,215,0) 100%)"} opacity={"0.6"} h={"full"} left={"0"} top={"0"} w={"full"}></Flex>
                                            <Flex p={"3px"} pos={"absolute"} left={"0"} top={"0"} w={"full"} zIndex={"100"} fontWeight={"medium"}>Current</Flex>
                                            </>
                                        ) : null
                                    }
                                    {
                                        index === 0? 
                                        (
                                            <>
                                            <Flex p={"3px"} pos={"absolute"} background={"linear-gradient(90deg, rgba(237,240,58,1) 0%, rgba(237,240,58,1) 36%, rgba(255,255,255,0) 100%)"} opacity={"0.6"} h={"full"} left={"0"} top={"0"} w={"full"}></Flex>
                                            <Flex p={"3px"} pos={"absolute"} left={"0"} top={"0"} w={"full"} zIndex={"100"} fontWeight={"medium"}>Upcoming</Flex>
                                            </>
                                        ) : null
                                    }
                                    
                                </Td>
                                <Td>{sy_enrollment_stat[val.enrollment_open]}</Td>
                                <Td>{school_year_status_word[val.status]}</Td>
                                <Td>{new Date(val.created_at).toLocaleDateString()}</Td>
                                <Td>{val.date_started? new Date(val.date_started).toLocaleDateString(): "Null"}</Td>
                                <Td>{val.date_ended? new Date(val.date_ended).toLocaleDateString(): "Null"}</Td>
                                <Td>
                                <Menu>
                                    <MenuButton
                                        as={IconButton}
                                        aria-label='Options'
                                        icon={<LuMoreHorizontal />}
                                        variant='outline'
                                    />
                                    <MenuList>
                                        <MenuItem  onClick={() => openSYModal(val)}>
                                            Edit
                                        </MenuItem>
                                        <MenuItem  onClick={onOpenSY}>
                                            Delete
                                        </MenuItem>
                                    </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>
                           ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Please confirm your action by entering the words provided:
                        <Text textAlign={"center"} color={"red"} textDecor={"underline"} fontWeight={"bold"}>{confirmText}</Text>
                        <Input
                        mt={"10px"}
                        onChange={(e)=>{
                            setInputConfirmText(e.target.value);
                        }}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={executeAction}>
                            Enter
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpenSY} onClose={onCloseSY}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit School Year</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Form
                        initialValues={selectedSY}
                        onFinish={(values) => {
                        
                        }}>
                            <Form.Item 
                            name="start" 
                            label="Start Year"
                            labelCol={{span:24}}
                            rules={[
                                {
                                required: true,
                                message: "Please start year"
                                }
                            ]}
                            >
                                <Input
                                placeholder="Select Date and Time"
                                size="md"
                                type="datetime-local"
                                />
                            </Form.Item>
                            <Form.Item 
                            name="enrollment_open" 
                            label="Enrollment Status"
                            labelCol={{span:24}}
                            >
                                <Select
                                required
                                size={"sm"}
                                value={selectedSY.enrollment_open}
                                onChange={(e) => setSelectedSY((prevState) => ({
                                    ...prevState,
                                    enrollment_open: parseInt(e.target.value),
                                }))}
                                >
                                    <option value="0">Close</option>
                                    <option value="1">Open</option>
                                </Select>
                            </Form.Item>
                            <Form.Item 
                            name="status" 
                            label="S.Y. Status"
                            labelCol={{span:24}}
                            >
                                <Select
                                required
                                size={"sm"}
                                value={selectedSY.status}
                                onChange={(e) => setSelectedSY((prevState) => ({
                                    ...prevState,
                                    status: parseInt(e.target.value),
                                }))}
                                >
                                    <option value="0">Inactive</option>
                                    <option value="1">Active</option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={executeAction}>
                            Enter
                        </Button>
                        <Button variant='ghost' onClick={onCloseSY}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
       </AdminLayout>
    );
}
