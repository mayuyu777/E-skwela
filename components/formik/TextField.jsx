import { useField, Field } from "formik"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
  } from '@chakra-ui/react'

export const TextField = ({ ...props }) => {
    const [field, meta] = useField(props);
    return (
        <FormControl isInvalid={meta.error!==null && meta.touched}>
        <Field as={Input} {...field} {...props}/>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    )
}