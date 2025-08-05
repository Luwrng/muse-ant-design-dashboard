import { Table, Tag, Modal, Button, Typography, Space, Card, message, Tabs } from "antd";
import { useEffect, useState } from "react";
import SearchButton from "../components/button/SearchButton";
import { cleanfood } from "../api_admin";
import ActivePackageCustomers from "./ActivePackageCustomers"; // đường dẫn đúng


const { Title, Paragraph } = Typography;

const columns = [
  {
    title: "Mã đăng ký",
    dataIndex: "subscriptionId",
    key: "subscriptionId",

  },
  {
    title: "Tên khách hàng",
    dataIndex: "gardenerName",
    key: "gardenerName",

  },
  {
    title: "SĐT",
    dataIndex: "gardenerPhone",
    key: "gardenerPhone",
    align: "center",
  },
  // {
  //   title: "Mã người dùng",
  //   dataIndex: "gardenerId",
  //   key: "gardenerId",
  //   align: "center",
  // },
  // {
  //   title: "Loại dịch vụ",
  //   dataIndex: "subscriptionType",
  //   key: "subscriptionType",
  //   align: "center",
  //   render: (type) => {
  //     const labelMap = {
  //       POST_LIMIT: "Giới hạn đăng bài",
  //       PRIORITY_POST: "Đăng bài ưu tiên",
  //     };
  //     return labelMap[type] || type;
  //   },
  // },
  {
    title: "Ngày bắt đầu",
    dataIndex: "startDate",
    key: "startDate",
    align: "center",
    render: (date) =>
      date
        ? new Date(date).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        : "-",
  },
  {
    title: "Ngày kết thúc",
    dataIndex: "endDate",
    key: "endDate",
    align: "center",
    render: (date) =>
      date
        ? new Date(date).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        : "-",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (status) => {
      const colorMap = {
        ACTIVE: { color: "green", label: "Đang hoạt động" },
        PENDING: { color: "orange", label: "Chờ kích hoạt" },
        EXPIRED: { color: "red", label: "Đã hết hạn" },
      };
      const { color, label } = colorMap[status] || { color: "gray", label: "Không xác định" };
      return <Tag color={color}>{label}</Tag>;
    },
  },
];

const ContractTable = () => {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [total, setTotal] = useState(0);
  const [tabStatus, setTabStatus] = useState("all");

  const showModal = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const fetchContracts = async (page = 1, size = 6, search = "") => {
    try {
      const res = await cleanfood.admin.getContract({ page, size, search });
      const formatted = res.items.map((item) => ({
        key: item.subscriptionId?.random || item.subscriptionId,
        subscriptionId: item.subscriptionId?.random || item.subscriptionId,
        gardenerName: item.gardenerName,
        gardenerPhone: item.gardenerPhone,
        gardenerId: item.gardenerId?.random || item.gardenerId,
        subscriptionType: item.subscriptionType,
        startDate: item.startDate?.slice(0, 10),
        endDate: item.endDate?.slice(0, 10),
        status: item.status,
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
    fetchContracts(currentPage, pageSize, searchText);
  }, [currentPage, pageSize, searchText]);

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
            setCurrentPage(1);
            setTabStatus(key);
          }}
          items={[
            {
              key: "all",
              label: "Tất cả đơn",
              children: (
                <Table
                  columns={columns}
                  dataSource={dataSource.filter(item => item.status === "ACTIVE")}
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
              ),
            },
            {
              key: "active-customers",
              label: "Danh sách khách hàng đang sử dụng gói",
              children: <ActivePackageCustomers />, // ✅ Gọi component bạn đã viết
            },
          ]}
        />

      </Card>

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
