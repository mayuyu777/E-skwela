import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useEffect, useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button, 
  Text,
  Box,
  Flex,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { TextField } from '../../components/formik/TextField';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { hasAccess } from "@/lib/routes";

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
  const { data: session, status } = useSession();
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if(status === 'authenticated'){
      const res = hasAccess(router.pathname, session.user?.name.role);
      router.push(res.path);
    }
  },[session])

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
          username: Yup.string().required('Username required'),
          password: Yup.string().required('Password required'),
      })}
      onSubmit={ async (values, actions) => {
          const res = await signIn("credentials", {
          username: values.username,
            password: values.password,
            redirect: false,
          });

          if(res?.error){
            setError(res.error);
          }

          console.log(res)
          actions.resetForm();
      }}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <Card w={'20pc'} margin={'auto'} mt={['7pc']}>
            <CardBody p={'2pc'}>
              <Flex gap={'1pc'} flexDirection={'column'}>
                <Text align={"center"} fontWeight={'bold'} mb={'1pc'}>Login to you account</Text>
                { error? (
                  <Text align={"center"} color={"red"} fontSize={'13px'}>{error}</Text>
                ):( 
                  <></>
                )}
                <TextField name='username' type='text' placeholder='username'/>
                <TextField name='password' type='password' placeholder='password'/>
              </Flex>
            </CardBody>
            <Button colorScheme='teal' type="submit" width={['full']} p={'2pc'}>Login</Button>
          </Card>
        </form>
      ) }
    </Formik>
  );
};

export default SignIn;