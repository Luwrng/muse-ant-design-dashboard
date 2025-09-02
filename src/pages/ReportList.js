import React, { useState, useEffect, useMemo } from "react";
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
  message,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { SearchOutlined } from "@ant-design/icons";
import { cleanfood } from "../api_admin";

const { Title } = Typography;

// Map severity
const severityMap = (v) => {
  const s = (v || "").toUpperCase();
  if (s === "HIGH") return { label: "Cao", color: "red" };
  if (s === "MEDIUM") return { label: "Trung bình", color: "orange" };
  if (s === "LOW") return { label: "Thấp", color: "green" };
  return { label: v || "Không rõ", color: "default" };
};

// Map status
const statusMap = (v) => {
  const s = (v || "").toUpperCase();
  if (s === "PENDING") return { label: "Chờ xử lý", color: "red" };
  if (s === "IN_PROGRESS") return { label: "Đang xử lý", color: "orange" };
  if (s === "RESOLVED") return { label: "Đã xử lý", color: "green" };
  if (s === "CLOSED") return { label: "Đã đóng", color: "green" };
  return { label: v || "Không rõ", color: "default" };
};

function ReportList() {
  const [selected, setSelected] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("PENDING");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState("");

  // Fetch data
  const fetchReports = async (page = 1, size = 10, q = "") => {
    setLoading(true);
    try {
      const res = await cleanfood.admin.getReports({ page, size, q });
      const items = Array.isArray(res?.items) ? res.items : [];
      setRows(items);
      setPagination({
        current: page,
        pageSize: size,
        total: Number(res?.total ?? items.length),
      });
    } catch (e) {
      console.error(e);
      message.error("Không tải được danh sách báo cáo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(1, pagination.pageSize, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTableChange = (pg) => {
    fetchReports(pg.current, pg.pageSize, searchText.trim());
  };

  const onSearch = () => {
    fetchReports(1, pagination.pageSize, searchText.trim());
  };

  const openDetail = (record) => {
    setSelected(record);
    setDetailOpen(true);
  };

  const openStatus = (record) => {
    setSelected(record);
    setNewStatus(record?.status || "PENDING");
    setStatusOpen(true);
  };

  const confirmChangeStatus = async () => {
    if (!selected) return;
    try {
      setLoading(true);
      // Gọi API update thực tế nếu có
      // await cleanfood.admin.updateReportStatus({ reportId: selected.reportId, status: newStatus });

      // Update UI lạc quan
      setRows((prev) =>
        prev.map((r) =>
          r.reportId === selected.reportId ? { ...r, status: newStatus } : r
        )
      );
      message.success("Cập nhật trạng thái thành công");
      setStatusOpen(false);
    } catch (e) {
      console.error(e);
      message.error("Cập nhật trạng thái thất bại");
    } finally {
      setLoading(false);
    }
  };

  const downloadOne = async (record) => {
    try {
      setLoading(true);
      // Demo: tải JSON
      const blob = new Blob([JSON.stringify(record, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report_${record.reportId}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      message.error("Tải báo cáo thất bại");
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "Mã báo cáo",
        dataIndex: "reportId",
        key: "reportId",
        width: 230,
        ellipsis: true,
        sorter: (a, b) => String(a.reportId).localeCompare(String(b.reportId)),
      },
      {
        title: "Loại báo cáo",
        dataIndex: "reportType",
        key: "reportType",
        width: 200,
        ellipsis: true,
      },
      {
        title: "Tiêu đề",
        dataIndex: "subject",
        key: "subject",
        width: 260,
        ellipsis: true,
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
        width: 360,
        ellipsis: true,
      },
      {
        title: "Mức độ",
        dataIndex: "severity",
        key: "severity",
        align: "center",
        width: 120,
        render: (v) => {
          const { label, color } = severityMap(v);
          return <Tag color={color}>{label}</Tag>;
        },
      },
      // {
      //   title: "Người báo cáo",
      //   dataIndex: "accountId",
      //   key: "accountId",
      //   align: "center",
      //   width: 140,
      //   render: (v) => v ?? "—",
      // },
      {
        title: "Tạo lúc",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        render: (t) => (t ? new Date(t).toLocaleString("vi-VN") : "—"),
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        align: "center",
        width: 140,
        render: (_, record) => {
          const { label, color } = statusMap(record.status);
          return (
            <Tag
              color={color}
              onClick={() => openStatus(record)}
              style={{ cursor: "pointer" }}
            >
              {label}
            </Tag>
          );
        },
      },
      {
        title: "Thao tác",
        key: "actions",
        align: "center",
        fixed: "right",
        width: 120,
        render: (_, record) => (
          <Space size="middle">
            <FontAwesomeIcon
              icon={faEye}
              onClick={() => openDetail(record)}
              title="Xem chi tiết"
              style={{ fontSize: 16, color: "#1677ff", cursor: "pointer" }}
            />
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: 12 }}
            >
              <Col>
                <Title level={4} style={{ margin: 0 }}>
                  Quản lý báo cáo
                </Title>
              </Col>
              <Col>
                <Space>
                  <Input
                    allowClear
                    placeholder="Tìm theo tiêu đề/mô tả…"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onPressEnter={onSearch}
                    style={{ width: 320 }}
                  />
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={onSearch}
                  >
                    Tìm
                  </Button>
                </Space>
              </Col>
            </Row>

            <Table
              rowKey="reportId"
              columns={columns}
              dataSource={rows}
              loading={loading}
              pagination={{
                ...pagination,
                position: ["bottomCenter", "bottomRight"],
              }}
              onChange={onTableChange}
              scroll={{ x: 1200 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Modal chi tiết */}
      <Modal
        visible={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={<Button onClick={() => setDetailOpen(false)}>Đóng</Button>}
        width={720}
      >
        {selected && (
          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item label="Mã báo cáo">
              {selected.reportId}
            </Descriptions.Item>
            <Descriptions.Item label="Loại">
              {selected.reportType}
            </Descriptions.Item>
            <Descriptions.Item label="Đối tượng">
              {selected.targetType || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Tiêu đề">
              {selected.subject}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả">
              {selected.description || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Mức độ">
              <Tag color={severityMap(selected.severity).color}>
                {severityMap(selected.severity).label}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={statusMap(selected.status).color}>
                {statusMap(selected.status).label}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Người báo cáo">
              {selected.accountId ?? "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Tạo lúc">
              {selected.createdAt
                ? new Date(selected.createdAt).toLocaleString("vi-VN")
                : "—"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Modal đổi trạng thái */}
      <Modal
        visible={statusOpen}
        onCancel={() => setStatusOpen(false)}
        onOk={confirmChangeStatus}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={loading}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <div>Chọn trạng thái mới:</div>
          <Select
            value={newStatus}
            onChange={setNewStatus}
            style={{ width: "100%" }}
            options={[
              { value: "PENDING", label: "Chờ xử lý" },
              { value: "IN_PROGRESS", label: "Đang xử lý" },
              { value: "RESOLVED", label: "Đã xử lý" },
              { value: "CLOSED", label: "Đã đóng" },
            ]}
          />
        </Space>
      </Modal>
    </>
  );
}

export default ReportList;
