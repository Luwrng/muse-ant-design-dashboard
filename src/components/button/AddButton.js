import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddButton = ({
  onClick,
  label = "Thêm mới",
  icon = <PlusOutlined />,
  ...props
}) => (
  <Button type="primary" icon={icon} onClick={onClick} {...props}>
    {label}
  </Button>
);

export default AddButton;
