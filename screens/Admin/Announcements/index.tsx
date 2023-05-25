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
import SectionInterface from "@/interfaces/SectionInterface";
import { FiEdit, FiTrash } from "react-icons/fi";
import AddAnnouncementModal from "./components/AddAnnouncementsModal";
import AnnouncementInterface from "@/interfaces/AnnouncementsInterface";

export default function AnnouncementPage() {
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<AnnouncementInterface[]>([]);

  useEffect(() => {
    axios.get("/api/admin/announcement/getAnnouncements").then((res) => {
      setAnnouncements(res.data);
    });
  }, [refreshList]);

  return (
    <Flex flexDirection="column" bg="white" p={"2rem"}>
      <Flex p={5}>
        <Spacer />
        <AddAnnouncementModal refreshList={refreshList} setRefreshList={setRefreshList} />
      </Flex>
      <TableContainer w="full">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>TITLE</Th>
              <Th>CONTENT</Th>
              <Th>TYPE</Th>
              <Th>ACTIONS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {announcements.map((data) => (
              <Tr key={data.announcement_id}>
                <Td>{data.title}</Td>
                <Td>{data.content}</Td>
                <Td>{data.type}</Td>
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
