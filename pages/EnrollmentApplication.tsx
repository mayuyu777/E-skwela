import { useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Flex, HStack, Image, Text, VStack, Input, Select, Box, Grid, GridItem, Card, CardBody, Button } from '@chakra-ui/react';
import React from 'react';
import ShoolHeader from '@/components/pages/shoolheader';
import { TextField } from '../components/formik/TextField';


export default function EnrollmentApplication() {
  const [error, setError] = useState('');

  return (
    <Grid 
      w={'100%'} 
      minH={'150vh'} 
      bg={['gray.800']}
      pb={'10pc'}
      pt={['3pc','3pc','4pc','4pc']}
      gap={['12','12','20','20']} 
    >
      <ShoolHeader color={'whiteAlpha.900'}/>
      <Card w={['95%','95%','80%','70%']} minH={'100vh'} bg={'gray.50'} m={'auto'}>
        <Formik
          initialValues={{ 
            school_year: '', 
            year_level: '',
            lastname: '', 
            firstname: '',
            middlename: '', 
            suffix: '',
            birthdate: '', 
            age: '',
            sex: '', 
            birthplace: '',
            psa: '', 
            lrn: '',
            mother_tongue: '', 
            ip: '',
            four_ps: '',
            house_no: '',
            street: '',
            barangay: '',
            municipality: '',
            province: '',
            country: '',
            zip: '',
            house_no_2: '',
            street_2: '',
            barangay_2: '',
            municipality_2: '',
            province_2: '',
            country_2: '',
            zip_2: '',
            first_mother: '',
            middle_mother: '',
            last_mother: '',
            first_father: '',
            middle_father: '',
            last_father: '',
            first_guardian: '',
            middle_guardian: '',
            last_guardian: '',
            last_grade: '',
            last_school_year: '',
            last_school: '',
            school_id: ''
          }}
          validationSchema={Yup.object({
            school_year: Yup.string().required(' '), 
            year_level: Yup.string().required(' '),
            lastname: Yup.string().required(' '), 
            firstname: Yup.string().required(' '),
            middlename: Yup.string().required(' '), 
            suffix: Yup.string().required(' '),
            birthdate: Yup.string().required(' '), 
            age: Yup.string().required(' '),
            sex: Yup.string().required(' '), 
            birthplace: Yup.string().required(' '),
            psa: Yup.string().required(' '), 
            lrn: Yup.string().required(' '),
            mother_tongue: Yup.string().required(' '), 
            ip: Yup.string().required(' '),
            four_ps: Yup.string().required(' '),
            house_no: Yup.string().required(' '),
            street: Yup.string().required(' '),
            barangay: Yup.string().required(' '),
            municipality: Yup.string().required(' '),
            province: Yup.string().required(' '),
            country: Yup.string().required(' '),
            zip: Yup.string().required(' '),
            house_no_2: Yup.string().required(' '),
            street_2: Yup.string().required(' '),
            barangay_2: Yup.string().required(' '),
            municipality_2: Yup.string().required(' '),
            province_2: Yup.string().required(' '),
            country_2: Yup.string().required(' '),
            zip_2: Yup.string().required(' '),
            first_mother: Yup.string().required(' '),
            middle_mother: Yup.string().required(' '),
            last_mother: Yup.string().required(' '),
            first_father: Yup.string().required(' '),
            middle_father: Yup.string().required(' '),
            last_father: Yup.string().required(' '),
            first_guardian: Yup.string().required(' '),
            middle_guardian: Yup.string().required(' '),
            last_guardian: Yup.string().required(''),
            last_grade: Yup.string().required(' '),
            last_school_year: Yup.string().required(' '),
            last_school: Yup.string().required(' '),
            school_id: Yup.string().required(' ')
          })}
          onSubmit={ async (values, actions ) => {
              console.log(values);
              actions.resetForm();
          }}
          >
          {formik => (
              <form onSubmit={formik.handleSubmit}>
                <CardBody p={'0pc'} pb={'5pc'}>
                  <Flex minH={['3pc','3pc','3.5pc','3.5pc']} bg={['blue.800']} alignItems={'center'} w={'full'} p={'1pc'} borderTopRadius={'4px'}>
                      <Text color={'white'} fontSize={['14px','16px','17px','17px']} fontWeight={'bold'} letterSpacing={'1px'}>APPLICATION FORM</Text>
                  </Flex>
                  <Flex minH={['3pc','3pc','3.5pc','3.5pc']} bg={['gray.200']} alignItems={'center'} w={'full'} p={'1pc'}>
                      <Text m={'auto'} color={'red.500'} fontSize={['12px','13px','14px','14px']} fontWeight={'medium'}>NOTE: All fields should be filled thus write "N/A" if it does not apply.</Text>
                  </Flex>
                  <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)']} gap={'3'} p={'2pc'}>
                    <TextField label={'1. School Year to enroll'} withError={false} name='school_year' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'2. Grade level'} withError={false} name='year_level' type='text' bg={'white'} size={'sm'}/>
                  </Grid>
                  <Flex w={'full'} pl={'2pc'} pr={'2pc'} flexDirection={'column'}>
                    <Text fontWeight={'bold'} fontSize={'14px'} color={'blue.900'}>I. Learner's Information</Text>
                    <Box w={'full'} borderBottomColor={'gray.200'} borderBottomWidth={'1px'}></Box>
                  </Flex>
                  <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)']} gap={'3'} pt={'1pc'} pr={'2pc'} pl={'2pc'} pb={'2pc'}>
                    <TextField label={'3. Last Name'} withError={false} name='lastname' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'4. First Name'} withError={false} name='firstname' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'5. Middle Name'} withError={false} name='middlename' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'6. Suffix e.g. Jr., III'} withError={false} name='suffix' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'7. Birthdate (mm/dd/yyyy)'} withError={false} name='birthdate' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'8. Age'} withError={false} name='age' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'9. Sex'} withError={false} name='sex' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'10. Place of Birth'} withError={false} name='birthplace' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'11. PSA Birth Certificate No.'} withError={false} name='psa' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'12. Learner Reference No.'} withError={false} name='lrn' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'13. Mother Tongue'} withError={false} name='mother_tongue' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'14. Indigenous People Community'} withError={false} name='ip' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'15. 4Ps Household ID No.'} withError={false} name='four_ps' type='text' bg={'white'} size={'sm'}/>
                  </Grid>
                  <Flex w={'full'} pl={'2pc'} pr={'2pc'} flexDirection={'column'}>
                    <Text fontWeight={'bold'} fontSize={'14px'} color={'blue.900'}>II. Current Address</Text>
                    <Box w={'full'} borderBottomColor={'gray.200'} borderBottomWidth={'1px'}></Box>
                  </Flex>
                  <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)']} gap={'3'} pt={'1pc'} pr={'2pc'} pl={'2pc'} pb={'2pc'}>
                    <TextField label={'16. House No./Street'} withError={false} name='house_no' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'17. Street Name'} withError={false} name='street' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'18. Barangay'} withError={false} name='barangay' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'19. Municipality/City'} withError={false} name='municipality' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'20. Province'} withError={false} name='province' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'21. Country'} withError={false} name='country' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'22. Zip Code'} withError={false} name='zip' type='text' bg={'white'} size={'sm'}/>
                  </Grid>
                  <Flex w={'full'} pl={'2pc'} pr={'2pc'} flexDirection={'column'}>
                    <Text fontWeight={'bold'} fontSize={'14px'} color={'blue.900'}>III. Permanent Address</Text>
                    <Box w={'full'} borderBottomColor={'gray.200'} borderBottomWidth={'1px'}></Box>
                  </Flex>
                  <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)']} gap={'3'} pt={'1pc'} pr={'2pc'} pl={'2pc'} pb={'2pc'}>
                  <TextField label={'23. House No./Street'} withError={false} name='house_no_2' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'24. Street Name'} withError={false} name='street_2' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'25. Barangay'} withError={false} name='barangay_2' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'26. Municipality/City'} withError={false} name='municipality_2' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'27. Province'} withError={false} name='province_2' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'28. Country'} withError={false} name='country_2' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'29. Zip Code'} withError={false} name='zip_2' type='text' bg={'white'} size={'sm'}/>
                  </Grid>
                  <Flex w={'full'} pl={'2pc'} pr={'2pc'} flexDirection={'column'}>
                    <Text fontWeight={'bold'} fontSize={'14px'} color={'blue.900'}>IV. Parent's/Guardians Information</Text>
                    <Box w={'full'} borderBottomColor={'gray.200'} borderBottomWidth={'1px'}></Box>
                  </Flex>
                  <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)']} gap={'3'} pt={'1pc'} pr={'2pc'} pl={'2pc'} pb={'2pc'}>
                    <TextField label={'30. First name of mother'} withError={false} name='first_mother' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'31. Middle name of mother'} withError={false} name='middle_mother' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'32. Last name of mother'} withError={false} name='last_mother' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'33. First name of father'} withError={false} name='first_father' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'34. Middle name of father'} withError={false} name='middle_father' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'35. Last name of father'} withError={false} name='last_father' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'36. First name of guardian'} withError={false} name='first_guardian' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'37. Middle name of guardian'} withError={false} name='middle_guardian' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'38. Last name of guardian'} withError={false} name='last_guardian' type='text' bg={'white'} size={'sm'}/>
                  </Grid>
                  <Flex w={'full'} pl={'2pc'} pr={'2pc'} flexDirection={'column'}>
                    <Text fontWeight={'bold'} fontSize={'14px'} color={'blue.900'}>V. For Returning Learner and those who will transfer/move In</Text>
                    <Box w={'full'} borderBottomColor={'gray.200'} borderBottomWidth={'1px'}></Box>
                  </Flex>
                  <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)']} gap={'3'} pt={'1pc'} pr={'2pc'} pl={'2pc'} pb={'2pc'}>
                    <TextField label={'39. Last Grade Level Completed'} withError={false} name='last_grade' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'40. Last School Year Completed'} withError={false} name='last_school_year' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'41. Last School Attented'} withError={false} name='last_school' type='text' bg={'white'} size={'sm'}/>
                    <TextField label={'42. School ID'} withError={false} name='school_id' type='text' bg={'white'} size={'sm'}/>
                  </Grid>
                  <Grid templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(2, 1fr)','repeat(2, 1fr)']} p={'2pc'} gap={'4'}>
                    <Button type="submit" backgroundColor={'blue.600'} color={'white'}>Submit</Button>
                    <Button type="button" color={'gray.500'}>Cancel</Button>
                  </Grid>
                </CardBody>
              </form>
          )}
        </Formik>
      </Card>
    </Grid>
  );
}