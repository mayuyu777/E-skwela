import { Flex } from "@chakra-ui/layout";
import React, { useContext, useState, useEffect, ReactNode } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Flex w="full" minH="100vh" bg="gray.800" flexDirection="column" alignItems="center">
      <Navbar />
      {children}
    </Flex>
  );
}
