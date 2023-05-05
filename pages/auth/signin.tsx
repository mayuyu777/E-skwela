import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button
} from '@chakra-ui/react'
import { TextField } from '../../components/formik/TextField'

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
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
          console.log(res);
          actions.resetForm();
      }}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <TextField name='username' type='text' placeholder='username'/>
          <TextField name='password' type='password' placeholder='password'/>
          <Button type="submit" width={['full']}>Login</Button>
        </form>
      ) }
    </Formik>
  );
};

export default SignIn;