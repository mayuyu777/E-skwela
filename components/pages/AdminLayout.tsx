import { Flex } from "@chakra-ui/layout";
import React, { useContext, useState, useEffect, ReactNode } from "react";
import Navbar from "./Navbar";
import SidebarWithHeader from "./AdminNavbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <SidebarWithHeader>{children}</SidebarWithHeader>;
}
