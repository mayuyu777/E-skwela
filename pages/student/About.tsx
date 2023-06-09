import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { hasAccess } from "@/lib/routes";
import Layout from "@/components/pages/Layout";
import {
    Flex,
    Heading,
    Image,
    Text
  } from "@chakra-ui/react";
import SessionInterface from "@/interfaces/SessionInterface";

export default function Announcements() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    let sessionUser = session?.user as SessionInterface;
    if (status === "unauthenticated") {
      router.push("/SignIn");
    }
    const res = hasAccess(router.pathname, sessionUser?.role);

    if (!res.authorized) {
      router.push(res.path);
    }
  }, [session]);

  return (
    <Layout>
      <Flex 
        h="100vh" 
        bg="white" 
        position="relative" 
        w="full" 
        flexDirection="column" 
        alignItems="center"
        overflowY="hidden">
        <Heading
            position="absolute"
            zIndex="200"
            mt="3pc"
        >
        About
        </Heading>
        <Flex
          px="20"
          h="full"
          w="full"
          justifyContent="center"
          className="about-info-div"
          position="absolute"
          zIndex="100"
          p="5pc"
          overflowY="hidden"
        >
            <Text mt="3pc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
            </Text>
        </Flex>
        <Flex
            w="full"
            h="100vh"
            position="absolute"
            className="about-bg-image"
            overflowY="hidden"
        >
        </Flex>
      </Flex>
    </Layout>
  );
}
