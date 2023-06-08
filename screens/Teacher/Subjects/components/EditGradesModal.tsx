import { AdminInput } from "@/components/input/FormInput";
import { yearlevelString } from "@/constants/yearLevelString";
import { yearlevels } from "@/constants/yearLevels";
import GradesInterface from "@/interfaces/GradesInterface";
import StudentInterface from "@/interfaces/StudentInterface";
import SubjectAssignmentInterface from "@/interfaces/ClassSubjectInterface";
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
import { FiPlus, FiPlusCircle } from "react-icons/fi";

interface SubjectAssignmentWithSubject extends SubjectAssignmentInterface {
  subjects: SubjectInterface;
}

interface GradesWithStudent extends GradesInterface {
  students?: StudentInterface;
  average?: number;
  subject_assignment?: SubjectAssignmentWithSubject;
}

export default function EditGradesModal({
  setRefreshList,
  refreshList,
  grades,
}: {
  setRefreshList: Dispatch<SetStateAction<boolean>>;
  refreshList: boolean;
  grades: GradesWithStudent;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gradesData, setGradesData] = useState<GradesWithStudent>({} as GradesWithStudent);
  const [form] = Form.useForm();
  const toast = useToast();

  const onSubmit = () => {
    delete gradesData.average;
    delete gradesData?.subject_assignment;
    delete gradesData?.students;

    axios
      .post("/api/teacher/editGrades", {
        grades: { ...gradesData, created_at: moment().format() },
        grades_id: grades.grade_id,
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
          setGradesData({} as GradesWithStudent);
          form.resetFields();
          onClose();
        }
      });
  };

  useEffect(() => {
    if (grades.grade_id) {
      setGradesData(grades);
      form.setFieldsValue({
        first_grading: grades.first_grading,
        second_grading: grades.second_grading,
        third_grading: grades.third_grading,
        fourth_grading: grades.fourth_grading,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen]);

  return (
    <>
      <Button rightIcon={<FiPlus />} onClick={onOpen}>
        Edit
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
                  label="First Grading"
                  formItemProps={{
                    name: "first_grading",
                    initialValue: "",
                    rules: [
                      //   {
                      //     type: "number",
                      //     message: "Grades must be a number",
                      //   },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setGradesData((prevState) => ({
                        ...prevState,
                        first_grading: Number(e.target.value),
                      }));
                    },
                    style: { height: "2rem" },
                  }}
                />
                <AdminInput.Admin
                  label="Second Grading"
                  formItemProps={{
                    name: "second_grading",
                    initialValue: "",
                    rules: [
                      //   {
                      //     type: "number",
                      //     message: "Grades must be a number",
                      //   },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setGradesData((prevState) => ({
                        ...prevState,
                        second_grading: Number(e.target.value),
                      }));
                    },
                    style: { height: "2rem" },
                  }}
                />
                <AdminInput.Admin
                  label="Third Grading"
                  formItemProps={{
                    name: "third_grading",
                    initialValue: "",
                    rules: [
                      //   {
                      //     type: "number",
                      //     message: "Grades must be a number",
                      //   },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setGradesData((prevState) => ({
                        ...prevState,
                        third_grading: Number(e.target.value),
                      }));
                    },
                    style: { height: "2rem" },
                  }}
                />
                <AdminInput.Admin
                  label="Fourth Grading"
                  formItemProps={{
                    name: "fourth_grading",
                    initialValue: "",
                    rules: [
                      //   {
                      //     type: "number",
                      //     message: "Grades must be a number",
                      //   },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setGradesData((prevState) => ({
                        ...prevState,
                        fourth_grading: Number(e.target.value),
                      }));
                    },
                    style: { height: "2rem" },
                  }}
                />
                <Flex gap="1rem">
                  <Spacer />
                  <Button colorScheme="blue" type="submit">
                    EDIT
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
