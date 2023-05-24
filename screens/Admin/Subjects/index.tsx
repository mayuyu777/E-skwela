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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AddSubjectModal from "./components/AddSubjectModal";
import axios from "axios";
import SubjectInterface from "@/interfaces/SubjectInterface";

export default function SubjectPage() {
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<SubjectInterface[]>([]);

  useEffect(() => {
    axios.get("/api/admin/subject/getSubjects").then((res) => {
      console.log(res);
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
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            {subjects.map((data) => (
              <Tr key={data.subject_id}>
                <Td>Grade {data.year_level}</Td>
                <Td>{data.name}</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
}
