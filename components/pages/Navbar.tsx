import {
  Flex,
  Text,
  Spacer,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useToast,
  useBreakpoint,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useMediaQuery,
  Box,
  Badge
} from "@chakra-ui/react";
import { MdAccountCircle, MdCircleNotifications } from "react-icons/md";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { HamburgerIcon } from "@chakra-ui/icons";
import { signOut, useSession } from "next-auth/react";
import { role } from "@/constants/role";
import axios from "axios";
import NotificationInterface from "@/interfaces/NotificationInterface";

export default function AdminNavbar() {
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;
  const toast = useToast();
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationInterface[]>([]);

  const logout = async () => {
    signOut().then(() => {
      router.push("/SignIn");
    });
  };

  useEffect(() => {
    axios
      .post("/api/getNotifications", { school_id: session?.user?.school_id })
      .then((res) => {
        if(res.data){
          setNotifications(res.data as NotificationInterface[]);
        }
      });
      console.log("jshda")

  },[session]);

  function markNotifAsRead(notifID: string){
    axios
      .post('/api/updateNotification', { notif_id: notifID })
      .then((res) => {
        if(res.data){
          const updatedItems = notifications.filter((item) => item.id !== notifID);
          setNotifications(updatedItems);
        }
      })
  }

  return (
    <Flex px="12" w="full" h="4pc" boxShadow="md" alignItems="center" bg="white" zIndex={"500"}>
      {!isLargerThan800 ? (
        <>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row"
            w="100vw"
            mr="-3rem"
            ml="-1rem"
          >
            <HamburgerIcon onClick={onOpen} w={6} h={6} />
            <Image w="3rem" src="https://i.ibb.co/jZRx5kv/gege.png" alt="" />
            <Menu>
              <MenuButton
                as={Button}
                fontWeight="normal"
                bg="white"
                _hover={{ background: "white" }}
                _active={{ background: "white" }}
              >
                <MdAccountCircle size="32" />
              </MenuButton>
              <MenuList>
                <Text ml="12px" color="black">
                  Hello {session?.user?.name}
                </Text>
                <Link href="/SignIn">
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>

          <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={"full"}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton mt={"0.2pc"} />
              <DrawerHeader color={"gray.600"} fontSize={"14px"}>
                MENU
              </DrawerHeader>
              <DrawerBody borderWidth="1px" borderColor={"gray.100"} p={"0"}>
                {userRole == role.student && (
                  <Flex w={"full"} flexDirection="column">
                    <Box p={"0.5pc"} _hover={{ bg: "gray.200" }}>
                      <Link href="/admin/Dashboard">
                        <Text fontWeight={"light"} ml={"1.5pc"}>
                          Home
                        </Text>
                      </Link>
                    </Box>
                    <Box p={"0.5pc"} _hover={{ bg: "gray.200" }}>
                      <Link href="/admin/Dashboard">
                        <Text fontWeight={"light"} ml={"1.5pc"}>
                          About
                        </Text>
                      </Link>
                    </Box>
                    <Box p={"0.5pc"} _hover={{ bg: "gray.200" }}>
                      <Link href="/admin/Dashboard">
                        <Text fontWeight={"light"} ml={"1.5pc"}>
                          Grades
                        </Text>
                      </Link>
                    </Box>
                    <Box p={"0.5pc"} _hover={{ bg: "gray.200" }}>
                      <Link href="/admin/Announcements">
                        <Text fontWeight={"light"} ml={"1.5pc"}>
                          Schedule
                        </Text>
                      </Link>
                    </Box>
                    <Box p={"0.5pc"} _hover={{ bg: "gray.200" }}>
                      <Link href="/admin/Accounts">
                        <Text fontWeight={"light"} ml={"1.5pc"}>
                          Enrollment
                        </Text>
                      </Link>
                    </Box>
                  </Flex>
                )}
                {userRole == role.teacher && (
                  <Flex w={"full"} flexDirection="column">
                    <Box p={"0.5pc"} _hover={{ bg: "gray.200" }}>
                      <Link href="/teacher/Dashboard">
                        <Text fontWeight={"light"} ml={"1.5pc"}>
                          Home
                        </Text>
                      </Link>
                    </Box>
                    <Box p={"0.5pc"} _hover={{ bg: "gray.200" }}>
                      <Link href="/teacher/Dashboard">
                        <Text fontWeight={"light"} ml={"1.5pc"}>
                          About
                        </Text>
                      </Link>
                    </Box>
                    <Box p={"0.5pc"} _hover={{ bg: "gray.200" }}>
                      <Link href="/teacher/Dashboard">
                        <Text fontWeight={"light"} ml={"1.5pc"}>
                          Class Advisory
                        </Text>
                      </Link>
                    </Box>
                    <Box p={"0.5pc"} _hover={{ bg: "gray.200" }}>
                      <Link href="/teacher/Announcements">
                        <Text fontWeight={"light"} ml={"1.5pc"}>
                          Subjects
                        </Text>
                      </Link>
                    </Box>
                    <Box p={"0.5pc"} _hover={{ bg: "gray.200" }}>
                      <Link href="/teacher/Accounts">
                        <Text fontWeight={"light"} ml={"1.5pc"}>
                          Schedule
                        </Text>
                      </Link>
                    </Box>
                  </Flex>
                )}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <>
          <Flex alignItems="center">
            <Image mr="1vw" w="3rem" src="https://i.ibb.co/jZRx5kv/gege.png" alt="" />
            <Text fontSize={"20px"} fontWeight={"bold"} color={"gray.700"}>
              Buyong High School
            </Text>
          </Flex>
          <Spacer />
          <Flex alignItems="center">
            <Text mx="1vw" color={"gray.700"}>
            <Link href={userRole == role.student ? "/student/Announcements" : "/teacher/Announcements"}>Home</Link>
            </Text>
            <Text mx="1vw" color={"gray.700"}>
              <Link href={userRole == role.student ? "/student/About" : "/teacher/About"}>About</Link>
            </Text>
            <Menu>
              <MenuButton
                as={Button}
                fontWeight="normal"
                bg="white"
                color={"gray.700"}
                _hover={{ background: "white" }}
                _active={{ background: "white" }}
              >
                {userRole == role.student ? "Student" : "Teacher"} Tasks
              </MenuButton>
              <MenuList>
                {userRole == role.student && (
                  <>
                    <Link href="/student/Grades">
                      <MenuItem>Grades</MenuItem>
                    </Link>
                    <Link href="/student/Schedule">
                      <MenuItem>Schedule</MenuItem>
                    </Link>
                    <Link href="/student/Enrollment">
                      <MenuItem>Enrollment</MenuItem>
                    </Link>
                  </>
                )}
                {userRole == role.teacher && (
                  <>
                    <Link href="/teacher/ClassAdvisory">
                      <MenuItem>Class Advisory</MenuItem>
                    </Link>
                    <Link href="/teacher/Subjects">
                      <MenuItem>Subjects</MenuItem>
                    </Link>
                    <Link href="/teacher/Schedule">
                      <MenuItem>Schedule</MenuItem>
                    </Link>
                  </>
                )}
              </MenuList>
            </Menu>
            <Flex>
              <Menu>
                <MenuButton
                  as={Button}
                  fontWeight="normal"
                  bg="white"
                  color={"gray.700"}
                  _hover={{ background: "white" }}
                  _active={{ background: "white" }}
                >
                  <MdCircleNotifications size="32" />
                  {
                    notifications.length > 0 ? (
                      <Badge ml='1' fontSize='0.8em' colorScheme='green' position={"absolute"} top={"0"}>
                        { notifications.length }
                      </Badge>
                    ) : null
                  }
                </MenuButton>
                <MenuList>
                  {
                    notifications.length > 0 ? (
                      notifications.map((data) => (
                        <MenuItem color="black" key={data.id} onClick={() => markNotifAsRead(data.id)}>
                            <Text>{data.content}</Text>
                        </MenuItem>
                      ))
                    ) : 
                    (
                      <Text align={"center"}>You have zero notification.</Text>
                    )
                  }
                </MenuList>
              </Menu>
            </Flex>
            <Flex>
              <Menu>
                <MenuButton
                  as={Button}
                  fontWeight="normal"
                  bg="white"
                  color={"gray.700"}
                  _hover={{ background: "white" }}
                  _active={{ background: "white" }}
                >
                  <MdAccountCircle size="32" />
                </MenuButton>
                <MenuList>
                  <Text ml="12px" color="black">
                    Hello {session?.user?.name}
                  </Text>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
}
