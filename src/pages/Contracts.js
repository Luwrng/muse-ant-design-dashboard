import { Table, Tag, Modal, Button, Typography, Space, Card } from "antd";
import { useState } from "react";
import SearchButton from "../components/button/SearchButton";
const { Title, Paragraph } = Typography;

const data = [
  {
    subscriptionId: "SUB001",
    packageId: "PKG001",
    gardenerId: "GDN001",
    status: "Active",
    subscriptionType: "POST_LIMIT",
    createdAt: "2025-06-08T10:00:00Z",
    startDate: "2025-06-10",
    endDate: "2025-07-10",
  },
  {
    subscriptionId: "SUB002",
    packageId: "PKG002",
    gardenerId: "GDN002",
    status: "Active",
    subscriptionType: "PRIORITY_POST",
    createdAt: "2025-06-07T15:30:00Z",
    startDate: "2025-06-09",
    endDate: "2025-06-16",
  },
];

const columns = [
  {
    title: "Mã đăng ký",
    dataIndex: "subscriptionId",
    key: "subscriptionId",
    align: "center"
  },
  {
    title: "Mã người dùng",
    dataIndex: "gardenerId",
    key: "gardenerId",
    align: "center"
  },
  {
    title: "Mã gói dịch vụ",
    dataIndex: "packageId",
    key: "packageId",
    align: "center"
  },
  {
    title: "Loại dịch vụ",
    dataIndex: "subscriptionType",
    key: "subscriptionType",
    align: "center",
    render: (type) => {
      const labelMap = {
        POST_LIMIT: "Giới hạn đăng bài",
        PRIORITY_POST: "Đăng bài ưu tiên",
      };
      return labelMap[type] || type;
    },
  },
  {
    title: "Ngày bắt đầu",
    dataIndex: "startDate",
    key: "startDate",
    align: "center"
  },
  {
    title: "Ngày kết thúc",
    dataIndex: "endDate",
    key: "endDate",
    align: "center"
  },
  // {
  //   title: "Trạng thái",
  //   dataIndex: "status",
  //   key: "status",
  //   render: (status) => {
  //     const colorMap = {
  //       Active: "green",
  //       Pending: "orange",
  //       Expired: "red",
  //     };
  //     return <Tag color={colorMap[status] || "default"}>{status.toUpperCase()}</Tag>;
  //   },
  // },
];
const ContractTable = () => {

  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const showModal = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <>
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title="Danh sách đơn hàng"
        extra={
          <Space>
            <SearchButton
              placeholder="Tìm kiếm đơn hàng..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Space>
        }
      >   <Table columns={columns} dataSource={data}
        pagination={{
          position: ["bottomCenter", "bottomRight"],
          pageSize: 6,
          showTotal: (total) => `Tổng số ${total} đơn hàng`,
        }}
        /></Card>

      <div >
        <Button type="link" onClick={showModal} style={{ padding: 0 }}>
          Xem điều khoản & chính sách
        </Button>
      </div>



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
      </Modal>
    </>
  );
};


export default ContractTable;
