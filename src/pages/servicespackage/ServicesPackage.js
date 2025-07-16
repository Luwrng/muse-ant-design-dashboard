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






  // Vô hiệu hóa gói dịch vụ (tạm dừng bán)
  const handleDisablePackage = (record) => {
    Modal.confirm({
      title: "Xác nhận vô hiệu hóa",
      content: `Bạn có chắc chắn muốn tạm dừng gói dịch vụ "${record.name}"?`,
      okText: "Vô hiệu hóa",
      cancelText: "Hủy",
      centered: true,
      onOk: async () => {
        try {
          await cleanfood.admin.disableServicePackage(record);
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
  const { Text } = Typography;


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
            tooltip="Kích hoạt gói"
            onClick={() => {
              Modal.confirm({
                title: "Xác nhận kích hoạt",
                content: `Bạn có chắc chắn muốn kích hoạt lại gói dịch vụ "${record.name}" không?`,
                okText: "Kích hoạt",
                cancelText: "Hủy",
                centered: true,
                onOk: async () => {
                  try {
                    await cleanfood.admin.activateServicePackage(record);
                    message.success("Gói dịch vụ đã được kích hoạt!");
                    fetchServicePackage();
                  } catch (error) {
                    console.error("Lỗi khi kích hoạt:", error);
                    message.error("Kích hoạt thất bại!");
                  }
                },
              });
            }}
          />

          {/* Nút xóa (hoặc vô hiệu hóa) */}
          <DeleteButton
            record={record}
            // tooltip="Vô hiệu hóa gói dịch vụ"
            type="package"
            onDeleteSuccess={fetchPackage}
          />


        </Space>
      ),

  const showModal = (record) => {
    setSelectedPackage(record);
    setIsModalVisible(true);
  };

  const data = [
    {
      key: "1",
      name: "Gói Đăng Bài Cơ Bản",
      description:
        "Cho phép Gardener đăng và hiển thị số lượng bài viết giới hạn với mức ưu tiên thấp.",
      price: 500000,
      duration: 30, // 1 tháng
      status: "active",
      services: [
        "Tối đa 5 bài đăng sản phẩm cùng lúc",
        "Không ưu tiên hiển thị trên trang chủ",
        "Không có nhãn nổi bật",
        "Bài đăng hết hạn sau 15 ngày",
      ],
    },
    {
      key: "2",
      name: "Gói Đăng Bài Nâng Cao",
      description:
        "Tăng giới hạn bài đăng và thời gian hiển thị, phù hợp với Gardener có danh mục đa dạng.",
      price: 1200000,
      duration: 90, // 3 tháng
      status: "active",
      services: [
        "Tối đa 10 bài đăng sản phẩm cùng lúc",
        "Ưu tiên hiển thị đầu danh mục trong 3 ngày",
        "Gắn nhãn nổi bật cho 2 bài đăng mỗi tháng",
        "Bài đăng hết hạn sau 30 ngày",
      ],
    },
    {
      key: "3",
      name: "Gói Đăng Bài Doanh Nghiệp",
      description:
        "Dành cho đơn vị kinh doanh lớn, tối ưu khả năng hiển thị và tiếp cận khách hàng.",
      price: 2500000,
      duration: 180, // 6 tháng
      status: "inactive",
      services: [
        "Không giới hạn số bài đăng cùng lúc",
        "Ưu tiên hiển thị toàn thời gian",
        "Tất cả bài đăng được gắn nhãn nổi bật",
        "Hỗ trợ nội dung và thiết kế bài đăng chuyên nghiệp",
      ],
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
                {selectedPackage.status === "active" ? "Đang Bán" : "Ngừng Bán"}
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
    </>
  );
};

export default ServicesPackage;
