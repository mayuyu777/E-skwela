import { signIn } from "next-auth/react";
import { useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button, 
  Text,
  Box,
  Flex,
  Card,
  CardBody,
  Input,
  useToast,
} from '@chakra-ui/react';
import { TextField } from '../../formik/TextField';


export default function LoginForm() {
    const toast = useToast();

    return (
        <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object({
            username: Yup.string().required('Username required'),
            password: Yup.string().required('Password required'),
        })}
        validateOnChange={false}
        onSubmit={ async (values, actions) => {
            const res = await signIn("credentials", {
            username: values.username,
                password: values.password,
                redirect: false,
            });

            if(res?.error){
                toast({
                    title: 'Error',
                    description: res.error,
                    status: 'error',
                    duration: 5000,
                    position: 'top',
                });
            }else{
                toast({
                    title: 'Success',
                    description: 'You have successfully logged in!',
                    status: 'success',
                    duration: 5000,
                    position: 'top',
                });
            }
            actions.resetForm();
        }}
        >
        {formik => (
            <form onSubmit={formik.handleSubmit}>
                <Card 
                    w={['20pc','20pc','17pc','20pc']}                     
                    margin={'auto'}
                    bg={'gray.100'}
                >
                    <CardBody p={'1pc'}>
                        <Flex gap={['0.5pc','0.5pc','1pc','1pc']} flexDirection={'column'}>
                            <Text align={"left"} fontWeight={'medium'} mb={'0.2pc'}>Login to you Account</Text>
                            <TextField values={[]} asType={Input} label={''} withError={true} name='username' type='text' placeholder='Username' bg={'white'} size={'sm'}/>
                            <TextField values={[]} asType={Input} label={''} withError={true} name='password' type='password' placeholder='Password' bg={'white'} size={'sm'}/>
                            <Button colorScheme='teal' type="submit" width={['full']} p={'1.5pc'}>Login</Button>
                        </Flex>
                    </CardBody>
                </Card>
            </form>
        ) }
    </Formik>
  );
};
