import { useField, FastField } from "formik"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
  } from '@chakra-ui/react'

export const TextField = ({ label,withError,...props }) => {
    const [field, meta] = useField(props);
    
    return (
      <FormControl isInvalid={meta.error && meta.touched}>
        {
          label !== '' ? <FormLabel fontSize={'13px'} color={'blue.800'} fontWeight={'regular'}>{label}</FormLabel> : <></>
        }
       <FastField as={Input} {...field} {...props}/>
        {
          withError? <FormErrorMessage>{meta.error}</FormErrorMessage> : <></>
        }
      </FormControl>
    )
}