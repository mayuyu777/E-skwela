import { gender } from '@/constants/gender';
import StudentInterface from '@/interfaces/StudentInterface';
import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Flex,
    Image,
    Text,
    TableContainer,
    Table,
    Tbody,
    Td,
    Tr
} from '@chakra-ui/react'

export default function StudentInformationModal(props: {isOpen: boolean, onClose: VoidFunction, student: StudentInterface}){

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Student Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex justifyContent={"center"} alignItems={"center"} p={"1pc"} flexDirection={'column'} gap={"2rem"}>
                    <Image 
                        display={['none','inline-block','inline-block','inline-block']} 
                        mr="1vw" 
                        w={"5pc"}
                        src="/profile_images/user.png" 
                        alt="announcement-author" 
                        borderRadius="10pc"
                        objectFit={"cover"}/>
                        <TableContainer>
                            <Table variant={"simple"} size={"sm"}>
                                <Tbody>
                                    <Tr>
                                        <Td fontWeight={"medium"}>School ID:</Td>
                                        <Td>{props.student.school_id}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td fontWeight={"medium"}>Full Name:</Td>
                                        <Td>{props.student.first_name + " " + props.student.middle_name + " " + 
                                            props.student.last_name + (props.student.suffix? props.student.suffix : "")}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td fontWeight={"medium"}>Email:</Td>
                                        <Td>{props.student.email}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td fontWeight={"medium"}>Gender:</Td>
                                        <Td>{gender[props.student.gender]}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td fontWeight={"medium"}>Age:</Td>
                                        <Td>{props.student.age}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td fontWeight={"medium"}>Grade Level:</Td>
                                        <Td>{props.student.academic_level}</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                </Flex>
            </ModalBody>
        </ModalContent>
        </Modal>
    );
        
}