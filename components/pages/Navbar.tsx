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
    Box
  } from '@chakra-ui/react';
  import { MdAccountCircle, MdCircleNotifications } from 'react-icons/md';
  import Link from 'next/link';
  import React, { useContext, useEffect } from 'react';
  import Router from 'next/router';
  import { HamburgerIcon } from '@chakra-ui/icons';
  import { useSession } from "next-auth/react";
  import { role } from '@/constants/role';
  
  export default function AdminNavbar() {
    const { data: session, status } = useSession();
    const userRole = session?.user?.role;
    const toast = useToast();
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <Flex
        px="12"
        w="full"
        h="4pc"
        boxShadow="lg"
        alignItems="center"
        bg="white"
      >
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
              <Image
                w="3rem"
                src="https://i.ibb.co/jZRx5kv/gege.png"
                alt=""
              />
              <Menu>
                <MenuButton
                  as={Button}
                  fontWeight="normal"
                  bg="white"
                  _hover={{ background: 'white' }}
                  _active={{ background: 'white' }}
                >
                  <MdAccountCircle size="32" />
                </MenuButton>
                <MenuList>
                  <Text ml="12px" color="black">
                    Hello You!
                  </Text>
                  <Link href="/Login">
                    <MenuItem>Logout</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </Flex>
  
            <Drawer
              placement="left"
              onClose={onClose}
              isOpen={isOpen}
              size={'full'}
            >
              <DrawerOverlay/>
              <DrawerContent>
                <DrawerCloseButton mt={'0.2pc'}/>
                <DrawerHeader color={'gray.600'} fontSize={'14px'}>MENU</DrawerHeader>
                <DrawerBody borderWidth="1px" borderColor={'gray.100'} p={'0'}>
                    {
                        userRole == role.student? (
                            <Flex w={'full'} flexDirection="column">
                                <Box p={'0.5pc'} _hover={{bg:'gray.200'}}>
                                <Link href="/admin/Dashboard">
                                    <Text fontWeight={'light'} ml={'1.5pc'}>Home</Text>
                                </Link>
                                </Box>
                                <Box p={'0.5pc'} _hover={{bg:'gray.200'}}>
                                <Link href="/admin/Dashboard">
                                    <Text fontWeight={'light'} ml={'1.5pc'}>About</Text>
                                </Link>
                                </Box>
                                <Box p={'0.5pc'} _hover={{bg:'gray.200'}}>
                                <Link href="/admin/Dashboard">
                                    <Text fontWeight={'light'} ml={'1.5pc'}>Grades</Text>
                                </Link>
                                </Box>
                                <Box p={'0.5pc'} _hover={{bg:'gray.200'}}>
                                <Link href="/admin/Announcements">
                                    <Text fontWeight={'light'} ml={'1.5pc'}>Schedule</Text>
                                </Link>
                                </Box>
                                <Box p={'0.5pc'} _hover={{bg:'gray.200'}}>
                                <Link href="/admin/Accounts">
                                    <Text fontWeight={'light'} ml={'1.5pc'}>Enrollment</Text>
                                </Link>
                                </Box>
                            </Flex>
                        ) : (
                          <Flex w={'full'} flexDirection="column">
                            <Box p={'0.5pc'} _hover={{bg:'gray.200'}}>
                            <Link href="/admin/Dashboard">
                                <Text fontWeight={'light'} ml={'1.5pc'}>Home</Text>
                            </Link>
                            </Box>
                            <Box p={'0.5pc'} _hover={{bg:'gray.200'}}>
                            <Link href="/admin/Dashboard">
                                <Text fontWeight={'light'} ml={'1.5pc'}>About</Text>
                            </Link>
                            </Box>
                            <Box p={'0.5pc'} _hover={{bg:'gray.200'}}>
                            <Link href="/admin/Dashboard">
                                <Text fontWeight={'light'} ml={'1.5pc'}>Class Advisory</Text>
                            </Link>
                            </Box>
                            <Box p={'0.5pc'} _hover={{bg:'gray.200'}}>
                            <Link href="/admin/Announcements">
                                <Text fontWeight={'light'} ml={'1.5pc'}>Subjects</Text>
                            </Link>
                            </Box>
                            <Box p={'0.5pc'} _hover={{bg:'gray.200'}}>
                            <Link href="/admin/Accounts">
                                <Text fontWeight={'light'} ml={'1.5pc'}>Schedule</Text>
                            </Link>
                            </Box>
                        </Flex>
                        )
                    }
                  
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <>
            <Flex alignItems="center">
              <Image
                mr="1vw"
                w="3rem"
                src="https://i.ibb.co/jZRx5kv/gege.png"
                alt=""
              />
              <Text fontSize={'20px'} fontWeight={'bold'} color={'gray.700'}>Buyong High School</Text>
            </Flex>
            <Spacer />
            <Flex alignItems="center">
              <Text mx="1vw" color={'gray.700'}>
                <Link href={userRole == role.student? '/student/Home' : '/teacher/Home'}>Home</Link>
              </Text>
              <Text mx="1vw" color={'gray.700'}>
                <Link href="/About">About</Link>
              </Text>
              <Menu>
                <MenuButton
                  as={Button}
                  fontWeight="normal"
                  bg="white"
                  color={'gray.700'}
                  _hover={{ background: 'white' }}
                  _active={{ background: 'white' }}
                >
                  { userRole == role.student? 'Student' : 'Teacher'} Tasks
                </MenuButton>
                <MenuList>
                    {
                        userRole == role.student? (
                            <>
                            <Link href="/admin/Dashboard">
                                <MenuItem>Grades</MenuItem>
                            </Link>
                            <Link href="/admin/Announcements">
                                <MenuItem>Schedule</MenuItem>
                            </Link>
                            <Link href="/admin/Accounts">
                                <MenuItem>Enrollment</MenuItem>
                            </Link>
                            </>
                        ) : (
                            <>
                            <Link href="/admin/Dashboard">
                                <MenuItem>Class Advisory</MenuItem>
                            </Link>
                            <Link href="/admin/Announcements">
                                <MenuItem>Subjects</MenuItem>
                            </Link>
                            <Link href="/admin/Accounts">
                                <MenuItem>Schedule</MenuItem>
                            </Link>
                            </>
                        )
                    }
                </MenuList>
              </Menu>
              <Flex>
            <Menu>
                <MenuButton
                    as={Button}
                    fontWeight="normal"
                    bg="white"
                    color={'gray.700'}
                    _hover={{ background: 'white' }}
                    _active={{ background: 'white' }}
                >
                <MdCircleNotifications size="32"/>
                </MenuButton>
                </Menu>
              </Flex>
              <Flex >
                <Menu>
                  <MenuButton
                    as={Button}
                    fontWeight="normal"
                    bg="white"
                    color={'gray.700'}
                    _hover={{ background: 'white' }}
                    _active={{ background: 'white' }}
                  >
                    <MdAccountCircle size="32" />
                  </MenuButton>
                  <MenuList>
                    <Text ml="12px" color="black">
                      Hello
                    </Text>
                    <Link href="/Login">
                      <MenuItem>Logout</MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    );
  }
  