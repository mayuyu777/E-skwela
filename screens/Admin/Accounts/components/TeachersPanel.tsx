import TeacherInterface from "@/interfaces/TeacherInterface";
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
import moment from "moment";
import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function TeachersPanel({ teachers }: { teachers: TeacherInterface[] }) {
  return (
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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
