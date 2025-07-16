import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, Modal, message } from "antd";
import { cleanfood } from "../../api_admin";

const DeleteButton = ({
  record,
  tooltip = "Xóa",
  color = "#ff4d4f",
  setDataSources,
  onDeleteSuccess,
  type = "feature", // "feature" hoặc "package"
}) => {
  const handleDelete = () => {
    Modal.confirm({
      title: "Xác nhận vô hiệu hóa",
      content: `Bạn có chắc chắn muốn vô hiệu hóa ${type === "package" ? "gói dịch vụ" : "dịch vụ"
        } "${record.name}" không?`,
      okText: "Vô hiệu hóa",
      cancelText: "Hủy",
      maskClosable: true,
      onCancel() {
        message.info("Đã hủy thao tác");
      },
      onOk: async () => {
        try {
          if (type === "package") {
            // ✅ Gửi đúng định dạng payload: { servicePackageId: string }
            await cleanfood.admin.disableServicePackage({
              servicePackageId: record.servicePackageId || record.key,
            });
          } else {
            // Dịch vụ con (service feature)
            await cleanfood.admin.disableServiceFeature(record.serviceFeatureId);
          }

          message.success("Vô hiệu hóa thành công!");

          // Cập nhật lại danh sách nếu cần
          if (setDataSources) {
            setDataSources((prev) =>
              prev.filter((item) =>
                type === "package"
                  ? item.servicePackageId !== record.servicePackageId
                  : item.serviceFeatureId !== record.serviceFeatureId
              )
            );
          }

          if (onDeleteSuccess) onDeleteSuccess();
        } catch (error) {
          console.error("❌ Lỗi khi vô hiệu hóa:", error);
          if (error.response?.data?.message) {
            message.error(`Lỗi: ${error.response.data.message}`);
          } else {
            message.error("Vô hiệu hóa thất bại. Vui lòng thử lại!");
          }
        }
      },
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
