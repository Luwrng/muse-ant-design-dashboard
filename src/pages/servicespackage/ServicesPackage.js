import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  message,
  Tag,
  Space,
  Descriptions,
  List,
  Popconfirm,
  Input,
  Form,
  Select
} from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import DetailButton from "../../components/button/DetailButton";
import EditButton from "../../components/button/EditButton";
import DeleteButton from "../../components/button/DeleteButton";
import SearchButton from "../../components/button/SearchButton";
import AddButton from "../../components/button/AddButton";
import Package_add from "./Package_add";
import { cleanfood } from "../../api_admin";

const ServicesPackage = () => {
  // State chứa danh sách các gói dịch vụ (hiển thị trong bảng)
  const [dataSource, setDataSource] = useState([]);

  // State chứa dữ liệu chi tiết từng gói (dùng trong modal và form thêm)
  const [packageList, setPackageList] = useState([]);

  // State hiển thị modal chi tiết gói
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State hiển thị modal thêm dịch vụ
  const [addServiceModalVisible, setAddServiceModalVisible] = useState(false);

  // Gói đang được chọn để hiển thị chi tiết
  const [selectedPackage, setSelectedPackage] = useState(null);

  // State cho ô tìm kiếm

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState("null");
  const [form] = Form.useForm();

  // ✅ Gọi API lấy danh sách gói dịch vụ
  const fetchService = async (page = 1, size = 10, search = "") => {
    try {
      const res = await cleanfood.admin.getPackage({ page, size, search });

      const formatted = res.items.map((item) => ({
        key: item.servicePackageId,
        name: item.packageName,
        description: item.description,
        price: item.price,
        duration: item.duration,
        status: item.status.toLowerCase(),
        services: item.features.map((f) => f.serviceFeatureName),
      }));

      setDataSource(formatted);
      setTotal(res.total || 0);
      setCurrentPage(res.page || page);
      setPageSize(res.size || size);
    } catch (error) {
      console.error("Lỗi khi fetch gói dịch vụ:", error);
      message.error("Không thể tải danh sách gói dịch vụ.");
    }
  };
  useEffect(() => {
    fetchService(currentPage, pageSize, searchText);
  }, [currentPage, pageSize, searchText]);

  // Vô hiệu hóa gói dịch vụ (tạm dừng Hoạt động  )
  const handleDisablePackage = (record) => {
    Modal.confirm({
      title: "Xác nhận vô hiệu hóa",
      content: `Bạn có chắc chắn muốn tạm dừng gói dịch vụ "${record.name}"?`,
      okText: "Vô hiệu hóa",
      cancelText: "Hủy",
      centered: true,
      onOk: async () => {
        try {
          await cleanfood.admin.disableServicePackage(record.key);
          message.success("Đã tạm dừng gói dịch vụ.");
          fetchPackage(); // reload lại danh sách sau khi cập nhật
        } catch (error) {
          console.error("Lỗi khi vô hiệu hóa:", error);
          message.error("Không thể vô hiệu hóa gói dịch vụ.");
        }
      },
    });
  };

  // Gọi API để lấy danh sách gói dịch vụ (gọi lại sau khi tạo/kích hoạt)
  const fetchServicePackage = async () => {
    try {
      const response = await cleanfood.admin.getPackage();
      const packages = response.items.map((pkg) => ({
        key: pkg.packageId,
        name: pkg.packageName,
        status: pkg.status,
      }));
      setPackageList(packages);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách gói:", error);
      message.error("Không thể tải danh sách gói dịch vụ.");
    }
  };

  // Gọi API và format dữ liệu bảng + dữ liệu cho modal/form
  const fetchPackage = async () => {
    try {
      const res = await cleanfood.admin.getPackage();
      const data = res.items || [];

      const formattedData = data.map((item) => ({
        key: item.servicePackageId,
        name: item.packageName,
        description: item.description,
        price: item.price,
        duration: item.duration,
        status: item.status.toLowerCase(), // convert về chữ thường
        services: item.features.map((feature) => feature.serviceFeatureName),
      }));

      const formattedForModal = data.map((pkg) => ({
        key: pkg.servicePackageId,
        name: pkg.packageName,
        description: pkg.description,
        packages: pkg.features.map((feature) => ({
          key: feature.serviceFeatureId,
          name: feature.serviceFeatureName,
          description: feature.description,
        })),
      }));

      setPackageList(formattedForModal);
      setPackageList(formattedForModal);
    } catch (error) {
      console.error("Lỗi khi fetchPackage:", error);
      message.error("Không thể tải danh sách gói dịch vụ");
    }
  };
  const handelUpdatePackage = async (values) => {
    try {
      await cleanfood.admin.updateServicePackage(values);
      message.success("Cập nhật thành công").
        setEditModalVisible(false);
      fetch(currentPage, pageSize, searchText)
    } catch (error) {
      console.error("Lỗi cập nhật :", error);
      message.error("Cập nhật thất bạn !!!!");
    }
  }

  // Mở modal chi tiết gói
  const showPackageDetails = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalVisible(true);
  };

  // Xử lý khi submit form thêm gói dịch vụ mới
  const handleAddService = async (values) => {
    try {
      await cleanfood.admin.createPackage(values);
      message.success("Thêm gói dịch vụ thành công!");
      setAddServiceModalVisible(false);
      fetchPackage();
    } catch (error) {
      message.error("Thêm gói dịch vụ thất bại!");
      console.error(error);
    }
  };
  // const { Text } = Typography;

  const columns = [
    {
      title: "Tên Gói Dịch Vụ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (p) => `${Number(p).toLocaleString()} đ`,
      align: "center",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Thời Hạn",
      dataIndex: "duration",
      render: (d) => `${d} ngày`,
      align: "center",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      align: "center",
      render: (status) => (
        <Tag color={status === "active" ? "success" : "error"}>
          {status === "active" ? "Hoạt động" : "Ngừng họat động"}
        </Tag>
      ),
    },
    {
      title: "Thao Tác",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          {/* Nút xem chi tiết */}
          <DetailButton onClick={() => showPackageDetails(record)} />

          {/* Nút kích hoạt gói dịch vụ */}
          <EditButton
            tooltip="Chỉnh sửa"
            onClick={() => {
              setEditingPackage({
                packageId: record.servicePackageId || record.key,
                packageName: record.name,
                description: record.description,
                status: record.status === "active" ? "ACTIVE" : "INACTIVE",
              });
              setEditModalVisible(true);
            }}
          />


          {/* Nút xóa (hoặc vô hiệu hóa) */}
          <DeleteButton
            tooltip="Dừng"
            record={record}
            type="package"
            onDeleteSuccess={() =>
              fetchService(currentPage, pageSize, searchText)
            }
          />
        </Space>
      ),
    },
  ];

  const showModal = (record) => {
    setSelectedPackage(record);
    setIsModalVisible(true);
  };



  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Quản Lý Gói Dịch Vụ"
              extra={
                <Space>
                  {/* Ô tìm kiếm */}
                  <SearchButton
                    placeholder="Tìm kiếm gói dịch vụ..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Button type="primary">Thêm Gói Mới</Button>
                  {/* Nút thêm mới */}
                  {/*<AddButton onClick={() => setAddServiceModalVisible(true)} />*/}
                </Space>
              }
            >
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
              />

              {/* Modal thêm dịch vụ */}
              <Modal
                open={addServiceModalVisible}
                onCancel={() => setAddServiceModalVisible(false)}
                footer={null}
                title="Thêm Dịch Vụ Mới"
                width={800}
                destroyOnClose
              >
                <Package_add
                  onSubmit={handleAddService}
                  onCancel={() => setAddServiceModalVisible(false)}
                  dat={packageList}
                />
              </Modal>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Modal Chi tiết gói dịch vụ */}
      <Modal
        title="Chi Tiết Gói Dịch Vụ"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        {selectedPackage && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Tên Gói">
              {selectedPackage.name}
            </Descriptions.Item>
            <Descriptions.Item label="Mô Tả">
              {selectedPackage.description}
            </Descriptions.Item>
            <Descriptions.Item label="Giá">
              {`${Number(selectedPackage.price).toLocaleString()} đ`}
            </Descriptions.Item>
            <Descriptions.Item label="Thời Hạn">
              {`${selectedPackage.duration} ngày`}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng Thái">
              <Tag
                color={
                  selectedPackage.status === "active" ? "success" : "error"
                }
              >
                {selectedPackage.status === "active" ? "Hoạt động" : "Ngừng Hoạt động "}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Dịch Vụ Bao Gồm">
              <List
                size="small"
                dataSource={selectedPackage.services}
                renderItem={(item) => <List.Item>- {item}</List.Item>}
              />
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title="Chỉnh sửa gói dịch vụ"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              try {
                // Gọi hàm cập nhật gói
                await cleanfood.admin.updateServicePackage(values);

                // Nếu trạng thái là ACTIVE → gọi kích hoạt
                if (values.status === "ACTIVE") {
                  await cleanfood.admin.activateServicePackage(values.packageId);
                }

                message.success("🎉 Gói dịch vụ đã được cập nhật thành công!");
                setEditModalVisible(false);
                fetchService(currentPage, pageSize, searchText);
              } catch (err) {
                console.error("❌ Cập nhật thất bại:", err);
                message.error("❌ Cập nhật thất bại!");
              }
            })
            .catch((err) => {
              console.error("❌ Lỗi form:", err);
            });
        }}
        okText="Lưu"
        cancelText="Hủy"
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingPackage}
        >
          <Form.Item name="packageId" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            label="Tên gói dịch vụ"
            name="packageName"
            rules={[{ required: true, message: "Vui lòng nhập tên gói!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Select>
              <Select.Option value="ACTIVE">Đang hoạt động</Select.Option>
              <Select.Option value="INACTIVE">Ngưng hoạt động</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>



    </>
  );
};

export default ServicesPackage;
