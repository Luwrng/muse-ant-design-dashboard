import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Space } from "antd";
import { Avatar } from "antd";
import { useState } from "react";
import { message } from "antd";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import DetailButton from "../../components/button/DetailButton";
import { cleanfood } from "../../api_admin";

const updateRecordStatus = async (
  record,
  newStatus,
  setDataSource,
  fetchData,
  setActiveTab
) => {
  try {
    await cleanfood.admin.updateAccountStatus(record.key, newStatus, true);

    const statusMap = {
      ACTIVE: "Hoạt động",
      INACTIVE: "Ngưng hoạt động",
    };
    message.success(`Tài khoản đã được ${newStatus}`);
    if (newStatus === "ACTIVE") {
      setActiveTab("Hoạt động");
    } else if (newStatus === "INACTIVE") {
      setActiveTab("Ngưng hoạt động");
    } else {
      setActiveTab("Khác");
    }

    if (fetchData) {
      await fetchData();
    }
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    message.error("Cập nhật trạng thái thất bại");
  }
};

const approveColumns = ({
  handleViewImage,
  openRejectModal,
  setDataSource,
  setActiveTab,
  onApproved,
}) => [
  {
    title: "Hình đại diện",
    dataIndex: "Avatar",
    key: "avatar",
    width: 80,
    align: "center",
    render: (avatar) => <Avatar size={40} src={avatar} />,
  },
  {
    title: "Họ và tên",
    dataIndex: "Name",
    key: "name",
    width: 150,
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "Email",
    key: "email",
    width: 200,
    align: "center",
  },
  {
    title: "Số điện thoại",
    dataIndex: "PhoneNumber",
    key: "phone",
    width: 150,
    align: "center",
  },
  {
    title: "Xem chi tiết ",
    dataIndex: "ViewCertificate",
    key: "certificate",
    width: 50,
    align: "center",
    render: (_, record) => (
      <Space>
        <DetailButton
          onClick={() => handleViewImage(record.CertificateImage)}
          icon={faEye}
          title="Xem chi tiết"
        />
      </Space>
    ),
  },
  {
    title: "Phê duyệt",
    key: "actions",
    width: 80,
    align: "center",
    render: (_, record) => (
      <Space>
        <FontAwesomeIcon
          icon={faCheck}
          onClick={async () => {
            await updateRecordStatus(
              record,
              "ACTIVE",
              setDataSource,
              onApproved,
              setActiveTab
            );
          }}
          title="Duyệt"
          style={{
            fontSize: "16px",
            color: "#52c41a",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => openRejectModal(record)}
          title="Không duyệt"
          style={{
            fontSize: "16px",
            color: "#ff4d4f",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </Space>
    ),
  },
];
export default approveColumns;
