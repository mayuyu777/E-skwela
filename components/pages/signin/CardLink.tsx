import {
    Button, 
    Text,
    Box,
    Flex,
    Card,
    CardBody,
    Link,
    VStack,
  } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import FormLinkCard from '../../chakra/FormLinkCard';

export default function CardLink(){
    return(
        <Card 
            w={['20pc','20pc','28pc','30pc']} 
            minH={'18.5pc'}
            margin={'auto'}
            bg={['gray.700','gray.700','none','none']}
            gap={'1pc'}
            pb={'4pc'}
            p={['0.5pc','0.5pc','0pc','0pc']}
        >
            <FormLinkCard icon={FaUserAlt} href={'/StudentApplication'} title={'Applicants for Admission'} content={'Click here to apply as a new student.'}/>
            <FormLinkCard icon={FaUserAlt} href={'/StudentApplication'} title={'Applicants for Admission'} content={'Click here to apply as a new student.'}/>
            <FormLinkCard icon={FaUserAlt} href={'/StudentApplication'} title={'Applicants for Admission'} content={'Click here to apply as a new student.'}/>
            <FormLinkCard icon={FaUserAlt} href={'/StudentApplication'} title={'Applicants for Admission'} content={'Click here to apply as a new student.'}/>
        </Card>
    );
}