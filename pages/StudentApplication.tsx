import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Formik, FastField } from "formik";
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
} from "@chakra-ui/react";
import React from "react";
import ShoolHeader from "@/components/pages/shoolheader";
import { TextField } from "../components/formik/TextField";
import { prisma } from "../prisma/client";
import SchoolYearInterface from "@/interfaces/SchoolYearInterface";
import { yearlevels } from "@/constants/yearLevels";
import {
  initValuesWithPermanentAddress,
  yupWithPermanentAddress,
  initValuesWithoutPermanentAddress,
  yupWithoutPermanentAddress,
} from "@/components/formik/application";
import { useRouter } from "next/router";
import ApplicationInterface from "@/interfaces/ApplicationInterface";
import { isFunctionTypeNode } from "typescript";
import ReviewForm from "@/components/pages/ReviewForm";
import { preventDefault } from "@fullcalendar/common";


function StudentApplication({
  schoolYears,
  setFormData,
  setIsReview,
  isReview,
  formData,
  isSameWithCurAddress,
  setIsSameWithCurAddress
}: {
  schoolYears: SchoolYearInterface[];
  setFormData: Dispatch<SetStateAction<ApplicationInterface>>;
  setIsReview: Dispatch<SetStateAction<boolean>>;
  isReview: boolean;
  formData: ApplicationInterface;
  isSameWithCurAddress: boolean;
  setIsSameWithCurAddress:Dispatch<SetStateAction<boolean>>;
}) {

  const router = useRouter();

  return (
    
      <Card w={["95%", "95%", "80%", "70%"]} minH={"100vh"} bg={"gray.50"} m={"auto"}>
        <Formik
          initialValues={
            formData
          }
          enableReinitialize
          validationSchema={
            !isSameWithCurAddress ? yupWithPermanentAddress : yupWithoutPermanentAddress
          }
          validateOnChange={false}
          onSubmit={(values) => {
            console.log("jigiugugi")
            setFormData(values);
            setIsReview(true);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <CardBody p={"0pc"} pb={"5pc"}>
                <Flex
                  minH={["3pc", "3pc", "3.5pc", "3.5pc"]}
                  bg={["blue.800"]}
                  alignItems={"center"}
                  w={"full"}
                  p={"1pc"}
                  borderTopRadius={"4px"}
                >
                  <Text
                    color={"white"}
                    fontSize={["14px", "16px", "17px", "17px"]}
                    fontWeight={"bold"}
                    letterSpacing={"1px"}
                  >
                    APPLICATION FORM
                  </Text>
                </Flex>
                <Flex
                  minH={["3pc", "3pc", "3.5pc", "3.5pc"]}
                  bg={["gray.200"]}
                  alignItems={"center"}
                  w={"full"}
                  p={"1pc"}
                >
                  <Text
                    m={"auto"}
                    color={"red.500"}
                    fontSize={["12px", "13px", "14px", "14px"]}
                    fontWeight={"medium"}
                  >
                    NOTE: Please fill-out the form carefully and honestly. Fields with * are required.
                  </Text>
                </Flex>
                <Grid
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(2, 1fr)",
                  ]}
                  gap={"3"}
                  pt={"2pc"}
                  pr={"2pc"}
                  pl={"2pc"}
                >
                  <TextField
                    label={"Please provide an email to where we can contact you."}
                    withError={true}
                    name="email"
                    type="email"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                </Grid>
                <Grid
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                    "repeat(4, 1fr)",
                  ]}
                  gap={"3"}
                  p={"2pc"}
                >
                  <FormControl
                    isInvalid={formik.errors.school_year !== "" && formik.touched.school_year}
                  >
                    <FormLabel fontSize={"13px"} color={"blue.800"} fontWeight={"regular"}>
                      1. School Year to enroll
                      <span style={{color:'red'}}> *</span>
                    </FormLabel>
                    <FastField
                      as={Select}
                      size={"sm"}
                      name="school_year"
                      backgroundColor={"white"}
                      placeholder=" "
                    >
                      {
                       schoolYears.length > 0 ? 
                       (schoolYears.map((item, index) => {
                        return (
                          <option key={item.id} value={String(item.start)}>
                            {item.start +
                              " - " +
                              (item?.start+1)}
                          </option>
                        );
                      })) : null}
                    </FastField>
                  </FormControl>
                  <FormControl
                    isInvalid={formik.errors.year_level !== "" && formik.touched.year_level}
                  >
                    <FormLabel fontSize={"13px"} color={"blue.800"} fontWeight={"regular"}>
                      2. Grade level
                      <span style={{color:'red'}}> *</span>
                    </FormLabel>
                    <FastField
                      as={Select}
                      size={"sm"}
                      name="year_level"
                      backgroundColor={"white"}
                      placeholder=" "
                    >
                      {yearlevels.map((item,index) => {
                        return (
                          <option key={index} value={item}>
                            {"Grade " + item}
                          </option>
                        );
                      })}
                    </FastField>
                  </FormControl>
                </Grid>
                <Flex w={"full"} pl={"2pc"} pr={"2pc"} flexDirection={"column"}>
                  <Text fontWeight={"bold"} fontSize={"14px"} color={"blue.900"}>
                    I. {`Learner's`} Information
                  </Text>
                  <Box w={"full"} borderBottomColor={"gray.200"} borderBottomWidth={"1px"}></Box>
                </Flex>
                <Grid
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                    "repeat(4, 1fr)",
                  ]}
                  gap={"3"}
                  pt={"1pc"}
                  pr={"2pc"}
                  pl={"2pc"}
                  pb={"2pc"}
                >
                  <TextField
                    label={"3. Last Name"}
                    withError={false}
                    name="lastname"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"4. First Name"}
                    withError={false}
                    name="firstname"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"5. Middle Name"}
                    withError={false}
                    name="middlename"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"6. Suffix e.g. Jr., III"}
                    withError={false}
                    name="suffix"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                  />
                  <TextField
                    label={"7. Birthdate"}
                    withError={false}
                    name="birthdate"
                    type="date"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"8. Age"}
                    withError={false}
                    name="age"
                    type="number"
                    min="11"
                    max="100"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <FormControl isInvalid={formik.errors.sex !== "" && formik.touched.sex}>
                    <FormLabel fontSize={"13px"} color={"blue.800"} fontWeight={"regular"}>
                      9. Gender
                      <span style={{color:'red'}}> *</span>
                    </FormLabel>
                    <FastField
                      as={Select}
                      size={"sm"}
                      name="sex"
                      backgroundColor={"white"}
                      placeholder=" "
                    >
                      <option value="1">Female</option>
                      <option value="0">Male</option>
                    </FastField>
                  </FormControl>
                  <TextField
                    label={"10. Place of Birth"}
                    withError={false}
                    name="birthplace"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"11. PSA Birth Certificate No."}
                    withError={false}
                    name="psa"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                  />
                  <TextField
                    label={"12. Learner Reference No."}
                    withError={false}
                    name="lrn"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                  />
                  <TextField
                    label={"13. Mother Tongue"}
                    withError={false}
                    name="mother_tongue"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"14. Indigenous People Community"}
                    withError={false}
                    name="ip"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                  />
                  <TextField
                    label={"15. 4Ps Household ID No."}
                    withError={false}
                    name="four_ps"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                  />
                </Grid>
                <Flex w={"full"} pl={"2pc"} pr={"2pc"} flexDirection={"column"}>
                  <Text fontWeight={"bold"} fontSize={"14px"} color={"blue.900"}>
                    II. Current Address
                  </Text>
                  <Box w={"full"} borderBottomColor={"gray.200"} borderBottomWidth={"1px"}></Box>
                </Flex>
                <Grid
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                    "repeat(4, 1fr)",
                  ]}
                  gap={"3"}
                  pt={"1pc"}
                  pr={"2pc"}
                  pl={"2pc"}
                  pb={"2pc"}
                >
                  <TextField
                    label={"16. House No./Street"}
                    withError={false}
                    name="house_no"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"17. Street Name"}
                    withError={false}
                    name="street"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"18. Barangay"}
                    withError={false}
                    name="barangay"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"19. Municipality/City"}
                    withError={false}
                    name="municipality"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"20. Province"}
                    withError={false}
                    name="province"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"21. Country"}
                    withError={false}
                    name="country"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"22. Zip Code"}
                    withError={false}
                    name="zip"
                    type="number"
                    max="9999"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                </Grid>
                <Flex w={"full"} pl={"2pc"} pr={"2pc"} pb={"1pc"} flexDirection={"column"}>
                  <Flex gap={"5"}>
                    <Text fontWeight={"bold"} fontSize={"14px"} color={"blue.900"}>
                      III. Permanent Address
                    </Text>
                    <Checkbox
                      size={"sm"}
                      color={"blue.700"}
                      isChecked={isSameWithCurAddress}
                      onChange={() => {
                        if(formData.house_no_2){
                          setFormData((prev)=>({...prev, 
                            house_no_2:"",
                            street_2:"", 
                            barangay_2:"", 
                            municipality_2:"", 
                            province_2:"",
                            country_2:"",
                            zip_2:""
                          }));
                        }
                        
                        setIsSameWithCurAddress(!isSameWithCurAddress);
                      }}
                    >
                      Same with Current Address?
                    </Checkbox>
                  </Flex>
                  <Box w={"full"} borderBottomColor={"gray.200"} borderBottomWidth={"1px"}></Box>
                </Flex>
                {!isSameWithCurAddress ? (
                  <Grid
                    templateColumns={[
                      "repeat(1, 1fr)",
                      "repeat(2, 1fr)",
                      "repeat(3, 1fr)",
                      "repeat(4, 1fr)",
                    ]}
                    gap={"3"}
                    pr={"2pc"}
                    pl={"2pc"}
                    pb={"2pc"}
                  >
                    <TextField
                      label={"23. House No./Street"}
                      withError={false}
                      name="house_no_2"
                      type="text"
                      bg={"white"}
                      size={"sm"}
                      required
                    />
                    <TextField
                      label={"24. Street Name"}
                      withError={false}
                      name="street_2"
                      type="text"
                      bg={"white"}
                      size={"sm"}
                      required
                    />
                    <TextField
                      label={"25. Barangay"}
                      withError={false}
                      name="barangay_2"
                      type="text"
                      bg={"white"}
                      size={"sm"}
                      required
                    />
                    <TextField
                      label={"26. Municipality/City"}
                      withError={false}
                      name="municipality_2"
                      type="text"
                      bg={"white"}
                      size={"sm"}
                      required
                    />
                    <TextField
                      label={"27. Province"}
                      withError={false}
                      name="province_2"
                      type="text"
                      bg={"white"}
                      size={"sm"}
                      required
                    />
                    <TextField
                      label={"28. Country"}
                      withError={false}
                      name="country_2"
                      type="text"
                      bg={"white"}
                      size={"sm"}
                      required
                    />
                    <TextField
                      label={"29. Zip Code"}
                      withError={false}
                      name="zip_2"
                      type="number"
                      max="9999"
                      bg={"white"}
                      size={"sm"}
                      required
                    />
                  </Grid>
                ) : (
                  <></>
                )}
                <Flex w={"full"} pl={"2pc"} pr={"2pc"} flexDirection={"column"}>
                  <Text fontWeight={"bold"} fontSize={"14px"} color={"blue.900"}>
                    IV. {`Parent's`}/Guardians Information
                  </Text>
                  <Box w={"full"} borderBottomColor={"gray.200"} borderBottomWidth={"1px"}></Box>
                </Flex>
                <Grid
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                    "repeat(4, 1fr)",
                  ]}
                  gap={"3"}
                  pt={"1pc"}
                  pr={"2pc"}
                  pl={"2pc"}
                  pb={"2pc"}
                >
                  <TextField
                    label={"30. First name of mother"}
                    withError={false}
                    name="first_mother"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"31. Middle name of mother"}
                    withError={false}
                    name="middle_mother"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"32. Last name of mother"}
                    withError={false}
                    name="last_mother"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"33. Mother Contact No."}
                    withError={true}
                    name="contact_mother"
                    type="number"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"34. First name of father"}
                    withError={false}
                    name="first_father"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"35. Middle name of father"}
                    withError={false}
                    name="middle_father"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"36. Last name of father"}
                    withError={false}
                    name="last_father"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"37. Father Contact No."}
                    withError={true}
                    name="contact_father"
                    type="number"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"38. First name of guardian"}
                    withError={false}
                    name="first_guardian"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"39. Middle name of guardian"}
                    withError={false}
                    name="middle_guardian"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"40. Last name of guardian"}
                    withError={false}
                    name="last_guardian"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"41. Guardian Contact No."}
                    withError={true}
                    name="contact_guardian"
                    type="number"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                </Grid>
                <Flex w={"full"} pl={"2pc"} pr={"2pc"} flexDirection={"column"}>
                  <Text fontWeight={"bold"} fontSize={"14px"} color={"blue.900"}>
                    V. For Returning Learner and those who will transfer/move In
                  </Text>
                  <Box w={"full"} borderBottomColor={"gray.200"} borderBottomWidth={"1px"}></Box>
                </Flex>
                <Grid
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                    "repeat(4, 1fr)",
                  ]}
                  gap={"3"}
                  pt={"1pc"}
                  pr={"2pc"}
                  pl={"2pc"}
                  pb={"2pc"}
                >
                  <TextField
                    label={"42. Last Grade Level Completed (numeric)"}
                    withError={false}
                    name="last_grade"
                    type="number"
                    min="6"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"43. School Year Completed e.g 2017-2018"}
                    withError={false}
                    name="last_school_year"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"44. Last School Attented"}
                    withError={false}
                    name="last_school"
                    type="text"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                  <TextField
                    label={"45. School ID"}
                    withError={false}
                    name="school_id"
                    type="number"
                    bg={"white"}
                    size={"sm"}
                    required
                  />
                </Grid>
                <Grid
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(2, 1fr)",
                  ]}
                  p={"2pc"}
                  gap={"4"}
                >
                  <Button type="submit" backgroundColor={"blue.600"} color={"white"}>
                    Next
                  </Button>
                  <Button
                    type="button"
                    color={"gray.500"}
                    onClick={() => {
                      router.push("/SignIn");
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </CardBody>
            </form>
          )}
        </Formik>
      </Card>
  );
}

export default function Main({
  schoolYears,
}: {
  schoolYears: SchoolYearInterface[];
}){
  const [formData, setFormData] = useState<ApplicationInterface>({} as ApplicationInterface);
  const [isReview, setIsReview] = useState(false);
  const [isSameWithCurAddress, setIsSameWithCurAddress] = useState(false);
  const router = useRouter();


  return(
    <Grid
      w={"100%"}
      minH={"150vh"}
      bg={["gray.800"]}
      pb={"10pc"}
      pt={["3pc", "3pc", "4pc", "4pc"]}
      gap={["12", "12", "20", "20"]}
    >
      <ShoolHeader color={"whiteAlpha.900"} />
      {isReview? 
        <ReviewForm formData={formData} setIsReview={setIsReview} isReview={isReview} isSameWithCurAddress={isSameWithCurAddress}/> 
        : 
        <StudentApplication 
          schoolYears={schoolYears} 
          setFormData={setFormData} 
          setIsReview={setIsReview} 
          isReview={isReview} 
          formData={formData}
          isSameWithCurAddress={isSameWithCurAddress}
          setIsSameWithCurAddress={setIsSameWithCurAddress}
          />}
    </Grid>
  )
}

export const getServerSideProps = async () => {
  const result = await prisma.school_year.findMany();
  return {
    props: { schoolYears: JSON.parse(JSON.stringify(result)) },
  };
};
