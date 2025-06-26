import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, Modal, message } from "antd";

const DeleteButton = ({ record, tooltip = "Xóa", color = "#ff4d4f", setData }) => {
  const handleDelete = () => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa dịch vụ "${record.name}" không?`,
      okText: "Xóa",
      onCancel() {
        message.error("Đã hủy xóa");
      },
      cancelText: "Hủy",
      onOk() {
        if (setData) {
          setData((prev) =>
            prev.filter((item) => item.serviceFeatureId !== record.serviceFeatureId)
          );
        }

        message.success("Đã xóa thành công");
      },
      maskClosable: true,

    });
  };

  return (
    <Tooltip title={tooltip}>
      <FontAwesomeIcon
        icon={faTrash}
        onClick={handleDelete}

        style={{
          fontSize: "16px",
          color,
          cursor: "pointer",
          transition: "transform 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </Tooltip>
  );
};

export default DeleteButton;
