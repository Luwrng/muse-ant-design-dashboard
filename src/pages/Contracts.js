import { Table, Tag, Modal, Button, Typography, Space, Card, message, Tabs, Tooltip, Descriptions } from "antd";
import { useEffect, useState } from "react";
import SearchButton from "../components/button/SearchButton";
import { cleanfood } from "../api_admin";
import ActivePackageCustomers from "./ActivePackageCustomers"; // đường dẫn đúng
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


const { Title, Paragraph } = Typography;

const getStatusColor = (status) => {
  const info = getStatusInfo(status);
  return info.color;
};
const getStatusInfo = (status) => {
  switch (status) {
    case "PENDING":
      return { color: "orange", label: "Đang chờ" };
    case "CONFIRMED":
      return { color: "blue", label: "Đã xác nhận" };
    case "IN_PROGRESS":
      return { color: "cyan", label: "Đang thực hiện" };
    case "SUCCESS":
      return { color: "green", label: "Hoàn thành" };
    case "CANCELLED":
      return { color: "red", label: "Đã hủy" };
    default:
      return { color: "default", label: "Không xác định" };
  }

};



const ContractTable = () => {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [total, setTotal] = useState(0);
  const [tabStatus, setTabStatus] = useState("all");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const showModal = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const fetchContracts = async (page = 1, size = 10, search = "") => {
    try {
      const params = {
        page,
        size,
        search,
        status: "SUCCESS", // ✅ chỉ lấy đơn hoàn thành
      };

      const res = await cleanfood.admin.getServicePackageOrders(params);
      const formatted = res.items.map((item, index) => ({
        key: index,
        gardenerName: item.gardenerName || "",
        servicePackageName: item.servicePackageName || "",
        gardenerId: item.gardenerId || "",
        servicePackageId: item.servicePackageId || "",
        totalAmount: item.totalAmount || 0,
        status: item.status,
        createdAt: item.createdAt?.split("T")[0] || "",
      }));

      setDataSource(formatted);
      setTotal(res.total || 0);
      setCurrentPage(res.page || page);
      setPageSize(res.size || size);
    } catch (error) {
      console.error("Lỗi khi fetch hợp đồng:", error);
      message.error("Không thể tải danh sách hợp đồng.");
    }
  };


  useEffect(() => {
    if (tabStatus === "SUCCESS") {
      fetchContracts(currentPage, pageSize, searchText, "SUCCESS");
    }
  }, [currentPage, pageSize, searchText, tabStatus]);


  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };
  const renderTable = () => (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: total,
        position: ["bottomCenter", "bottomRight"],
        onChange: (page, size) => {
          setCurrentPage(page);
          setPageSize(size);
        },
      }}
      scroll={{ x: "max-content", y: 400 }}
    />
  );


  const columns = [
    {
      title: "Tên gói",
      dataIndex: "servicePackageName",
      key: "servicePackageName",

    },
    {
      title: "Khách Hàng",
      dataIndex: "gardenerName",
      key: "gardenerName",

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
      render: (status) => {
        const { color, label } = getStatusInfo(status);
        return <Tag color={color}>{label}</Tag>;
      },
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
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title="Danh sách gói đăng ký"
        extra={
          <Space>
            <SearchButton
              placeholder="Tìm kiếm theo tên khách hàng..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Space>
        }
      >
        <Tabs
          defaultActiveKey="all"
          style={{ fontSize: "16px", padding: "10px" }}
          onChange={(key) => {
            setTabStatus(key);  // ✅ set tab đang chọn
            setCurrentPage(1);  // ✅ reset về trang đầu
          }}
          items={[
            {
              key: "SUCCESS",
              label: "Đơn hoàn thành",
              children: renderTable(),
            },
            {
              key: "active-customers",
              label: "Danh sách khách hàng đang sử dụng gói",
              children: <ActivePackageCustomers />,
            },
          ]}
        />


      </Card>

      <Modal
        title="Chi tiết đơn hàng"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={700}
      >
        {selectedOrder && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Mã đơn">
              {selectedOrder.servicePackageName}
            </Descriptions.Item>
            <Descriptions.Item label="Tên khách hàng">
              {selectedOrder.gardenerName}
            </Descriptions.Item>
            <Descriptions.Item label="Gói dịch vụ">
              {selectedOrder.servicePackageId}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">
              {Number(selectedOrder.totalAmount).toLocaleString()} đ
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={getStatusColor(selectedOrder.status)}>
                {getStatusInfo(selectedOrder.status).label}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {selectedOrder.createdAt}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>


      {/* <div>
        <Button type="link" onClick={showModal} style={{ padding: 0 }}>
          Xem điều khoản & chính sách
        </Button>
      </div> */}
      {/* 
      <Modal
        title="Điều khoản sử dụng & Chính sách gia hạn"
        open={visible}
        onCancel={handleClose}
        footer={null}
        width={700}
      >
        <Typography>
          <Title level={5}>1. Điều khoản sử dụng:</Title>
          <Paragraph>
            - Gardener cam kết cung cấp thông tin trung thực.<br />
            - Không đăng bài sai sự thật, nội dung gây hiểu lầm hoặc vi phạm pháp luật.<br />
            - Mỗi gói dịch vụ chỉ áp dụng cho một tài khoản duy nhất.<br />
            - Vi phạm điều khoản có thể dẫn đến việc xóa bài viết hoặc khóa tài khoản.<br />
            - Phí mua gói không hoàn lại sau khi thanh toán, trừ khi có quy định riêng.
          </Paragraph>

          <Title level={5}>2. Chính sách gia hạn:</Title>
          <Paragraph>
            - Mỗi gói có thời hạn sử dụng 30 ngày kể từ ngày kích hoạt.<br />
            - Trước khi hết hạn 3 ngày, hệ thống sẽ gửi thông báo đến người dùng.<br />
            - Nếu bật chức năng "Tự động gia hạn", hệ thống sẽ tự động gia hạn bằng gói cũ.<br />
            - Nếu không gia hạn, bài đăng sẽ bị ẩn khỏi danh sách công khai.<br />
            - Người dùng có thể hủy gia hạn tự động bất cứ lúc nào. <b>Sẽ không được hoàn tiền lại</b>.
          </Paragraph>
        </Typography>
      </Modal> */}
    </>
  );
};

export default ContractTable;
