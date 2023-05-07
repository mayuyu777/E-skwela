import { Flex, HStack, Image, Text, VStack, Input, Select, Box, Grid } from '@chakra-ui/react';
import React from 'react';
import ShoolHeader from '@/components/pages/shoolheader';


export default function EnrollmentApplication() {
  return (
    <Grid 
      w={'100%'} 
      minH={'100vh'} 
      bg={['gray.800']}
      pb={'10pc'}
      pt={['3pc','3pc','4pc','4pc']}
      gap={'10'} 
    >
      <ShoolHeader/>
      <Box w={['95%','95%','80%','70%']} minH={'100vh'} bg={'white'} m={'auto'}>

      </Box>
    </Grid>
  );
}