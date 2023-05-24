import AnnouncementInterface from "@/interfaces/AnnouncementsInterface";
import { Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function StudentAnnouncementPage() {
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<AnnouncementInterface[]>([]);

  useEffect(() => {
    axios.get("/api/announcement/getAnnouncements").then((res) => {
      setAnnouncements(res.data);
    });
  }, [refreshList]);

  return (
    <Flex
      mt="4vh"
      w="80vw"
      h="80vh"
      bg="white"
      boxShadow="lg"
      alignItems="center"
      flexDirection="column"
    >
      <Heading py="4vh">Announcements</Heading>
      <Flex flexDirection="column" w="70vw" h="54vh" overflowY="auto">
        {announcements.map((data) => (
          <Flex
            key={data.announcement_id}
            p="4"
            my="2vh"
            w="68vw"
            bg="gray.100"
            h="12vh"
            flexDirection="column"
          >
            {data.announcement_id}
            {data.title}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
