import {
    Grid,
    GridItem,
    Box,
    Flex,
    Image,
    VStack,
    Text
  } from '@chakra-ui/react';
  
export default function ShoolHeader({color}){
    return(
        <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection={['column','column','row','row']}
        >
            <Image
            mr={['0','0','1pc','1pc']}
            w={['7pc']}
            src="https://i.ibb.co/jZRx5kv/gege.png"
            alt=""
            />
            <VStack 
                alignItems='center' 
                spacing={0}
            >
                <Text 
                fontSize={['20px','27px','33px','33px']} 
                letterSpacing='2px' 
                fontWeight='bold'
                color={color}
                >
                Buyong National High School
                </Text>
                <Text 
                fontSize={['17px','21px','22px','22px']} 
                letterSpacing='1px' 
                fontWeight='light'
                color={color}
                >
                Buyong, Lapu-lapu City, Cebu
                </Text>
            </VStack>
        </Flex>
    );
}