import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  Tooltip,
  Button,
  Card,
  Row,
  Col,
  Modal,
  Descriptions,
  message,
  Select,
  Switch
} from "antd";
import DetailButton from "../../components/button/DetailButton";
import EditButton from "../../components/button/EditButton";
import DeleteButton from "../../components/button/DeleteButton";
import SearchButton from "../../components/button/SearchButton";
import AddButton from "../../components/button/AddButton";
import Service_add from "./Service_add";

import { cleanfood } from "../../api_admin";

const { Option } = Select;

const ServiceList = () => {
  const [dataSource, setDataSources] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editRecord, setEditRecord] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchService = async (page = 1, size = 10, search = "") => {
    try {
      const data = await cleanfood.admin.getServiceFeatures({ page, size, search });
      const formattedData = data.items.map((item) => ({
        key: item.serviceFeatureId,
        action: item.serviceFeatureName,
        value: item.defaultValue,
        description: item.description,
        status: item.status,
      }));
      setDataSources(formattedData);
      setTotal(data.total);
      setCurrentPage(data.page);
      setPageSize(data.size || size);
    } catch (error) {
      console.error("Lỗi lấy danh sách dịch vụ:", error);
    }
  };

  useEffect(() => {
    fetchService(1, pageSize, searchText);
  }, [searchText]);

  const showEditModal = (record) => {
    setEditRecord(record);
    setEditStatus(record.status);
    setEditModalVisible(true);
  };

  const handleUpdateStatus = async () => {
    try {
      const payload = {
        serviceFeatureName: editRecord.action, // GIỮ NGUYÊN không đổi
        description: editRecord.description,   // Có thể giữ nguyên hoặc thay đổi
        status: editStatus,                    // Cập nhật mới
        action: 0,                             // Bắt buộc
      };

      await cleanfood.admin.updateServiceFeature(editRecord.key, payload);
      message.success("Cập nhật trạng thái thành công!");
      setEditModalVisible(false);
      fetchService(currentPage, pageSize, searchText);
    } catch (error) {
      console.error("Lỗi updateServiceFeature:", error);
      if (error.response?.data?.errors) {
        const messages = Object.entries(error.response.data.errors)
          .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
          .join("\n");
        message.error(messages);
      } else {
        message.error("Cập nhật trạng thái thất bại!");
      }
    }
  };


  const handleAddService = async (newServiceData) => {
    try {
      await cleanfood.admin.createServiceFeature(newServiceData);
      message.success("Thêm dịch vụ thành công!");
      setAddModalVisible(false);
      fetchService(currentPage, pageSize, searchText);
    } catch (error) {
      console.error("Lỗi khi thêm dịch vụ:", error);
      message.error("Thêm dịch vụ thất bại!");
    }
  };

  const columns = [
    {
      title: "Hành Động",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Giá Trị",
      dataIndex: "value",
      key: "value",
      align: "center",
      sorter: (a, b) => Number(a.value) - Number(b.value),
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
      align: "left",
      width: 400,
      ellipsis: { showTitle: false },
      render: (desc) => <Tooltip title={desc}>{desc}</Tooltip>,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>
          {status === "ACTIVE" ? "Hoạt Động" : "Tạm Dừng"}
        </Tag>
      ),
    },
    {
      title: "Thao Tác",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <DetailButton
            tooltip="Xem chi tiết"
            onClick={() => {
              setSelectedRecord(record);
              setDetailModalVisible(true);
            }}
          />
          <EditButton tooltip="Chỉnh sửa" onClick={() => showEditModal(record)} />
          <DeleteButton
            record={record}
            tooltip="Xóa"
            type="feature"
            onDeleteSuccess={() => fetchService(currentPage, pageSize, searchText)}
          />

        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Modal Chi tiết */}
      <Modal
        open={detailModalVisible}
        title="Chi Tiết Dịch Vụ"
        onCancel={() => setDetailModalVisible(false)}
        footer={<Button onClick={() => setDetailModalVisible(false)}>Đóng</Button>}
      >
        {selectedRecord && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Hành Động">{selectedRecord.action}</Descriptions.Item>
            <Descriptions.Item label="Giá Trị">{selectedRecord.value}</Descriptions.Item>
            <Descriptions.Item label="Mô Tả">{selectedRecord.description}</Descriptions.Item>
            <Descriptions.Item label="Trạng Thái">
              <Tag color={selectedRecord.status === "ACTIVE" ? "green" : "red"}>
                {selectedRecord.status === "ACTIVE" ? "Hoạt Động" : "Tạm Dừng"}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Table & Thêm dịch vụ */}
      <Card
        bordered={false}
        title="Danh Sách Dịch Vụ"
        className="criclebox tablespace mb-24"
        extra={
          <Row gutter={12}>
            <Col>
              <SearchButton
                placeholder="Tìm kiếm"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col>
              <AddButton onClick={() => setAddModalVisible(true)} />
            </Col>
          </Row>
        }
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            position: ["bottomCenter", "bottomRight"],
            current: currentPage,
            pageSize: pageSize,
            total: total,
            onChange: (page, size) => {
              fetchService(page, size, searchText);
            },
          }}
        />

        {/* Modal Thêm dịch vụ */}
        <Modal
          open={addModalVisible}
          title="Thêm Dịch Vụ"
          onCancel={() => setAddModalVisible(false)}
          footer={null}
          destroyOnClose
        >
          <Service_add
            onSubmit={handleAddService}
            onCancel={() => setAddModalVisible(false)}
          />
        </Modal>

        {/* Modal chỉnh sửa trạng thái */}
        <Modal
          open={editModalVisible}
          title="Chỉnh sửa trạng thái"
          onCancel={() => setEditModalVisible(false)}
          onOk={handleUpdateStatus}
          okText="Lưu"
          cancelText="Hủy"
        >
          <p>Trạng thái hiện tại của dịch vụ: <strong>{editRecord?.action}</strong></p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
            <Switch
              checked={editStatus === "ACTIVE"}
              checkedChildren="Hoạt Động"
              unCheckedChildren="Tạm Dừng"
              onChange={(checked) => setEditStatus(checked ? "ACTIVE" : "INACTIVE")}
              className="custom-switch"
              style={{

                backgroundColor: editStatus === "ACTIVE" ? "#52c41a" : "#f5222d",
                fontWeight: "bold",
              }}
            />
          </div>


        </Modal>
      </Card>
    </>
  );
};

export default ServiceList;
