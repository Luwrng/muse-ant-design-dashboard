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
  Select,
  Tag
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
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import "./Account.css";
import approveColumns from "./approveColumns";
import mauGiayChuDoanhNghiep from "../../assets/images/mauGiayChuDoanhNghiep.jpg";
import SearchButton from "../../components/button/SearchButton";
import DetailButton from "../../components/button/DetailButton";
import EditButton from "../../components/button/EditButton";

import { cleanfood } from "../../api_admin";
const defaultAvatar = "https://ui-avatars.com/api/?name=User";

const { Title } = Typography;
const Option = Select;

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
  const [dataSource, setDataSource] = useState([]);
  const [modalInfo, setModalInfo] = useState({
    visible: false,
    recordKey: null,
  });
  const [activeTab, setActiveTab] = useState("1");

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
  const [editStatus, setEditStatus] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState(null);



  const showEditModal = (record) => {
    const normalizedStatus = record.Status?.toUpperCase();

    if (["ACTIVE", "INACTIVE", "BANNED"].includes(normalizedStatus)) {
      setEditStatus(normalizedStatus);
    } else {
      setEditStatus("INACTIVE"); // fallback
    }

    setEditingAccountId(record.key);
    setEditModalVisible(true);
  };





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
    setImageSrc(record.CertificateImage || "");
    setIsModalVisible(true);
  };

  const handleStatusCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const [statusData, setStatusData] = useState([]);
  const [gardeners, setGardeners] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [user, setUser] = useState({});

  const handleShowDetail = async (id) => {
    const data = await cleanfood.admin.getAccountById(id);
    setUser(data);
  };

  useEffect(() => {
    fetchGardeners();
  }, []);
  const fetchGardeners = async (page = 1, size = 10) => {
    try {
      const data = await cleanfood.gardener.getAll({ page, size, sortOrder: "asc" });

      const formattedData = data.items.map((item) => {
        const address = item.addresses?.[0] || {};
        const certificate = item.certificates?.[0];

        return {
          key: item.accountId,
          Name: item.name,
          Email: item.email,
          PhoneNumber: item.phoneNumber,
          Gender:
            item.gender?.toLowerCase() === "male"
              ? "Nam"
              : item.gender?.toLowerCase() === "female"
                ? "Nữ"
                : "Không xác định",
          Avatar:
            item.avatar?.toLowerCase().startsWith("none") || !item.avatar
              ? defaultAvatar
              : item.avatar,
          Status:
            item.status?.toUpperCase() === "ACTIVE"
              ? "Active"
              : item.status?.toUpperCase() === "INACTIVE"
                ? "Inactive"
                : item.status,
          RoleId: item.roleName?.toLowerCase() || "guest",
          IsVerified: item.isVerified,
          CreatedAt: item.createAt
            ? new Date(item.createAt).toLocaleDateString("vi-VN")
            : "---",
          UpdatedAt: item.updatedAt
            ? new Date(item.updatedAt).toLocaleDateString("vi-VN")
            : "---",
          Address: address || "---",
          CertificateImage: certificate?.imageUrl || null,
        };
      });

      setStatusData(formattedData);
      setPagination({
        current: data.page,
        pageSize: data.size,
        total: data.total,
      });
    } catch (err) {
      console.error("Lỗi lấy danh sách gardener:", err);
    }
  };

  const approveCols = approveColumns({
    setDataSource,
    onApproved: fetchGardeners,
    setActiveTab, // truyền thêm
  });



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
      title: "Tên",
      dataIndex: "Name",
      key: "name",
      width: 150,

    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "email",
      width: 200,

    },
    {
      title: "Số điện thoại",
      dataIndex: "PhoneNumber",
      key: "phone",
      width: 150,

    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      key: "status",
      align: "center",
      render: (status) => {
        const normalizedStatus = status?.toUpperCase();
        let color = "default";
        let text = "Không xác định";

        switch (normalizedStatus) {
          case "ACTIVE":
            color = "green";
            text = "Đang hoạt động";
            break;
          case "INACTIVE":
            color = "red";
            text = "Ngưng hoạt động";
            break;
          case "BANNED":
            color = "volcano";
            text = "Bị cấm";
            break;
        }

        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: "Hành động",
      key: "detail",
      width: 120,
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
          <EditButton
            tooltip="Chỉnh sửa"
            onClick={() => showEditModal(record)}
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
              <Tabs activeKey={activeTab}
                onChange={(key) => setActiveTab(key)}
                defaultActiveKey="1">

                <Tabs.TabPane tab={<span style={{ fontSize: "16px", padding: "10px" }}>Đang chờ duyệt </span>} key="1">
                  <div className="table-responsive">
                    <Table
                      columns={approveColumns({
                        handleViewImage,
                        openRejectModal,
                        setDataSource,
                        setActiveTab,
                        onApproved: fetchGardeners // truyền đúng hàm bạn có
                      })}

                      dataSource={statusData.filter(
                        (item) => item.Status === "PENDING",
                      )}
                      pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        position: ["bottomCenter", "bottomRight"],
                        onChange: (page, size) => {
                          setPagination({
                            ...pagination,
                            current: page,
                            pageSize: size,
                          });
                        },
                      }}
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
                <Tabs.TabPane tab={<span style={{ fontSize: "16px", padding: "10px" }}> Đang hoạt động</span>} key="2">
                  <div className="table-responsive " >
                    <Table
                      columns={gardenerColumns}
                      dataSource={statusData.filter(
                        (item) => item.Status === "Active",
                      )}
                      pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        position: ["bottomCenter", "bottomRight"],
                        onChange: (page, size) => {
                          setPagination({
                            ...pagination,
                            current: page,
                            pageSize: size,
                          });
                        },
                      }}
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
                      pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        position: ["bottomCenter", "bottomRight"],
                        onChange: (page, size) => {
                          setPagination({
                            ...pagination,
                            current: page,
                            pageSize: size,
                          });
                        },
                      }}
                      className="ant-border-space"
                      scroll={{ x: true }}
                    />
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span style={{ fontSize: "16px", padding: "10px" }}>Bị cấm</span>} key="4">
                  <div className="table-responsive">
                    <Table
                      columns={gardenerColumns}
                      dataSource={statusData.filter(
                        (item) => item.Status === "BANNED",
                      )}
                      pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        position: ["bottomCenter", "bottomRight"],
                        onChange: (page, size) => {
                          setPagination({
                            ...pagination,
                            current: page,
                            pageSize: size,
                          });
                        },
                      }}
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
              <p><strong>Địa chỉ:</strong>
                {selectedUser?.Address
                  ? `${selectedUser.Address.addressLine}, ${selectedUser.Address.province}, ${selectedUser.Address.country}`
                  : "---"}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <Tag color={
                  selectedUser?.Status === "Active" ? "green" :
                    selectedUser?.Status === "Inactive" ? "red" :
                      selectedUser?.Status === "BANNED" ? "volcano" :
                        "default"
                }>
                  {selectedUser?.Status === "Active"
                    ? "Đang hoạt động"
                    : selectedUser?.Status === "Inactive"
                      ? "Ngưng hoạt động"
                      : selectedUser?.Status === "BANNED"
                        ? "Bị cấm"
                        : "Không xác định"}
                </Tag>
              </p>
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
      <Modal
        title="Chỉnh sửa trạng thái"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={async () => {
          try {
            await cleanfood.admin.updateAccountStatus(editingAccountId, editStatus);
            message.success("Cập nhật trạng thái thành công");
            setEditModalVisible(false);
            fetchGardeners(); // reload lại danh sách
          } catch (error) {
            console.error("Lỗi cập nhật trạng thái:", error);
            message.error("Cập nhật trạng thái thất bại");
          }
        }}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Trạng thái mới:</p>
        <Select
          style={{ width: "100%" }}
          value={editStatus}
          onChange={(value) => setEditStatus(value)}
        >
          <Select.Option value="ACTIVE">Đang hoạt động</Select.Option>
          <Select.Option value="INACTIVE">Ngưng hoạt động</Select.Option>
          <Select.Option value="BANNED">Bị cấm</Select.Option>
        </Select>
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