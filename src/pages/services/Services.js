import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Tag,
  Descriptions,
  Row,
  Col,
  Tooltip,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

import DetailButton from "../../components/button/DetailButton";
import EditButton from "../../components/button/EditButton";
import DeleteButton from "../../components/button/DeleteButton";
import SearchButton from "../../components/button/SearchButton";
import Services_add from "./Services_add";

const { Option } = Select;

function Services() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [hoveredStatus, setHoveredStatus] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setLoading(true);
    setData(mockData);
    setLoading(false);
  }, []);
  const mockData = [
    {
      serviceId: "POST_LIMIT",
      serviceName: "Giới hạn đăng bài",
      description: "Dịch vụ quy định số lượng bài đăng sản phẩm mà mỗi Gardener có thể tạo và hiển thị công khai trên nền tảng trong cùng một thời điểm.",
      status: "Active",
      packages: [
        {
          serviceFeatureId: 1,
          name: "Gói cơ bản",
          description: "Cho phép tạo tối đa 5 bài đăng sản phẩm cùng lúc. Phù hợp với những Gardener mới hoặc có số lượng sản phẩm ít.",
          defaultValue: "Enabled",
          status: "Active",
          key: "1"
        },
        {
          serviceFeatureId: 2,
          name: "Gói nâng cao",
          description: "Cho phép tạo tối đa 10 bài đăng sản phẩm đồng thời. Dành cho Gardener có danh mục sản phẩm phong phú.",
          defaultValue: "Disabled",
          status: "Inactive",
          key: "2"
        }
      ]
    },
    {
      serviceId: "PRIORITY_POST",
      serviceName: "Đăng bài ưu tiên",
      description: "Dịch vụ giúp bài đăng của Gardener được hiển thị ở các vị trí nổi bật trên nền tảng (trang chủ, đầu danh mục, v.v), giúp tăng khả năng tiếp cận khách hàng.",
      status: "Active",
      packages: [
        {
          serviceFeatureId: 3,
          name: "Gói ưu tiên cơ bản",
          description: "Bài đăng sẽ được ưu tiên hiển thị ở đầu danh sách sản phẩm trong 3 ngày kể từ lúc đăng.",
          defaultValue: "Disabled",
          status: "Inactive",
          key: "3"
        },
        {
          serviceFeatureId: 4,
          name: "Gói ưu tiên nâng cao",
          description: "Bài đăng sẽ hiển thị ở đầu danh sách trong 7 ngày và được gắn biểu tượng nổi bật để thu hút khách hàng.",
          defaultValue: "Disabled",
          status: "Inactive",
          key: "4"
        }
      ]
    }
  ];

  const columns = [
    {
      title: "Tên Dịch Vụ",
      dataIndex: "serviceName",
      key: "serviceName",
      align: "center"
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: 400,
      ellipsis: true,
      showTitle: false,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      align: "center",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>
          {status === "Active" ? "Hoạt Động" : "Tạm Dừng"}
        </Tag>
      ),
    },
    {
      title: "Thao Tác",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <DetailButton onClick={() => showServiceDetails(record)} />
          <EditButton onClick={() => showModalEdit(record)} />
          <DeleteButton record={record} tooltip="Xóa" setData={setData} />

        </Space>
      ),
    },
  ];

  const handleStatusChange = (value) => {
    message.success(`Status changed to ${value}`);
  };


  const handleAddService = (serviceData) => {
    console.log("Dữ liệu dịch vụ:", serviceData);
    // TODO: Gọi API lưu service ở đây
  };
  const showModal = (record) => {
    setEditingId(record.serviceFeatureId);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };
  const showModalEdit = (record) => {
    setEditingId(record.serviceFeatureId);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };
  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingId === null) {
          const newFeature = {
            ...values,
            serviceFeatureId:
              Math.max(...data.map((d) => d.serviceFeatureId)) + 1,
          };
          setData([...data, newFeature]);
          message.success("Service feature added successfully");
        } else {
          setData(
            data.map((item) =>
              item.serviceFeatureId === editingId
                ? { ...item, ...values }
                : item,
            ),
          );
          message.success("Service feature updated successfully");
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const showServiceDetails = (record) => {
    setSelectedService(record);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    message.info("Chức năng đang được phát triển");
  };
  const handleDelete = (record) => {
    setData((prev) =>
      prev.filter((item) => item.serviceFeatureId !== record.serviceFeatureId)
    );
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    width: hovered ? 180 : 48,
    height: 44,
    background: "#52c41a",
    color: "#fff",
    borderRadius: hovered ? 8 : "50%",
    cursor: "pointer",
    fontWeight: "bold",
    padding: hovered ? "0 16px" : 0,
    overflow: "hidden",
    gap: 8,
  };

  const textStyle = {
    whiteSpace: "nowrap",
    opacity: hovered ? 1 : 0,
    transform: hovered ? "translateX(0)" : "translateX(-10px)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Quản Lý Dịch Vụ"
              extra={
                <Space size={20}>
                  <SearchButton
                    placeholder="Tìm kiếm dịch vụ"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Thêm Dịch Vụ MớI
                  </Button>
                  <Services_add
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddService}
                    mockData={mockData}
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
                    total: data.length,
                    showTotal: (total) => `Tổng số ${total} dịch vụ`,
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row >
      </div >

      <Modal
        title="Chi Tiết Dịch Vụ"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedService && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Tên Dịch Vụ">
              {selectedService.serviceName}
            </Descriptions.Item>
            <Descriptions.Item label="Mô Tả">
              {selectedService.description}
            </Descriptions.Item>
            <Descriptions.Item label="Gói Dịch Vụ">
              {selectedService.packages.map((item) => (
                <div>
                  <Descriptions.Item label={item.name}>
                    <span>- {item.name} ({item.description})</span>

                  </Descriptions.Item>
                </div>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng Thái">
              <Tag color={selectedService.status === "Active" ? "success" : "error"}>
                {selectedService.status === "Active" ? "Hoạt Động" : "Tạm Dừng"}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}




export default Services;




