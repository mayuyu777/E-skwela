import { Text, Button, Input, Flex, Link, HStack, VStack,Image,Icon} from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';

export default function FormLinkCard({href,title,content}){
    return (
        
        <Link w='100%' minH={['6pc','7pc']} borderRadius='3px' bg='gray.400' href={href}>
            <HStack w={['100%']} p={['0.5pc']} pt={['1pc']} gap={['5']}>
                <Icon as={FaUserAlt} fontSize={['2.5pc','3pc','3.5pc','3.5pc']}/>
                <VStack alignItems={'left'}>
                    <Text fontSize={['16px','17px','20px','22px']} fontWeight='semibold'>{title}</Text>
                    <Text fontSize={['12px','13px','13px','13px']} fontWeight='light'>{content}</Text>
                </VStack>
            </HStack>
        </Link>
    )
}