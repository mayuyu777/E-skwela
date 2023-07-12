import { 
  Flex, 
  Heading, 
  Image, 
  Text, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  IconButton, 
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast, 
  Select,
  Spacer,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SubjectInterface from "@/interfaces/SubjectInterface";
import SectionInterface from "@/interfaces/SectionInterface";
import { FiEdit, FiTrash } from "react-icons/fi";
import AddAnnouncementModal from "./components/AddAnnouncementsModal";
import AnnouncementInterface from "@/interfaces/AnnouncementsInterface";
import { useSession } from "next-auth/react";
import { announcement_type } from "@/constants/announcement_type";
import { Button as AntButton, Form, Input as AntInput } from 'antd';
import { FiPlus } from "react-icons/fi";


export default function AnnouncementPage() {
  const { data: session, status } = useSession();
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<AnnouncementInterface[]>([]);
  const [announcement, setAnnouncement] = useState<AnnouncementInterface>({} as AnnouncementInterface);
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const take = 3;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    getAnnouncements();
  }, [session, page]);

  const closeModal = () => {
    setAnnouncement({} as AnnouncementInterface);;
    onClose();
  }

  const editModal = (annoucement: AnnouncementInterface) => {
    setAnnouncement(annoucement);
    onOpen();
  }

  function getAnnouncements(){
    axios.post("/api/admin/announcement/getAnnouncements", { page: page, take: take, search: search}).then((res) => {
      setAnnouncements(res.data.announcements);
      setTotalItems(res.data.count);
      setAnnouncement((prevState) => ({
        ...prevState,
        type: announcement_type.everyone,
      }))
    });
  }

  function success(message: string){
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: 5000,
      position: "top",
    });
    getAnnouncements();
    closeModal();
  }

  function createAnnouncement(){
    axios.post("/api/admin/announcement/createAnnouncement", { school_id: session?.user?.school_id, announcement: announcement}).then((res) => {
      if (res.status === 200) {
        success("Announcement have successfully submitted.");
      }
    });
  }

  function updateAnnouncement(){
    axios.post("/api/admin/announcement/updateAnnouncement", { announcement: announcement}).then((res) => {
      if (res.status === 200) {
        success("Announcement was successfully updated.");
      }
    });
  }

  function deleteAnnouncement(item: AnnouncementInterface){
    axios.post("/api/admin/announcement/deleteAnnouncement", {announcement: item} ).then((res) => {
      if (res.status === 200) {
        success("Announcement was deleted.");
      }
    });
  }

  return (
    <Flex 
      mt="0.5vh"
      w={['90vw','90vw','80vw','80vw']}
      minH={"100vh"}
      h="auto"
      bg="white"
      pb='10pc'
      mb="2pc"
      boxShadow="lg"
      alignItems="center"
      flexDirection="column"
      position={"relative"}>
      <Flex p={5}>
        <Spacer />
        <Flex pos={"absolute"} left={"1.5pc"} gap={"0.5rem"}>
          <Input
            placeholder="Search"
            onChange={(e)=>{
              setSearch(e.target.value);
            }}/>
          <Button w={"10pc"} onClick={getAnnouncements}>
            Search
          </Button>
        </Flex>
        <Button rightIcon={<FiPlus />} onClick={onOpen} pos={"absolute"} right={"1pc"} colorScheme="blue">
          Create Announcement
        </Button>
        <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{announcement?.id ? "Edit" : "Add"} Announcement</ModalHeader>
          <ModalCloseButton />
          <Form
            initialValues={announcement}
            onFinish={(values) => {
              announcement?.id? updateAnnouncement() : createAnnouncement()
            }}>
          <ModalBody>
              <Form.Item 
              name="title" 
              label="Title"
              labelCol={{span:24}}
              rules={[
                {
                  required: true,
                  message: "Please enter title."
                }
              ]}
              >
                <AntInput onChange={(e)=>{
                  setAnnouncement((prevState) => ({
                    ...prevState,
                    title: e.target.value
                  }))
                }}/>
              </Form.Item>
              <Form.Item 
              name="content" 
              label="Content"
              labelCol={{span:24}}
              rules={[
                {
                  required: true,
                  message: "Please enter content."
                }
              ]}
              >
                <AntInput.TextArea onChange={(e)=>{
                  setAnnouncement((prevState) => ({
                    ...prevState,
                    content: e.target.value
                  }))
                }}/>
              </Form.Item>
              <Select
                  required
                  size={"sm"}
                  value={announcement.type}
                  onChange={(e) => setAnnouncement((prevState) => ({
                    ...prevState,
                    type: parseInt(e.target.value),
                  }))}
                >
                  <option value={announcement_type.everyone}>Everyone</option>
                  <option value={announcement_type.teacher}>Teachers</option>
                  <option value={announcement_type.admin}>Admin</option>
                </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} type="submit">{announcement?.id? "Save" : "Submit"}</Button>
            <Button variant='ghost' onClick={closeModal}>Cancel</Button>
          </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
      </Flex>
      <TableContainer w="full" mt={"3pc"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>AUTHOR</Th>
              <Th>TITLE</Th>
              <Th>CONTENT</Th>
              <Th>TYPE</Th>
              <Th textAlign="center">ACTIONS</Th>
            </Tr>
          </Thead>
          <Tbody overflow={"hidden"}>
            {announcements.map((data) => (
              <Tr  fontSize={"13px"} whiteSpace={"break-spaces"} key={data.id}>
                <Td fontWeight={"medium"} color={"gray.700"}>{data.faculty?.first_name} {data.faculty?.last_name} { "-" + data.faculty?.position}</Td>
                <Td fontWeight={"medium"} color={"blue.500"}>{data.title}</Td>
                <Td>{data.content}</Td>
                <Td>{data.type}</Td>
                <Td>
                  <Flex gap="1rem">
                    <Button leftIcon={<FiEdit />} variant="solid" colorScheme="green" onClick={()=>editModal(data)}>
                      Edit
                    </Button>
                    <Button leftIcon={<FiTrash />} variant="solid" colorScheme="red" onClick={()=>deleteAnnouncement(data)}>
                      Delete
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex gap={"10px"} alignItems={"center"} position={"absolute"} bottom={"5pc"}>
        <Button size={"sm"} onClick={()=>setPage((prev)=> --prev)} isDisabled={page > 1? false : true}>Prev</Button>
        <Text fontSize={"15px"} color={"gray.600"}>{ (((page-1)*take)+announcements.length) + " of " + totalItems }</Text>
        <Button size={"sm"} onClick={()=>setPage((prev)=> ++prev)} isDisabled={(((page-1)*take)+announcements.length) === totalItems? true : false}>Next</Button>
      </Flex>
    </Flex>
  );
}
