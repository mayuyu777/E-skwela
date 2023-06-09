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
import AddSubjectModal from "./components/AddSubjectModal";
import axios from "axios";
import SubjectInterface from "@/interfaces/SubjectInterface";
import { EditIcon } from "@chakra-ui/icons";
import { FaTrash } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function SubjectPage() {
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<SubjectInterface[]>([]);

  useEffect(() => {
    axios.get("/api/admin/subject/getSubjects").then((res) => {
      setSubjects(res.data);
    });
  }, [refreshList]);

  return (
    <Flex flexDirection="column" bg="white" p={"2rem"}>
      <Flex p={5}>
        <Spacer />
        <AddSubjectModal refreshList={refreshList} setRefreshList={setRefreshList} />
      </Flex>
      <TableContainer w="full">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>GRADE</Th>
              <Th>NAME OF SUBJECT</Th>
              <Th>ACTION</Th>
            </Tr>
          </Thead>
          <Tbody>
            {subjects.map((data) => (
              <Tr key={data.subject_id}>
                <Td>Grade {data.year_level}</Td>
                <Td>{data.name}</Td>
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
