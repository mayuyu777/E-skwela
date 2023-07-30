import {
    Flex,
    Text,
    Card 
  } from "@chakra-ui/react";

export default function NotAvailable() {
    return (
        <Card w={["95%", "95%", "80%", "70%"]} minH={"100vh"} bg={"gray.50"} m={"auto"}>
            <Text fontSize={"20px"} color={"white"} align={"center"}>Not available</Text>
        </Card>
    );
}