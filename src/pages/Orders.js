import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Tag,
  Space,
  Descriptions,
  message,
  Tooltip,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import SearchButton from "../components/button/SearchButton";
import { cleanfood } from "../api_admin";

const Orders = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (order, newStatus) => {
    message.success(`Đã cập nhật trạng thái đơn hàng thành ${newStatus}`);
    // TODO: Gọi API cập nhật trạng thái ở đây
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Confirmed":
        return "blue";
      case "In Progress":
        return "cyan";
      case "Completed":
        return "green";
      case "Cancelled":
        return "red";
      default:
        return "default";
    }
  };

  const fetchOrders = async (page = 1, size = 10, search = "") => {
    try {
      const res = await cleanfood.admin.getServicePackageOrders({ page, size, search });

      const formatted = res.items.map((item, index) => ({
        key: index,
        servicePackageOrderId: item.servicePackageOrderId?.random || "",
        gardenerId: item.gardenerId?.random || "",
        servicePackageId: item.servicePackageId?.random || "",
        totalAmount: item.totalAmount || 0,
        status: item.status,
        createdAt: item.createdAt?.split("T")[0] || "",
      }));

      setData(formatted);
      setTotal(res.total || 0);
      setCurrentPage(res.page || page);
      setPageSize(res.size || size);
    } catch (error) {
      console.error("Lỗi fetchOrders:", error);
      message.error("Không thể tải danh sách đơn mua gói dịch vụ.");
    }
  };

  useEffect(() => {
    fetchOrders(currentPage, pageSize, searchText);
  }, [currentPage, pageSize, searchText]);

  const columns = [
    {
      title: "Mã Đơn",
      dataIndex: "servicePackageOrderId",
      key: "servicePackageOrderId",
      align: "center"
    },
    {
      title: "Khách Hàng (ID)",
      dataIndex: "gardenerId",
      key: "gardenerId",
      align: "center"
    },
    {
      title: "Gói Dịch Vụ (ID)",
      dataIndex: "servicePackageId",
      key: "servicePackageId",
      align: "center"
    },
    {
      title: "Tổng Tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `${Number(amount).toLocaleString()} đ`,
      align: "center"
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center"
    },
    {
      title: "Thao Tác",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space center size="middle">
          <Tooltip title="Xem chi tiết">
            <FontAwesomeIcon
              icon={faEye}
              onClick={() => showOrderDetails(record)}
              style={{
                fontSize: "16px",
                color: "#1890ff",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </Tooltip>
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
              title="Danh sách đơn mua gói dịch vụ"
              extra={
                <Space>
                  <SearchButton
                    placeholder="Tìm kiếm gói dịch vụ..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </Space>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{
                    position: ["bottomCenter", "bottomRight"],
                    pageSize,
                    total,
                    current: currentPage,
                    onChange: (page, size) => {
                      setCurrentPage(page);
                      setPageSize(size);
                    },
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="Chi Tiết Đơn Mua"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Đóng
          </Button>,
        ]}
        width={700}
      >
        {selectedOrder && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Mã Đơn">
              {selectedOrder.servicePackageOrderId}
            </Descriptions.Item>
            <Descriptions.Item label="Mã Khách Hàng">
              {selectedOrder.gardenerId}
            </Descriptions.Item>
            <Descriptions.Item label="Mã Gói Dịch Vụ">
              {selectedOrder.servicePackageId}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng Tiền">
              {`${Number(selectedOrder.totalAmount).toLocaleString()} đ`}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng Thái">
              <Tag color={getStatusColor(selectedOrder.status)}>
                {selectedOrder.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày Tạo">
              {selectedOrder.createdAt}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default Orders;
