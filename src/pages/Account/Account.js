import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Space,
  Avatar,
  Typography,
  Modal,
  Input,
  Tabs,

} from "antd";
import "../Account/Account";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleCheck,
  faInfoCircle,
  faCheck,
  faTimes,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./Account.css";
import approveColumns from "./approveColumns";
// Images
import face from "../../assets/images/face-1.jpg";
import face2 from "../../assets/images/face-2.jpg";
import face3 from "../../assets/images/face-3.jpg";
import face4 from "../../assets/images/face-4.jpg";
import face5 from "../../assets/images/face-5.jpeg";
import face6 from "../../assets/images/face-6.jpeg";
import mauGiayChuDoanhNghiep from "../../assets/images/mauGiayChuDoanhNghiep.jpg";
import SearchButton from "../../components/button/SearchButton";
import DetailButton from "../../components/button/DetailButton";



const { Title } = Typography;

const initialData = [{
  key: "1",
  AccountId: "acc001",
  Password: "******",
  Email: "michael@mail.com",
  PhoneNumber: "0123456789",
  Gender: "Male",
  Avatar: face2,
  IsVerified: false,
  Status: "Pending", // Chờ duyệt
  CreatedAt: "2023-01-10",
  UpdatedAt: "2023-05-15",
  RoleId: "guest",
  Name: "Michael John",
  ViewCertificate: mauGiayChuDoanhNghiep,
},
{
  key: "2",
  AccountId: "acc002",
  Password: "******",
  Email: "alexa@mail.com",
  PhoneNumber: "0987654321",
  Gender: "Female",
  Avatar: face3,
  IsVerified: false,
  Status: "Inactive", // Đã bị từ chối hoặc ngưng hoạt động
  CreatedAt: "2022-11-05",
  UpdatedAt: "2023-04-20",
  RoleId: "gardener",
  Name: "Alexa Liras",
  ViewCertificate: "",

},
{
  key: "3",
  AccountId: "acc003",
  Password: "******",
  Email: "laure@mail.com",
  PhoneNumber: "0912345678",
  Gender: "Female",
  Avatar: face,
  IsVerified: false,
  Status: "Pending",
  CreatedAt: "2023-02-15",
  UpdatedAt: "2023-05-20",
  RoleId: "guest",
  Name: "Laure Perrier",
  ViewCertificate: "",
},
{
  key: "4",
  AccountId: "acc004",
  Password: "******",
  Email: "miriam@mail.com",
  PhoneNumber: "0932123456",
  Gender: "Female",
  Avatar: face4,
  IsVerified: true,
  Status: "Active", // Đã được duyệt
  CreatedAt: "2023-01-25",
  UpdatedAt: "2023-05-18",
  RoleId: "gardener",
  Name: "Miriam Eric",
  ViewCertificate: "",
},
{
  key: "5",
  AccountId: "acc005",
  Password: "******",
  Email: "richard@mail.com",
  PhoneNumber: "0909876543",
  Gender: "Male",
  Avatar: face5,
  IsVerified: false,
  Status: "Inactive",
  CreatedAt: "2022-12-01",
  UpdatedAt: "2023-04-01",
  RoleId: "guest",
  Name: "Richard Gran",
  ViewCertificate: "",
},
{
  key: "6",
  AccountId: "acc006",
  Password: "******",
  Email: "john@mail.com",
  PhoneNumber: "0976543210",
  Gender: "Male",
  Avatar: face6,
  IsVerified: false,
  Status: "Inactive",
  CreatedAt: "2022-10-20",
  UpdatedAt: "2023-03-10",
  RoleId: "gardener",
  Name: "John Levi",
  ViewCertificate: "",
},
{
  key: "7",
  AccountId: "acc007",
  Password: "******",
  Email: "sarah@mail.com",
  PhoneNumber: "0911222333",
  Gender: "Female",
  Avatar: face2,
  IsVerified: false,
  Status: "Pending",
  CreatedAt: "2023-03-05",
  UpdatedAt: "2023-05-22",
  RoleId: "guest",
  Name: "Sarah Connor",
  ViewCertificate: "",
},
{
  key: "8",
  AccountId: "acc008",
  Password: "******",
  Email: "peter@mail.com",
  PhoneNumber: "0922333444",
  Gender: "Male",
  Avatar: face3,
  IsVerified: true,
  Status: "Active",
  CreatedAt: "2023-02-28",
  UpdatedAt: "2023-05-19",
  RoleId: "gardener",
  Name: "Peter Parker",
  ViewCertificate: "",
},];

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function Account() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hoveredStatus, setHoveredStatus] = useState(null);
  const [hoveredVerify, setHoveredVerify] = useState(null);
  const [modalInfo, setModalInfo] = useState({
    visible: false,
    recordKey: null,
  });
  const [statusData, setStatusData] = useState(initialData);
  const [approveModalInfo, setApproveModalInfo] = useState({
    visible: false,
    recordKey: null,
  });
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchText, setSearchText] = useState("");   
  const openRejectModal = (record) => {
    setSelectedRecord(record);
    setIsRejectModalOpen(true);

  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      message.warning("Vui lòng nhập lý do từ chối.");
      return;
    }
    handleReject(selectedRecord, rejectReason); // bạn tự định nghĩa thêm logic xử lý
    setIsRejectModalOpen(false);
  };


  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const handleViewImage = (url) => {
    setImageSrc(url);              // Gán ảnh
    setIsImageModalOpen(true);     // Mở modal
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);    // Đóng modal
  };

  const handleApprove = (record) => {
    setStatusData((prevData) =>
      prevData.map((item) =>
        item.key === record.key
          ? { ...item, Status: "Active", RoleId: "gardener", IsVerified: true }
          : item,
      ),
    );
    message.success("Gardener registration approved successfully");
  };

  const handleReject = (record) => {
    setStatusData((prevData) =>
      prevData.map((item) =>
        item.key === record.key
          ? {
            ...item,
            Status: "Inactive", // đổi trạng thái
            RoleId: "gardener", // nếu cần
            IsVerified: false,  // hoặc true, tùy logic
          }
          : item
      )
    );
    message.error("Gardener registration rejected");
  };


  const showUserDetails = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleStatusCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };


  const gardenerColumns = [
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
      title: "Trạng thái",
      dataIndex: "Status",
      width: 120,
      align: "center",
      render: (status, record) => {
        const isHovered = hoveredStatus === record.key;

        const displayStatus =
          status === "Active"
            ? "Đang hoạt động"
            : status === "Inactive"
              ? "Ngưng hoạt động"
              : status; 

        return (
          <>
            <div
              onMouseEnter={() => setHoveredStatus(record.key)}
              onMouseLeave={() => setHoveredStatus(null)}
              onClick={() =>
                setModalInfo({ visible: true, recordKey: record.key })
              }
              style={{
                cursor: "pointer",
                width: 100,
                textAlign: "center",
                padding: "6px 8px",


                color: status === "Active" ? "#1890ff" : "#999",
                transition: "all 0.3s ease",
                userSelect: "none",
              }}
            >
              {displayStatus}
            </div>

            <Modal
              title="Xác nhận thay đổi trạng thái"
              open={modalInfo.visible && modalInfo.recordKey === record.key}
              onCancel={() => setModalInfo({ visible: false, recordKey: null })}
              okText="Đồng ý"
              cancelText="Hủy"
              onOk={() => {
                setStatusData((prevData) =>
                  prevData.map((item) => {
                    if (item.key === record.key) {
                      return {
                        ...item,
                        Status: item.Status === "Active" ? "Inactive" : "Active",
                      };
                    }
                    return item;
                  }),
                );
                setModalInfo({ visible: false, recordKey: null });
              }}
            >
              <p>
                Bạn có muốn chuyển trạng thái sang{" "}
                {status === "Active" ? "Không hoạt động" : "Hoạt động"}?
              </p>
            </Modal>
          </>
        );
      },
    },
    {
      title: "Hành động",
      key: "detail",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Space>
          <DetailButton
            onClick={() => showUserDetails(record)}
            icon={faEye}
            title="Xem chi tiết"
          style={{
            fontSize: "16px",
            color: "#1890ff",
            cursor: "pointer",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Space>
      ),
    },
  ];



  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách chủ vườn"
              extra={
                <Space>
                  <SearchButton
                    placeholder="Tìm kiếm tài khoản..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    SiSi
                  />
                </Space>
              } 
            >
              <Tabs defaultActiveKey="1">

                <Tabs.TabPane tab={<span style={{ fontSize: "16px", padding: "10px" }}>Đang chờ duyệt </span>} key="1">
                  <div className="table-responsive">
                    <Table
                      columns={approveColumns({ handleApprove, openRejectModal, handleViewImage })}

                      dataSource={statusData.filter(
                        (item) => item.RoleId === "guest",
                      )}
                      pagination={false}
                      className="ant-border-space"
                      scroll={{ x: true }}
                    />

                  </div>
                  <Modal
                    open={isImageModalOpen}
                    onCancel={handleCloseImageModal}
                    footer={null}
                    centered
                  >
                    <img
                      src={imageSrc}
                      alt="Chứng nhận"
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  </Modal>

                </Tabs.TabPane>
                <Tabs.TabPane tab={<span style={{ fontSize: "16px", padding: "10px" }}> Đã duyệt </span>} key="2">
                  <div className="table-responsive " >
                    <Table
                      columns={gardenerColumns}
                      dataSource={statusData.filter(
                        (item) => item.Status === "Active",
                      )}
                      pagination={false}
                      className="ant-border-space"
                      scroll={{ x: true }}

                    />
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span style={{ fontSize: "16px", padding: "10px" }}>Ngưng hoạt động</span>} key="3">
                  <div className="table-responsive">
                    <Table
                      columns={gardenerColumns}
                      dataSource={statusData.filter(
                        (item) => item.Status === "Inactive",
                      )}
                      pagination={false}
                      className="ant-border-space"
                      scroll={{ x: true }}
                    />
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>



      
      {/* modal thông tin cá nhân */}
      <Modal
        title={null}
        open={isModalVisible}
        onCancel={handleStatusCancel}
        footer={null}
        width={900}
        centered
        bodyStyle={{ padding: 0, background: "#f0f2f5", borderRadius: 12 }}
      >
        <div style={{ display: "flex", gap: "24px", padding: "24px" }}>
          {/* Cột trái - Thông tin tài khoản */}
          <div style={{ width: 400, display: "flex", justifyContent: "center" }}>
            <div style={{ ...cardStyle, width: 400 }}>
              <h3 style={{ textAlign: "center" }}>Thông tin tài khoản</h3>
              <p>

                <Avatar
                  src={selectedUser?.Avatar}
                  size={100}
                  style={{ marginLeft: 12, border: "2px solid #f0f0f0" }}
                />
              </p>
              <p><strong>Tên:</strong> {selectedUser?.Name}</p>
              <p><strong>Email:</strong> {selectedUser?.Email}</p>
              <p><strong>Điện thoại:</strong> {selectedUser?.PhoneNumber}</p>
              <p><strong>Giới tính:</strong> {selectedUser?.Gender}</p>
              <p><strong>Địa chỉ:</strong> {selectedUser?.Address}</p>
              <p><strong>Trạng thái:</strong> {selectedUser?.Status}</p>

              <p><strong>Ngày tạo:</strong> {selectedUser?.CreatedAt}</p>
              
              <p><strong>Ngày cập nhật:</strong> {selectedUser?.UpdatedAt}</p>
              <p>
                <strong>Xác thực:</strong>{" "}
                <span
                  style={{
                    color: selectedUser?.IsVerified ? "#52c41a" : "#ff4d4f",
                    fontWeight: "bold",
                  }}
                >
                  {selectedUser?.IsVerified ? "Đã xác thực" : "Chưa xác thực"}
                </span>
              </p>
            </div>
          </div>

          {/* Cột phải - Hình ảnh giấy chứng nhận */}
          <div style={{ width: 400 }}>
            <div style={cardStyle}>
              <h3 style={cardTitle}>Giấy chứng nhận</h3>
              <img
                src={imageSrc}
                alt="Giấy chứng nhận"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  objectFit: "cover",
                  border: "1px solid #e0e0e0",
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
      {/* modal thông tin chứng nhận */}
      <Modal
        title="Nhập lý do từ chối"
        open={isRejectModalOpen}
        onCancel={() => setIsRejectModalOpen(false)}
        onOk={handleConfirmReject}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Input.TextArea
          rows={4}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Nhập lý do từ chối..."
        />
      </Modal>

    </>
  );
}

export default Account;

const cardStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  border: "1px solid #f0f0f0",
};

const cardTitle = {
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 12,
  color: "#1a1a1a",
};