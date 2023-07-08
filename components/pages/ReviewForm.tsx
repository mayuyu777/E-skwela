import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Flex,
  Text,
  Select,
  Box,
  Grid,
  Card,
  CardBody,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  border,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import ApplicationInterface from "@/interfaces/ApplicationInterface";
import { gender } from "@/constants/gender";
import { useRouter } from "next/router";
import axios from "axios";

export default function ReviewForm({formData, setIsReview, isReview, isSameWithCurAddress}:{formData: ApplicationInterface; setIsReview: Dispatch<SetStateAction<boolean>>; isReview: boolean; isSameWithCurAddress: boolean;}){
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();


  async function submitApplication() {
    setLoading(true);
    const res = await fetch("/api/createStudentApplication", {
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((res) => {
      return res.json();
    });
    console.log(res);
    if (res?.ok) {
      toast({
        title: "Success",
        description: res.message,
        status: "success",
        duration: 25000,
        position: "top",
      });
      const name = formData.firstname+" "+formData.lastname;
      const subject = "Application for Admission";
      const email = formData.email;
      const content = `Good day, ${name}!\n\nYou have successfully applied for admission at Buyong Highschool.`;
      axios
      .post("/api/sendEmail", { name, subject, email, content })
      .then((res) => {
        console.log(res);
      });
      router.push('/SignIn');
    } else {
      toast({
        title: "Error",
        description: res.message,
        status: "error",
        duration: 5000,
        position: "top",
      });
    }
    setLoading(false);
  }

  return(
    <Card w={["95%", "80%", "70%", "60%"]} p={"1pc"} minH={"100vh"} bg={"gray.50"} m={"auto"}>
      <Flex
        minH={["3pc", "3pc", "3.5pc", "3.5pc"]}
        bg={["blue.600"]}
        w={"full"}
        p={"1pc"}
        flexDirection={"column"}
      >
        <Text
          color={"white"}
          fontSize={["14px", "16px", "17px", "17px"]}
          fontWeight={"bold"}
          letterSpacing={"1px"}
          textTransform={"uppercase"}
          align={"center"}
        >
          Application Information
        </Text>
      </Flex>
      <Text color={"red"} mt={"1pc"} fontSize={'12px'} align={'center'} fontWeight={"medium"}>***Please review your application before submitting. Thank you.***</Text>
      <Flex pl={"1pc"} w={"full"} flexDirection={'column'}>
          <TableContainer>
            <Table size={"sm"}>
              <TableCaption p={"0"}  placement="top" textAlign={"left"} fontSize={"17px"} borderBottomWidth={"3px"}>{"Learner's Information"}</TableCaption>
              <Thead>
                <Tr>
                  <Th w={"13pc"}></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>Name:</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.firstname} {formData.middlename} {formData.lastname} {formData.suffix? formData.suffix:null}</Td>
                </Tr>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>Email:</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.email}</Td>
                </Tr>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>Birthdate:</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.birthdate}</Td>
                </Tr>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>Age:</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.age}</Td>
                </Tr>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>Gender:</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{gender[formData.sex]}</Td>
                </Tr>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>Place of birth:</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.birthplace}</Td>
                </Tr>
                <Tr  whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>Mother Tongue:</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.mother_tongue}</Td>
                </Tr>
                {
                  formData.psa? 
                  (
                  <Tr whiteSpace={"break-spaces"}>
                    <Td p={"3px"} fontWeight={"medium"}>PSA Birth Certificate No:</Td>
                    <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.mother_tongue}</Td>
                  </Tr>
                  ) : null
                }
                {
                  formData.lrn? 
                  (
                  <Tr whiteSpace={"break-spaces"}>
                    <Td p={"3px"} fontWeight={"medium"}>LRN:</Td>
                    <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.lrn}</Td>
                  </Tr>
                  ) : null
                }
                {
                  formData.ip? 
                  (
                  <Tr whiteSpace={"break-spaces"}>
                    <Td p={"3px"} fontWeight={"medium"}>Indigenous Peoples Community:</Td>
                    <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.ip}</Td>
                  </Tr>
                  ) : null
                }
                {
                  formData.four_ps? 
                  (
                  <Tr whiteSpace={"break-spaces"}>
                    <Td p={"3px"} fontWeight={"medium"}>4Ps Household ID Number:</Td>
                    <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.four_ps}</Td>
                  </Tr>
                  ) : null
                }
              </Tbody>
            </Table>
          </TableContainer>  
          <TableContainer>
            <Table size={"sm"}>
              <TableCaption p={"0"} placement="top" textAlign={"left"} fontSize={"17px"} borderBottomWidth={"3px"}>Address</TableCaption>
              <Thead>
                <Tr>
                  <Th w={"13pc"}></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>Current{isSameWithCurAddress? " & Permanent " : null} Address</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>
                    {formData.house_no} {formData.street} {formData.barangay} {formData.municipality} {formData.province} {formData.country} {formData.zip}
                  </Td>
                </Tr>
                {
                  formData.house_no_2? 
                  (
                  <Tr whiteSpace={"break-spaces"}>
                    <Td p={"3px"} fontWeight={"medium"}>Permanent Address:</Td>
                    <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>
                      {formData.house_no_2} {formData.street_2} {formData.barangay_2} {formData.municipality_2} {formData.province_2} {formData.country_2} {formData.zip_2}
                    </Td>
                  </Tr>
                  ) : null
                }
              </Tbody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table size={"sm"}>
              <TableCaption p={"0"} placement="top" textAlign={"left"} fontSize={"17px"} borderBottomWidth={"3px"}>{"Parent's/Guardian's Information"}</TableCaption>
              <Thead>
                <Tr>
                  <Th w={"13pc"}></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>{"Mother's Name:"}</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.first_mother+" "+formData.middle_mother+" "+formData.last_mother}</Td>
                </Tr>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>{"Father's Name:"}</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.first_father+" "+formData.middle_father+" "+formData.last_father}</Td>
                </Tr>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>{"Guardian's Name:"}</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.first_guardian+" "+formData.middle_guardian+" "+formData.last_guardian}</Td>
                </Tr>
                {
                  formData.contact_mother? 
                  (
                  <Tr whiteSpace={"break-spaces"}>
                    <Td p={"3px"} fontWeight={"medium"}>{"Mother's Contact No:"}</Td>
                    <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{"0"}{formData.contact_mother}</Td>
                  </Tr>
                  ) : null
                }
                {
                  formData.contact_father? 
                  (
                  <Tr whiteSpace={"break-spaces"}>
                    <Td p={"3px"} fontWeight={"medium"}>{"Father's Contact No:"}</Td>
                    <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{"0"}{formData.contact_father}</Td>
                  </Tr>
                  ) : null
                }
                {
                  formData.contact_guardian? 
                  (
                  <Tr whiteSpace={"break-spaces"}>
                    <Td p={"3px"} fontWeight={"medium"}>{"Guardian's Contact No:"}</Td>
                    <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{"0"}{formData.contact_guardian}</Td>
                  </Tr>
                  ) : null
                }
              </Tbody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table size={"sm"}>
              <TableCaption p={"0"} placement="top" textAlign={"left"} fontSize={"17px"} borderBottomWidth={"3px"}>Last School Information</TableCaption>
              <Thead>
                <Tr>
                  <Th w={"13pc"}></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>Last School Attended:</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.last_school}</Td>
                </Tr>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>Last School Year Completed:</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.last_school_year}</Td>
                </Tr>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>Last Grade Level Completed:</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.last_grade}</Td>
                </Tr>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>School ID:</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.school_id}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table size={"sm"}>
              <TableCaption p={"0"} placement="top" textAlign={"left"} fontSize={"17px"} borderBottomWidth={"3px"}>Enrollment</TableCaption>
              <Thead>
                <Tr>
                  <Th w={"13pc"}></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>School Year:</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.school_year+" - "+(parseInt(formData.school_year)+1)}</Td>
                </Tr>
                <Tr whiteSpace={"break-spaces"}>
                  <Td p={"3px"} fontWeight={"medium"}>Grade Level to Enroll:</Td>
                  <Td p={"3px"} fontWeight={"bold"} textTransform={"uppercase"} color={"blue.400"}>{formData.year_level}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>           
      </Flex>
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
        ]}
        p={"2pc"}
        gap={"4"}
        mt={"5pc"}
      >
        <Button 
          backgroundColor={"blue.600"} 
          color={"white"}
          onClick={submitApplication}
          >
          Submit {loading && <Spinner ml="1rem" />}
        </Button>
        <Button
          type="button"
          color={"gray.500"}
          onClick={()=>setIsReview(false)}
        >
          Go Back
        </Button>
      </Grid>
    </Card>
  )
}

