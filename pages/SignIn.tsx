import { NextPage } from "next";
import { signIn } from "next-auth/react";
import {  useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { hasAccess } from "@/lib/routes";
import LoginForm from "../components/pages/signin/LoginForm";
import CardLink from "../components/pages/signin/CardLink";
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Image,
  VStack,
  Text
} from '@chakra-ui/react';
import ShoolHeader from '@/components/pages/shoolheader';

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if(status === 'authenticated'){
      const res = hasAccess(router.pathname, session.user?.name.role);
      router.push(res.path);
    }
  },[session])

  return (
    <Grid 
      w={'100%'} 
      minH={'100vh'} 
      bg={['gray.800']} 
      gap={'10'} 
      pt={['3pc','3pc','4pc','4pc']}
      pb={'10pc'}
    >
      <ShoolHeader/>
      <Grid 
        w={['20pc','20pc','45pc','50pc']} 
        templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(2, 1fr)','repeat(2, 1fr)']} 
        gap={['8','8','2','4']}
        margin={'auto'}
        padding={'auto'}
      >
        <GridItem><LoginForm /></GridItem>
        <GridItem><CardLink /></GridItem>
      </Grid>
    </Grid>
  );
};

export default SignIn;