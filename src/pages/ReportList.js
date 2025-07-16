import React, { useState, useEffect } from "react";
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
  Select,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { SearchOutlined } from "@ant-design/icons";
import { cleanfood } from "../api_admin"; // Đường dẫn chứa getReports API

const { Title } = Typography;

function ReportList() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchText, setSearchText] = useState("");

  // Gọi API lấy danh sách báo cáo
  const fetchReports = async (page = 1, size = 10, search = "") => {
    setLoading(true);
    try {
      const res = await cleanfood.admin.getReports({ page, size, search });
      setDataSource(res.items);
      setPagination({
        current: page,
        pageSize: size,
        total: res.total || res.items.length,
      });
    } catch (err) {
      console.error("Lỗi khi fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleTableChange = (pagination) => {
    fetchReports(pagination.current, pagination.pageSize, searchText);
  };

  const handleSearch = () => {
    fetchReports(1, pagination.pageSize, searchText);
  };

  const showReportDetails = (record) => {
    setSelectedReport(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedReport(null);
  };

  const handleStatusClick = (record) => {
    setSelectedReport(record);
    setNewStatus(record.Status);
    setStatusModalVisible(true);
  };

  const handleConfirmStatusChange = () => {
    const updated = dataSource.map((item) =>
      item.ReportId === selectedReport.ReportId
        ? { ...item, Status: newStatus }
        : item
    );
    setDataSource(updated);
    setStatusModalVisible(false);
  };

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
    },
    {
      title: "Người báo cáo",
      dataIndex: "AccountId",
      key: "accountId",
      align: "center",
      width: 100,
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => showReportDetails(record)}
            style={{ fontSize: "16px", color: "#1890ff", cursor: "pointer" }}
          />
        </Space>
      ),
    },
    {
      title: "Trạng thái xử lý",
      dataIndex: "Status",
      key: "status",
      align: "center",
      width: 130,
      render: (_, record) => {
        let mau = "default";
        let nhan = "";
        switch (record.Status) {
          case "Open":
            mau = "red";
            nhan = "Chưa sửa";
            break;
          case "In Progress":
            mau = "orange";
            nhan = "Đang sửa";
            break;
          case "Resolved":
          case "Closed":
            mau = "green";
            nhan = "Đã sửa";
            break;
          default:
            nhan = record.Status;
        }
        return (
          <Tag color={mau} onClick={() => handleStatusClick(record)} style={{ cursor: "pointer" }}>
            {nhan}
          </Tag>
        );
      },
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
                    <Input.Search
                      allowClear
                      enterButton={<SearchOutlined />}
                      placeholder="Tìm kiếm báo cáo..."
                      style={{ width: 250 }}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onSearch={handleSearch}
                    />
                  </Col>
                </Row>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  rowKey="ReportId"
                  pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    position: ["bottomCenter", "right"],
                  }}
                  loading={loading}
                  onChange={handleTableChange}
                  className="ant-border-space"
                  scroll={{ x: 1500 }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Modal chi tiết báo cáo */}
      <Modal
        title={`Chi tiết báo cáo #${selectedReport?.ReportId || ""}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="download" type="primary" icon={<FontAwesomeIcon icon={faFileDownload} />}>Tải báo cáo</Button>,
          <Button key="close" onClick={handleCancel}>Đóng</Button>,
        ]}
        width={800}
      >
        {selectedReport && (
          <Descriptions bordered column={2} layout="vertical">
            <Descriptions.Item label="Người báo cáo">{selectedReport.AccountId}</Descriptions.Item>
            <Descriptions.Item label="Mã báo cáo">{selectedReport.ReportId}</Descriptions.Item>
            <Descriptions.Item label="Loại báo cáo">{selectedReport.ReportType}</Descriptions.Item>
            <Descriptions.Item label="Tiêu đề">{selectedReport.Subject}</Descriptions.Item>
            <Descriptions.Item label="Mô tả" span={2}>{selectedReport.Description}</Descriptions.Item>
            <Descriptions.Item label="Mức độ">
              <Tag color={selectedReport.Severity.toLowerCase() === "cao" ? "error" : selectedReport.Severity.toLowerCase() === "trung bình" ? "warning" : "success"}>
                {selectedReport.Severity}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái xử lý">
              <Tag color={selectedReport.Status === "Open" ? "red" : selectedReport.Status === "In Progress" ? "orange" : ["Resolved", "Closed"].includes(selectedReport.Status) ? "green" : "default"}>
                {selectedReport.Status === "Open"
                  ? "Chưa sửa"
                  : selectedReport.Status === "In Progress"
                    ? "Đang sửa"
                    : ["Resolved", "Closed"].includes(selectedReport.Status)
                      ? "Đã sửa"
                      : selectedReport.Status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {new Date(selectedReport.CreatedAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
              {new Date(selectedReport.UpdatedAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Modal cập nhật trạng thái */}
      <Modal
        open={statusModalVisible}
        title="Cập nhật trạng thái"
        onCancel={() => setStatusModalVisible(false)}
        onOk={handleConfirmStatusChange}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Select
          style={{ width: "100%" }}
          value={newStatus}
          onChange={(value) => setNewStatus(value)}
          options={[
            { label: "Chưa sửa", value: "Open" },
            { label: "Đang sửa", value: "In Progress" },
            { label: "Đã sửa", value: "Resolved" },
          ]}
        />
      </Modal>
    </>
  );
}

export default ReportList;
