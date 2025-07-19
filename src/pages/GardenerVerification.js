import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Typography,
  Modal,
  Space,
  Tag,
  Avatar,
  Descriptions,
  message,
  Select
} from "antd";
import DetailButton from "../components/button/DetailButton";
import SearchButton from "../components/button/SearchButton";
import EditButton from "../components/button/EditButton";
import { cleanfood } from '../api_admin';
import { EditTwoTone } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

function GardenerVerification() {
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [viewingRecord, setViewingRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState(null);
  const [retailers, setRetailers] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchRetailers = async (page = 1, size = 10) => {
    try {
      const { items = [], total, page: currentPage, size: pageSize } = await cleanfood.retailer.getAll(page, size);

      const retailersWithFullInfo = await Promise.all(
        items.map(async (retailer) => {
          try {
            const addresses = await cleanfood.admin.getAddressesByAccount(retailer.accountId);
            const address = addresses?.[0] || {};

            return {
              key: retailer.accountId,
              name: retailer.name,
              email: retailer.email,
              phoneNumber: retailer.phoneNumber,
              status: retailer.status?.toUpperCase() || "UNKNOWN",
              isVerified: retailer.isVerified,
              createdAt: retailer.createAt,
              updatedAt: retailer.updatedAt,
              addressLine: address.addressLine || "Chưa có",
              city: address.city || "Chưa rõ",
            };
          } catch (error) {
            console.error(`Lỗi lấy địa chỉ cho ${retailer.accountId}:`, error);
            return {
              key: retailer.accountId,
              name: retailer.name,
              email: retailer.email,
              phoneNumber: retailer.phoneNumber,
              status: retailer.status?.toUpperCase() || "UNKNOWN",
              isVerified: retailer.isVerified,
              createdAt: retailer.createAt,
              updatedAt: retailer.updatedAt,
              addressLine: "Chưa có",
              city: "Chưa rõ",
            };
          }
        })
      );

      setRetailers(retailersWithFullInfo);
      setPagination({
        current: currentPage,
        pageSize,
        total,
      });

      console.log("Retailers:", retailersWithFullInfo);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhà bán lẻ:", error);
      message.error("Không thể tải danh sách nhà bán lẻ.");
    }
  };

  const fetchAddress = async (accountId) => {
    try {
      const addresses = await cleanfood.admin.getAddressesByAccount(accountId);
      return addresses[0]?.addressLine || "Chưa có";
    } catch (error) {
      console.error("Lỗi lấy địa chỉ:", error);
      return "Chưa có";
    }
  };



  useEffect(() => {
    fetchRetailers();
  }, []);

  const showViewModal = async (record) => {
    try {
      const address = await fetchAddress(record.accountId);
      const updatedRecord = { ...record, address };
      setViewingRecord(updatedRecord);
      setIsViewModalVisible(true);
    } catch (error) {
      console.error("Lỗi khi mở modal và lấy địa chỉ:", error);
    }
  };


  const handleCancel = () => {
    setIsViewModalVisible(false);
    setViewingRecord(null);
  };

  const showEditModal = (record) => {
    setEditStatus(record.Status?.toUpperCase() || "INACTIVE");
    setEditingAccountId(record.key);
    setEditModalVisible(true);
  };


  const columns = [
    {
      title: "Đại lý",
      key: "retailer",
      width: 250,
      render: (_, record) => (
        <Space>
          <Avatar size={40} src={record.avatar} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
              {record.email}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 180,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 180,
      render: (phone) =>
        phone
          ? phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3")
          : "Chưa có",
      align: "center",
    },
    // {
    //   title: "Địa chỉ ",
    //   dataIndex: "addressLine",
    //   key: "addressLine",
    //   width: 180,
    //   render: (addressLine) => addressLine || "Chưa có",
    //   align: "center",
    // },
    // {
    //   title: "Thành phố",
    //   dataIndex: "city",
    //   key: "city",
    //   width: 160,
    //   render: (city) => city || "Chưa rõ",
    //   align: "center",
    // },
    {
      title: "Ngày đăng ký",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 180,
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      sorter: (a, b) => {
        const order = ["ACTIVE", "INACTIVE", "BANNED"];
        return order.indexOf(a.status) - order.indexOf(b.status);
      },
      render: (status) => {
        let color = "default";
        let text = "Không xác định";

        switch (status) {
          case "ACTIVE":
            color = "green";
            text = "Đang hoạt động";
            break;
          case "INACTIVE":
            color = "orange";
            text = "Ngưng hoạt động";
            break;
          case "BANNED":
            color = "red";
            text = "Bị cấm";
            break;
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space>
          <DetailButton record={record} showModal={showViewModal} />
          <EditButton tooltip="Chỉnh sửa trạng thái" onClick={() => showEditModal(record)} />

        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    fetchRetailers(pagination.current, pagination.pageSize);
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách đại lý"
              extra={
                <Space>
                  <SearchButton
                    placeholder="Tìm kiếm đại lý..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </Space>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={retailers}
                  rowKey="accountId"
                  pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,

                    pageSizeOptions: [5, 10, 20],
                    position: ["bottomCenter"],
                  }}
                  onChange={handleTableChange}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* View Details Modal */}
      <Modal
        title="Chi tiết"
        open={isViewModalVisible}
        onCancel={handleCancel}
        width={600}
        footer={null}
      >
        {viewingRecord && (
          <>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Avatar size={100} src={viewingRecord.avatar} />
              <Title level={4} style={{ marginTop: 16, marginBottom: 4 }}>
                {viewingRecord.name}
              </Title>
              <div style={{ color: "#8c8c8c" }}>
                Đăng ký vào ngày{" "}
                {new Date(viewingRecord.updatedAt).toLocaleString("vi-VN")}
              </div>
            </div>

            <Descriptions bordered column={2}>
              <Descriptions.Item label="Email" span={2}>
                {viewingRecord.email || "Chưa có"}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại" span={2}>
                {viewingRecord.phoneNumber || "Chưa có"}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ" span={2}>
                {viewingRecord.address || "Chưa có"}
              </Descriptions.Item>
              <Descriptions.Item label="Thành Phố" span={2}>
                {viewingRecord.city || "Chưa có"}
              </Descriptions.Item>

              <Descriptions.Item label="Giới tính" span={2}>
                {viewingRecord.gender || "Khác"}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái" span={2}>
                {viewingRecord.status === "Approved" ? (
                  <Tag color="green">Đã phê duyệt</Tag>
                ) : (
                  <Tag color="red">Chưa phê duyệt</Tag>
                )}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
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
            fetchRetailers(); // reload danh sách
          } catch (error) {
            console.error("Lỗi cập nhật trạng thái:", error);
            message.error("Cập nhật trạng thái thất bại");
          }
        }}
      >
        <p>Chọn trạng thái mới:</p>
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

export default GardenerVerification;
