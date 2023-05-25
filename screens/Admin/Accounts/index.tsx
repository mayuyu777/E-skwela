import {
  Flex,
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
  IconButton,
  Input,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SubjectInterface from "@/interfaces/SubjectInterface";
import { EditIcon } from "@chakra-ui/icons";
import { FaTrash } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import TeacherInterface from "@/interfaces/TeacherInterface";
import moment from "moment";
import { AdminInput } from "@/components/input/FormInput";
import StudentsPanel from "./components/StudentsPanel";

export default function AccountsPage() {
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<TeacherInterface[]>([]);
//   const [students, setStudents] = useState<StudentIn[]>([]);
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    axios.get("/api/admin/accounts/getAccounts").then((res) => {
      setTeachers(res.data.teachers);
      setAdmins(res.data.admins)
      console.log(res.data)
    });
  }, [refreshList]);

  return (
    <Flex flexDirection="column" bg="white" p={"2rem"}>
      <Flex p={5} gap={"1rem"} alignItems="center">
        <Text>Search:</Text>
        <Input height={"2rem"} w={"10rem"} />
      </Flex>
      <Tabs>
        <TabList>
          <Tab>Students</Tab>
          <Tab>Teachers</Tab>
          <Tab>Admins</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <StudentsPanel teachers={teachers} />
          </TabPanel>
          <TabPanel>
            <StudentsPanel teachers={teachers} />
          </TabPanel>
          <TabPanel>
            <StudentsPanel teachers={admins} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
