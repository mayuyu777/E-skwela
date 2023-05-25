import { AdminInput } from "@/components/input/FormInput";
import { gender } from "@/constants/gender";
import { yearlevelString } from "@/constants/yearLevelString";
import { yearlevels } from "@/constants/yearLevels";
import SubjectInterface from "@/interfaces/SubjectInterface";
import TeacherInterface from "@/interfaces/TeacherInterface";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Spacer,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Form } from "antd";
import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiPlus, FiPlusCircle } from "react-icons/fi";

// const { Option } = Select;

export default function AddTeacherModal({
  setRefreshList,
  refreshList,
}: {
  setRefreshList: Dispatch<SetStateAction<boolean>>;
  refreshList: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teacher, setTeacher] = useState<TeacherInterface>({} as TeacherInterface);
  const [form] = Form.useForm();
  const toast = useToast();
  const { data: session } = useSession();

  const onSubmit = () => {
    axios
      .post("/api/admin/teacher/createTeacher", {
        teacher: {
          ...teacher,
          created_at: moment().format(),
          school_id: session?.user?.school_id,
        },
      } as Partial<TeacherInterface>)
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: "Success",
            description: "Subject Successfully created.",
            status: "success",
            duration: 5000,
            position: "top",
          });
          setRefreshList(!refreshList);
          setTeacher({} as TeacherInterface);
          form.resetFields();
          onClose();
        }
      });
  };

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen]);

  return (
    <>
      <Button rightIcon={<FiPlus />} onClick={onOpen}>
        Add Teacher
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Form form={form} onFinish={onSubmit}>
              <Flex flexDirection="column">
                <AdminInput.Admin
                  label="First Name"
                  formItemProps={{
                    name: "first_name",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "First Name is Required",
                      },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setTeacher((prevState) => ({
                        ...prevState,
                        first_name: e.target.value,
                      }));
                    },
                    style: { height: "2rem" },
                  }}
                />
                <AdminInput.Admin
                  label="Middle Name"
                  formItemProps={{
                    name: "middle_name",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "Middle Name is Required",
                      },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setTeacher((prevState) => ({
                        ...prevState,
                        middle_name: e.target.value,
                      }));
                    },
                    style: { height: "2rem" },
                  }}
                />
                <AdminInput.Admin
                  label="Last Name"
                  formItemProps={{
                    name: "last_name",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "Last Name is Required",
                      },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setTeacher((prevState) => ({
                        ...prevState,
                        last_name: e.target.value,
                      }));
                    },
                    style: { height: "2rem" },
                  }}
                />
                <AdminInput.Admin
                  label="Suffix"
                  formItemProps={{
                    name: "suffix",
                    initialValue: "",
                    rules: [],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setTeacher((prevState) => ({
                        ...prevState,
                        suffix: e.target.value,
                      }));
                    },
                    style: { height: "2rem" },
                  }}
                />

                <AdminInput.Admin
                  label="Gender"
                  formItemProps={{
                    name: "gender",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "Gender is Required",
                      },
                    ],
                    children: (
                      <>
                        <Select
                          placeholder="Select Gender"
                          onChange={(e) => {
                            setTeacher((prevState) => ({
                              ...prevState,
                              gender: e.target.value,
                            }));
                          }}
                        >
                          {gender.map((data) => (
                            <option value={data} key={data}>{`${data}`}</option>
                          ))}
                        </Select>
                      </>
                    ),
                  }}
                />

                <AdminInput.Admin
                  label="BirthDate"
                  formItemProps={{
                    name: "birthdate",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "BirthDate is Required",
                      },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setTeacher((prevState) => ({
                        ...prevState,
                        birthdate: moment(e.target.value).toISOString(),
                      }));
                    },
                    style: { height: "2rem" },
                    type: "date",
                  }}
                />

                <AdminInput.Admin
                  label="Age"
                  formItemProps={{
                    name: "age",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "Age is Required",
                      },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setTeacher((prevState) => ({
                        ...prevState,
                        age: Number(e.target.value),
                      }));
                    },
                    style: { height: "2rem" },
                    type: "number",
                    min: 1,
                  }}
                />
                <AdminInput.Admin
                  label="Contact No."
                  formItemProps={{
                    name: "contact_no",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "Contact No. is Required",
                      },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setTeacher((prevState) => ({
                        ...prevState,
                        contact_no: e.target.value,
                      }));
                    },
                    style: { height: "2rem" },
                  }}
                />
                <AdminInput.Admin
                  label="Marital Status"
                  formItemProps={{
                    name: "marital_status",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "Marital Status is Required",
                      },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setTeacher((prevState) => ({
                        ...prevState,
                        marital_status: e.target.value,
                      }));
                    },
                    style: { height: "2rem" },
                  }}
                />
                <AdminInput.Admin
                  label="Position"
                  formItemProps={{
                    name: "position",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "Position is Required",
                      },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setTeacher((prevState) => ({
                        ...prevState,
                        position: e.target.value,
                      }));
                    },
                    style: { height: "2rem" },
                  }}
                />

                <Flex gap="1rem">
                  <Spacer />
                  <Button colorScheme="green" type="submit">
                    Add
                  </Button>
                </Flex>
              </Flex>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
