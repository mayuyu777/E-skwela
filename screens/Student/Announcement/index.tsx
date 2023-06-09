import AnnouncementInterface from "@/interfaces/AnnouncementsInterface";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function StudentAnnouncementPage() {
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<AnnouncementInterface[]>([]);

  useEffect(() => {
    axios.get("/api/student/getAnnouncements").then((res) => {
      setAnnouncements(res.data);
    });
  }, [refreshList]);

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
    >
      <Heading py="4vh" mb='3pc'>Announcements</Heading>
      <Flex flexDirection="column" gap="5">
      {announcements.map((data) => (
        <Flex flexDirection="row" key={data.id}>
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
                <Text color="gray.400" fontSize="14px">{new Date(data.created_at).toUTCString()}</Text>
                <Flex flexDirection='column' bg="whiteAlpha.800" p="4" gap="2" marginTop="1pc">
                  <Text color="blue" fontSize="23px" fontWeight="bold">{data.title}</Text>
                  <Text color="black">{data.content}</Text>
                </Flex>
            </Flex>
            </Flex>
        </Flex>
        ))}
      </Flex>
    </Flex>
  );
}