import React from "react";
import { Tooltip, Modal, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { cleanfood } from "../../api_admin";

const DeleteButton = ({ record, tooltip, type, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      if (type === "feature") {
        await cleanfood.admin.disableServiceFeature(record.serviceFeatureId);
        message.success("✅ Đã vô hiệu hóa dịch vụ thành công");
      } else if (type === "package") {
        await cleanfood.admin.disableServicePackage(
          record.servicePackageId || record.key
        );
        message.success("✅ Đã vô hiệu hóa gói dịch vụ thành công");
      } else if (type === "category") {
        await cleanfood.productCategory.delete(record.productCategoryId);
        message.success("✅ Xóa danh mục sản phẩm thành công");
      } else {
        message.warning("❗ Loại xóa không được hỗ trợ");
        return;
      }

      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (err) {
      console.error("❌ Lỗi khi xóa:", err);

      if (err?.response?.data?.errors) {
        const errors = err.response.data.errors;
        const msg = Object.entries(errors)
          .map(([k, v]) => `${k}: ${v.join(", ")}`)
          .join("\n");
        message.error(msg);
      } else {
        message.error("❌ Xóa thất bại");
      }
    }
  };


  const showConfirm = () => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn vô hiệu hóa dịch vụ này?",
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk: handleDelete,
    });
  };

  return (
    <Tooltip title={tooltip || "Xóa"}>
      <FontAwesomeIcon
        icon={faTrash}
        style={{ cursor: "pointer", color: "#ff4d4f" }}
        onClick={showConfirm}
      />
    </Tooltip>
  );
};

export default DeleteButton;
