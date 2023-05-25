import { AdminInput } from "@/components/input/FormInput";
import { announcement_type } from "@/constants/announcement_type";
import { yearlevelString } from "@/constants/yearLevelString";
import { yearlevels } from "@/constants/yearLevels";
import AnnouncementInterface from "@/interfaces/AnnouncementsInterface";
import SectionInterface from "@/interfaces/SectionInterface";
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
import { getSession, useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

// const { Option } = Select;

export default function AddAnnouncementModal({
  setRefreshList,
  refreshList,
}: {
  setRefreshList: Dispatch<SetStateAction<boolean>>;
  refreshList: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [announcement, setAnnouncement] = useState<AnnouncementInterface>(
    {} as AnnouncementInterface
  );
  const [form] = Form.useForm();
  const toast = useToast();
  const { data: session } = useSession();

  const onSubmit = async () => {
    const userSession = await session;
    axios
      .post("/api/admin/announcement/createAnnouncement", {
        announcement: {
          ...announcement,
          created_at: moment().format(),
          created_by: userSession?.user?.school_id,
        },
      } as Partial<SectionInterface>)
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: "Success",
            description: "Section Successfully created.",
            status: "success",
            duration: 5000,
            position: "top",
          });
          setRefreshList(!refreshList);
          setAnnouncement({} as AnnouncementInterface);
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
        Add Announcement
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
                  label="Ttile"
                  formItemProps={{
                    name: "title",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "title is Required",
                      },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setAnnouncement((prevState) => ({
                        ...prevState,
                        title: e.target.value,
                      }));
                    },
                    style: { height: "2.5rem" },
                  }}
                />
                <AdminInput.Admin
                  label="Content"
                  formItemProps={{
                    name: "content",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "Content is Required",
                      },
                    ],
                  }}
                  inputProps={{
                    onChange: (e) => {
                      setAnnouncement((prevState) => ({
                        ...prevState,
                        content: e.target.value,
                      }));
                    },
                    style: { height: "2.5rem" },
                  }}
                />
                <AdminInput.Admin
                  label="Type"
                  formItemProps={{
                    name: "type",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "Type is Required",
                      },
                    ],
                    children: (
                      <>
                        <Select
                          placeholder="Select Announcement Type"
                          onChange={(e) => {
                            setAnnouncement((prevState) => ({
                              ...prevState,
                              type: e.target.value,
                            }));
                          }}
                        >
                          {announcement_type.map((data, idx) => (
                            <option value={data} key={data}>{`${data}`}</option>
                          ))}
                        </Select>
                      </>
                    ),
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
