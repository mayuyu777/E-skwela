/* eslint-disable react/display-name */
/* eslint-disable react/no-children-prop */
import { FormControlProps, FormLabelProps } from "@chakra-ui/form-control";
import { FormControl, FormLabel } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { ComponentPropsWithRef } from "react";
import { Form, FormItemProps, Input as AntInput } from "antd";

type InputColor = "dark" | "boxing" | "cycling" | "default" | "online" | "gray";

interface Props {
  bordered?: boolean;
  color?: InputColor;
}

interface AdminInputProps {
  formItemProps: FormItemProps;
  inputProps?: InputProps;
  label: string;
}

type InputProps = Props & ComponentPropsWithRef<typeof AntInput>;
interface FormItemsInputProps {
  formControlProps: FormControlProps;
  formLabelProps: FormLabelProps;
  title: String;
  children: ReactNode;
}

function FormInput({ formControlProps, formLabelProps, title, children }: FormItemsInputProps) {
  return (
    <FormControl {...formControlProps}>
      <FormLabel {...formLabelProps}>{title}</FormLabel>
      {children}
    </FormControl>
  );
}

const InputComponent = ({ bordered, className, color = "default", ...props }: InputProps) => {
  return <AntInput {...props} />;
};

InputComponent.Admin = ({ formItemProps, inputProps, label }: AdminInputProps) => {
  const { children, ...rest } = formItemProps;
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Form.Item {...rest} children={children || <AntInput {...inputProps} />} />
    </FormControl>
  );
};

export const AdminInput = InputComponent;
export default FormInput;
