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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SubjectInterface from "@/interfaces/SubjectInterface";
import { EditIcon } from "@chakra-ui/icons";
import { FaTrash } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import AddTeacherModal from "./components/AddTeacherModal";
import TeacherInterface from "@/interfaces/TeacherInterface";
import moment from "moment";

export default function TeacherPage() {
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<TeacherInterface[]>([]);

  useEffect(() => {
    axios.get("/api/admin/teacher/getTeachers").then((res) => {
      setTeachers(res.data);
    });
  }, [refreshList]);

  return (
    <Flex flexDirection="column" bg="white" p={"2rem"}>
      <Flex p={5}>
        <Spacer />
        <AddTeacherModal refreshList={refreshList} setRefreshList={setRefreshList} />
      </Flex>
      <TableContainer w="full">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>POSITION</Th>
              <Th>FIRSTNAME</Th>
              <Th>MIDDLENAME</Th>
              <Th>LASTNAME</Th>
              <Th>SUFFIX</Th>
              <Th>GENDER</Th>
              <Th>AGE</Th>
              <Th>CONTACT</Th>
              <Th>MARITAL STATUS</Th>
              <Th>CREATED AT</Th>
              <Th>ACTION</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teachers.map((data) => (
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
                <Td>
                  <Flex gap="1rem">
                    <Button leftIcon={<FiEdit />} variant="solid">
                      Edit
                    </Button>
                    <Button leftIcon={<FiTrash />} variant="solid">
                      Delete
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
