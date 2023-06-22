import AnnouncementInterface from "@/interfaces/AnnouncementsInterface";
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
  Select
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { LuMoreHorizontal } from 'react-icons/lu';
import { MdAdd, MdPersonOutline } from 'react-icons/md';
import { announcement_type } from "@/constants/announcement_type";
import { Button as AntButton, Form, Input as AntInput } from 'antd';

export default function TeacherAnnouncementPage() {
  const { data: session, status } = useSession();
  const [isMyAnnoucements, setIsMyAnnoucements] = useState(false)
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<AnnouncementInterface[]>([]);
  const [announcement, setAnnouncement] = useState<AnnouncementInterface>({} as AnnouncementInterface);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    getAnnouncements(isMyAnnoucements);
  }, [session, isMyAnnoucements]);

  const closeModal = () => {
    setAnnouncement({} as AnnouncementInterface);;
    onClose();
  }

  const editModal = (annoucement: AnnouncementInterface) => {
    setAnnouncement(annoucement);
    onOpen();
  }

  function getAnnouncements(type: boolean){
    axios.post("/api/teacher/getAnnouncements", { school_id: session?.user?.school_id, isMyAnnoucements: isMyAnnoucements}).then((res) => {
      setAnnouncements(res.data);
      setAnnouncement((prevState) => ({
        ...prevState,
        type: announcement_type.everyone,
      }))
    });
  }

  function createAnnouncement(){
    axios.post("/api/teacher/createAnnouncement", { school_id: session?.user?.school_id, announcement: announcement}).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Success",
          description: "Announcement have successfully submitted.",
          status: "success",
          duration: 5000,
          position: "top",
        });
        getAnnouncements(isMyAnnoucements);
        closeModal();
      }
    });
  }

  function updateAnnouncement(){
    axios.post("/api/teacher/updateAnnouncement", { announcement: announcement}).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Success",
          description: "Announcement was successfully updated.",
          status: "success",
          duration: 5000,
          position: "top",
        });
        getAnnouncements(isMyAnnoucements);
        closeModal();
      }
    });
  }


  return (
    <Flex
      mt="4vh"
      w={['90vw','90vw','80vw','80vw']}
      minH={"80vh"}
      h="auto"
      bg="white"
      pb='10pc'
      mb="2pc"
      boxShadow="lg"
      alignItems="center"
      flexDirection="column"
      position={"relative"}
    >
      {
        isMyAnnoucements ?
        (
          <Heading py="4vh" mb='3pc'>My Announcements</Heading>
        )
        :
        (
          <Heading py="4vh" mb='3pc'>All Announcements</Heading>
        )
      }
      <Flex position={"absolute"} left={"2pc"} top={"2pc"}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<LuMoreHorizontal />}
            variant='outline'
          />
          <MenuList>
            <MenuItem icon={<MdAdd/>} onClick={onOpen}>
              Create Announcement
            </MenuItem>
            {
              isMyAnnoucements ? 
              (
                <MenuItem icon={<MdPersonOutline/>} onClick={()=>{ setIsMyAnnoucements(false) }}>
                  All Announcements
                </MenuItem> 
              )
              :
              (
                <MenuItem icon={<MdPersonOutline/>} onClick={()=>{ setIsMyAnnoucements(true) }}>
                  My Announcements
                </MenuItem> 
              )
            }
            
          </MenuList>
        </Menu>
      </Flex>
      <Flex flexDirection="column" gap="5">
      {announcements.map((data) => (
        <Flex flexDirection="row" key={data.id}>
          {
            !isMyAnnoucements ?
            (
              <>
              <Image 
              display={['none','inline-block','inline-block','inline-block']} 
              mr="1vw" 
              h={['2rem','4rem','5rem','5rem']} 
              src="/profile_images/user.png" 
              alt="announcement-author" 
              borderRadius="10pc"/>
              <Flex
                mt='1pc'
                h='20px'
                borderTop="10px solid transparent"
                borderRight="20px solid #555"
                borderRightColor="gray.200"
                borderBottom="10px solid transparent"
                display={['none','inline-block','inline-block','inline-block']} 
              ></Flex>
              </>
            ) : null
          }
            <Flex
              p="4"
              w="68vw"
              bg="gray.200"
              h="auto"
              flexDirection="column"
            >
            <Flex flexDirection='column'>
                <Text color="blue.400" fontSize="18px" fontWeight="medium">{data.faculty?.first_name + ' ' + data.faculty?.last_name}</Text>
                <Text color="gray.400" fontSize="14px">{data.faculty?.position}</Text>
                <Text color="gray.400" fontSize="14px">{new Date(data.updated_at).toUTCString()}</Text>
                <Flex flexDirection='column' bg="whiteAlpha.800" p="4" gap="2" marginTop="1pc">
                  <Text color="blue" fontSize="23px" fontWeight="bold">{data.title}</Text>
                  <Text color="black">{data.content}</Text>
                </Flex>
                {
                  isMyAnnoucements?
                  (
                    <Flex alignItems={"end"} justifyContent={"end"} pt="10px" gap={"10px"}>
                      <Button colorScheme='green' onClick={()=>editModal(data)}>Edit</Button>
                      <Button colorScheme='red'>Delete</Button>
                    </Flex>
                  ) : null
                }
            </Flex>
            </Flex>
        </Flex>
        ))}
      </Flex>
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
  );
}