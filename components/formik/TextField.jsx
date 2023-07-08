import { useField, FastField } from "formik"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Text
  } from '@chakra-ui/react'

export const TextField = ({ label,withError,...props }) => {
    const [field, meta] = useField(props);
    
    return (
      <FormControl isInvalid={meta.error && meta.touched}>
        {
          label !== '' ? <FormLabel fontSize={'13px'} color={'blue.800'} fontWeight={'regular'}>{label}{props.required? <span style={{color:'red'}}> *</span> : null}</FormLabel> : <></>
        }
       <FastField as={Input} {...field} {...props}/>
        {
          withError? <FormErrorMessage fontSize={'12px'}>{meta.error}</FormErrorMessage> : <></>
        }
      </FormControl>
    )
}