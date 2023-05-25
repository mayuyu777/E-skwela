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
import axios from "axios";
import SubjectInterface from "@/interfaces/SubjectInterface";
import AddSectionModal from "./components/AddSectionModal";
import SectionInterface from "@/interfaces/SectionInterface";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function SectionPage() {
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [sections, setSections] = useState<SectionInterface[]>([]);

  useEffect(() => {
    axios.get("/api/admin/section/getSections").then((res) => {
      setSections(res.data);
    });
  }, [refreshList]);

  return (
    <Flex flexDirection="column" bg="white" p={"2rem"}>
      <Flex p={5}>
        <Spacer />
        <AddSectionModal refreshList={refreshList} setRefreshList={setRefreshList} />
      </Flex>
      <TableContainer w="full">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>GRADE</Th>
              <Th>NAME OF SECTION</Th>
              <Th>ACTIONS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sections.map((data) => (
              <Tr key={data.section_id}>
                <Td>Grade {data.year_level}</Td>
                <Td>{data.section_name}</Td>
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
