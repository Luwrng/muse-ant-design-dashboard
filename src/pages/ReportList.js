import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Typography,
  Tag,
  Space,
  Button,
  Modal,
  Descriptions,
  Input,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;

function ReportList() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Hiển thị modal chi tiết báo cáo
  const showReportDetails = (record) => {
    setSelectedReport(record);
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedReport(null);
  };

  // Cấu hình các cột của bảng
  const columns = [
    {
      title: "Mã báo cáo",
      dataIndex: "ReportId",
      key: "reportId",
      width: 100,
      sorter: (a, b) => a.ReportId - b.ReportId,
    },
    {
      title: "Loại báo cáo",
      dataIndex: "ReportType",
      key: "reportType",
      width: 120,
      filters: [
        { text: "Lỗi", value: "Bug" },
        { text: "Tính năng", value: "Feature" },
        { text: "Hỗ trợ", value: "Support" },
      ],
      onFilter: (value, record) => record.ReportType === value,
    },
    {
      title: "Tiêu đề",
      dataIndex: "Subject",
      key: "subject",
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "Description",
      key: "description",
      width: 300,
      ellipsis: true,
    },
    {
      title: "Mức độ",
      dataIndex: "Severity",
      key: "mucDo",
      align: "center",
      width: 100,
      render: (mucDo) => {
        let mau = "default";
        switch (mucDo.toLowerCase()) {
          case "cao":
            mau = "error";
            break;
          case "trung bình":
            mau = "warning";
            break;
          case "thấp":
            mau = "success";
            break;
          default:
            mau = "default";
        }
        return <Tag color={mau}>{mucDo}</Tag>;
      },
      filters: [
        { text: "Cao", value: "Cao" },
        { text: "Trung bình", value: "Trung bình" },
        { text: "Thấp", value: "Thấp" },
      ],
      onFilter: (value, record) => record.Severity === value,
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      key: "status",
      align: "center",
      width: 120,
      render: (status) => {
        let color = "default";
        switch (status.toLowerCase()) {
          case "open":
            color = "processing";
            break;
          case "in progress":
            color = "warning";
            break;
          case "resolved":
            color = "success";
            break;
          case "closed":
            color = "default";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{status}</Tag>;
      },
      filters: [
        { text: "Mở", value: "Open" },
        { text: "Đang xử lý", value: "In Progress" },
        { text: "Đã xử lý", value: "Resolved" },
        { text: "Đã đóng", value: "Closed" },
      ],
      onFilter: (value, record) => record.Status === value,
    },
    {
      title: "Tài khoản",
      dataIndex: "AccountId",
      key: "accountId",
      width: 100,
    },
    {
      title: "Thao tác",
      key: "actions",
      align:"center",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => showReportDetails(record)}
            style={{
              fontSize: "16px",
              color: "#1890ff",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.2)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Space>
      ),
    },
  ];

  // Dữ liệu giả (thay bằng gọi API thật)
  const data = [
    {
      ReportId: 1,
      ReportType: "Bug",
      Subject: "Lỗi khi khởi động ứng dụng",
      Description: "Ứng dụng bị crash ngay sau khi mở trên Windows 10.",
      Severity: "Cao",
      Status: "Open",
      CreatedAt: "2024-03-20T10:30:00",
      UpdatedAt: "2024-03-20T11:45:00",
      AccountId: "ACC001",
    },
    {
      ReportId: 2,
      ReportType: "Feature",
      Subject: "Yêu cầu thêm chức năng xuất Excel",
      Description: "Người dùng muốn có thể xuất danh sách đơn hàng ra file Excel.",
      Severity: "Trung bình",
      Status: "In Progress",
      CreatedAt: "2024-03-21T09:15:00",
      UpdatedAt: "2024-03-22T08:00:00",
      AccountId: "ACC002",
    },
    {
      ReportId: 3,
      ReportType: "Support",
      Subject: "Không thể đổi mật khẩu",
      Description: "Trang đổi mật khẩu không phản hồi khi nhấn nút lưu.",
      Severity: "Thấp",
      Status: "Resolved",
      CreatedAt: "2024-03-22T14:00:00",
      UpdatedAt: "2024-03-23T09:30:00",
      AccountId: "ACC003",
    },
    {
      ReportId: 4,
      ReportType: "Bug",
      Subject: "Sai định dạng ngày trong báo cáo",
      Description: "Ngày hiển thị theo định dạng MM/DD/YYYY thay vì DD/MM/YYYY.",
      Severity: "Trung bình",
      Status: "Closed",
      CreatedAt: "2024-03-25T12:20:00",
      UpdatedAt: "2024-03-26T10:10:00",
      AccountId: "ACC004",
    },
    {
      ReportId: 5,
      ReportType: "Bug",
      Subject: "Không thể upload ảnh đại diện",
      Description: "Gặp lỗi khi chọn file ảnh có dung lượng lớn hơn 2MB.",
      Severity: "Cao",
      Status: "Open",
      CreatedAt: "2024-03-28T10:10:00",
      UpdatedAt: "2024-03-29T13:05:00",
      AccountId: "ACC005",
    },
    {
      ReportId: 6,
      ReportType: "Feature",
      Subject: "Thêm tính năng thông báo qua email",
      Description: "Người dùng muốn nhận email khi có thay đổi trạng thái đơn hàng.",
      Severity: "Thấp",
      Status: "In Progress",
      CreatedAt: "2024-03-30T11:00:00",
      UpdatedAt: "2024-04-01T09:00:00",
      AccountId: "ACC006",
    },
    {
      ReportId: 7,
      ReportType: "Support",
      Subject: "Không nhận được mã OTP",
      Description: "Không nhận được mã OTP qua SMS khi đăng nhập.",
      Severity: "Cao",
      Status: "Resolved",
      CreatedAt: "2024-04-02T16:45:00",
      UpdatedAt: "2024-04-03T10:20:00",
      AccountId: "ACC007",
    },
    {
      ReportId: 8,
      ReportType: "Bug",
      Subject: "Giao diện bị vỡ trên mobile",
      Description: "Một số thành phần bị tràn màn hình trên iPhone 12.",
      Severity: "Trung bình",
      Status: "Open",
      CreatedAt: "2024-04-04T08:30:00",
      UpdatedAt: "2024-04-04T08:30:00",
      AccountId: "ACC008",
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
              title={
                <Row justify="space-between" align="middle">
                  <Col>
                    <Title level={5}>Danh sách báo cáo</Title>
                  </Col>
                  <Col>
                    <Input
                      className="header-search"
                      style={{
                        width: "200px",
                        borderRadius: "10px",
                        height: "50px",
                      }}
                      placeholder="Tìm kiếm báo cáo..."
                      prefix={<SearchOutlined />}
                    />
                  </Col>
                </Row>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  rowKey="ReportId"
                  pagination={{
                    position: ["bottomCenter", "right"],
                    pageSize: 10,

                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} trong tổng ${total} báo cáo`,
                  }}
                  className="ant-border-space"
                  scroll={{ x: 1500 }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="Chi tiết báo cáo"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="download"
            type="primary"
            icon={<FontAwesomeIcon icon={faFileDownload} />}
          >
            Tải báo cáo
          </Button>,
          <Button key="close" onClick={handleCancel}>
            Đóng
          </Button>,
        ]}
        width={800}
      >
        {selectedReport && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Mã báo cáo" span={2}>
              {selectedReport.ReportId}
            </Descriptions.Item>
            <Descriptions.Item label="Loại báo cáo" span={2}>
              {selectedReport.ReportType}
            </Descriptions.Item>
            <Descriptions.Item label="Tiêu đề" span={2}>
              {selectedReport.Subject}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả" span={2}>
              {selectedReport.Description}
            </Descriptions.Item>
            <Descriptions.Item label="Mức độ">
              <Tag
                color={
                  selectedReport.Severity.toLowerCase() === "high"
                    ? "error"
                    : selectedReport.Severity.toLowerCase() === "medium"
                      ? "warning"
                      : "success"
                }
              >
                {selectedReport.Severity}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag
                color={
                  selectedReport.Status.toLowerCase() === "open"
                    ? "processing"
                    : selectedReport.Status.toLowerCase() === "in progress"
                      ? "warning"
                      : selectedReport.Status.toLowerCase() === "resolved"
                        ? "success"
                        : "default"
                }
              >
                {selectedReport.Status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {new Date(selectedReport.CreatedAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
              {new Date(selectedReport.UpdatedAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Tài khoản" span={2}>
              {selectedReport.AccountId}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}

export default ReportList;
