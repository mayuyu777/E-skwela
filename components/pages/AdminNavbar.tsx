/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useMediaQuery,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Image,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiGrid,
  FiUser,
  FiUserPlus,
  FiArchive,
  FiBook,
  FiUsers,
  FiPackage,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Session } from "next-auth";
import ShoolHeader from "./shoolheader";

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, link: "admin/Home" },
  { name: "Dashboard", icon: FiArchive, link: "/admin/Dashboard" },
  { name: "Accounts", icon: FiUsers, link: "/admin/Accounts" },
  { name: "Enrollment", icon: FiPackage, link: "/admin/Enrollment" },
];

const AccordionItems: Array<LinkItemProps> = [
  { name: "Students", icon: FiUser, link: "/admin/Students" },
  { name: "Teachers", icon: FiUserPlus, link: "/admin/Teachers" },
  { name: "Sections", icon: FiUsers, link: "/admin/Sections" },
  { name: "Subjects", icon: FiBook, link: "/admin/Subjects" },
  { name: "Announcements", icon: FiBell, link: "/admin/Announcements" },
];

export default function SidebarWithHeader({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan800] = useMediaQuery("(min-width: 480px)");
  const { data: session } = useSession();
  const router = useRouter();

  const logout = async () => {
    signOut().then(() => {
      router.push("/SignIn");
    });
  };

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [isLargerThan800]);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent onClose={() => onClose} display={{ base: "none", sm: "block" }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} logout={logout} session={session} />
      <Box ml={{ base: 0, sm: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 480px)");
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", sm: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {isLargerThan800 && (
          <Image
            w={["4rem"]}
            src="https://i.ibb.co/jZRx5kv/gege.png"
            ml={"auto"}
            mr={"auto"}
            alt=""
          />
        )}

        <CloseButton display={{ base: "flex", sm: "none" }} mr={0} ml={"auto"} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => {
        if (link.name === "Dashboard") {
          return (
            <Accordion key={link.name} allowMultiple>
              <AccordionItem>
                <AccordionButton p={-1}>
                  <NavItem icon={link.icon}>{link.name}</NavItem>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  {AccordionItems.map((data) => (
                    <Link href={data.link} key={data.name}>
                      <NavItem icon={data.icon}>{data.name}</NavItem>
                    </Link>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        } else {
          return (
            <Link key={link.name} href={link.link}>
              <NavItem key={link.name} icon={link.icon}>
                {link.name}
              </NavItem>
            </Link>
          );
        }
      })}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      // role="group"
      // cursor="pointer"
      // _hover={{
      //   bg: "cyan.400",
      //   color: "white",
      // }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  logout: () => void;
  session: Session | null;
}
const MobileNav = ({ onOpen, logout, session, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, sm: 60 }}
      px={{ base: 4, sm: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", sm: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", sm: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", sm: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", sm: "6" }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", sm: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{session?.user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", sm: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};