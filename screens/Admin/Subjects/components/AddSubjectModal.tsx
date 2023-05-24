import { AdminInput } from "@/components/input/FormInput";
import { yearlevelString } from "@/constants/yearLevelString";
import { yearlevels } from "@/constants/yearLevels";
import SubjectInterface from "@/interfaces/SubjectInterface";
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
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

// const { Option } = Select;

export default function AddSubjectModal({
  setRefreshList,
  refreshList,
}: {
  setRefreshList: Dispatch<SetStateAction<boolean>>;
  refreshList: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subject, setSubject] = useState<SubjectInterface>({} as SubjectInterface);
  const [form] = Form.useForm();
  const toast = useToast();

  const onSubmit = () => {
    console.log(subject);
    axios
      .post("/api/admin/subject/createSubject", {
        subject: { ...subject, created_at: moment().format() },
      } as Partial<SubjectInterface>)
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
          setSubject({} as SubjectInterface);
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
      <Button onClick={onOpen}>Add Subject</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Form form={form} onFinish={onSubmit}>
              <Flex flexDirection="column">
                <AdminInput.Admin
                  label="Year Level"
                  formItemProps={{
                    name: "year_level",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "Year Level is Required",
                      },
                    ],
                    children: (
                      <>
                        <Select
                          placeholder="Select Year Level"
                          onChange={(e) => {
                            setSubject((prevState) => ({
                              ...prevState,
                              year_level: e.target.value,
                            }));
                          }}
                        >
                          {yearlevels.map((data, idx) => (
                            <option
                              value={yearlevelString[idx]}
                              key={data}
                            >{`Grade ${data}`}</option>
                          ))}
                        </Select>
                      </>
                    ),
                  }}
                />
                <AdminInput.Admin
                  label="Name"
                  formItemProps={{
                    name: "name",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "Name is Required",
                      },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setSubject((prevState) => ({
                        ...prevState,
                        name: e.target.value,
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
