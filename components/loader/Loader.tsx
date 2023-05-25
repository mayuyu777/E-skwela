import { Typography } from "antd";
import { FC } from "react";

import { Spinner, Text } from "@chakra-ui/react";

interface Props {
  description: string;
}

const { Title } = Typography;

export const Loader: FC<Props> = ({ description }) => {
  return (
    <div>
      <div>
        <Spinner />
        {description && <Text>{description}</Text>}
      </div>
    </div>
  );
};
