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
import { cleanfood } from "../api_admin";

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
  const fetchReports = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const res = await cleanfood.admin.getReports({ page, size });
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
    fetchReports(pagination.current, pagination.pageSize);
  };

  const handleSearch = () => {
    fetchReports(1, pagination.pageSize);
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
      {/* ...phần render như trên, đã bao gồm Modal chi tiết và cập nhật trạng thái */}
    </>
  );
}

export default ReportList;
