import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  Card,
  Typography,
  Row,
  Col,
  Space,
  Spin,
  Modal,
  Descriptions,
  Form,
  Input,
  Button,
} from "antd";
import { cleanfood } from "../api_admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import DetailButton from "../components/button/DetailButton";
import EditButton from "../components/button/EditButton";
import SearchButton from "../components/button/SearchButton";
import AddButton from "../components/button/AddButton";
import DeleteButton from "../components/button/DeleteButton";

const { Title } = Typography;

function ProductCategoryList() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [addForm] = Form.useForm();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");

  const fetchCategories = useCallback(async (page = 1, size = 10, keyword = "") => {
    setLoading(true);
    try {
      const res = await cleanfood.productCategory.getAll({ page, size, keyword }); // keyword là searchText
      setData(res.items || []);
      setPagination({
        page,
        size,
        total: res.total || 0,
      });
    } catch (error) {
      console.error("Lỗi khi load danh mục:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories(pagination.page, pagination.size, searchText);
  }, [pagination.page, pagination.size, searchText, fetchCategories]);


  const handleTableChange = (newPagination) => {
    setPagination((prev) => ({
      ...prev,
      page: newPagination.current,
      size: newPagination.pageSize,
    }));
  };

  const showUserDetails = (record) => {
    setSelectedCategory(record);
    setIsDetailModalVisible(true);
  };

  const showEditModal = (record) => {
    setSelectedCategory(record);
    editForm.setFieldsValue({
      name: record.name,
      description: record.description,
    });
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = async () => {
    try {
      const values = await editForm.validateFields();
      await cleanfood.productCategory.update(selectedCategory.productCategoryId, values);
      setIsEditModalVisible(false);
      fetchCategories(pagination.page, pagination.size);
    } catch (err) {
      console.error("Cập nhật thất bại:", err);
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_, __, index) =>
        (pagination.page - 1) * pagination.size + index + 1,
      width: 80,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text) => {
        const maxLength = 100;
        if (!text) return "-";
        return text.length > maxLength
          ? text.slice(0, maxLength) + "..."
          : text;
      },
    },
    {
      title: "Hành động",
      key: "detail",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Space>
          <DetailButton
            onClick={() => showUserDetails(record)}
            icon={faEye}
            title="Xem chi tiết"
          />
          <EditButton
            tooltip="Chỉnh sửa"
            onClick={() => showEditModal(record)}
          />
          <DeleteButton
            record={record}
            tooltip="Xóa danh mục"
            type="category"
            onDeleteSuccess={() =>
              fetchCategories(currentPage, pageSize, searchText)
            }
          />

        </Space>
      ),
    },
  ];

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title={
              <Row justify="space-between" align="middle">
                <Col>
                  <Title level={5}>Danh sách danh mục sản phẩm</Title>
                </Col>

                <Col>
                  <Space>
                    <SearchButton
                      placeholder="Tìm kiếm"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <AddButton onClick={() => setAddModalVisible(true)} />
                  </Space>
                </Col>

              </Row>
            }
          >
            <div className="table-responsive">
              {loading ? (
                <Spin size="large" />
              ) : (
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{
                    position: ["bottomCenter", "bottomRight"],
                    current: currentPage,
                    pageSize: pageSize,
                    total: total,
                    onChange: (page, size) => {
                      fetchCategories(page, size, searchText);
                    },
                  }}
                  rowKey="id"
                />

              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Modal xem chi tiết */}
      <Modal
        open={isDetailModalVisible}
        title="Chi tiết danh mục"
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
      >
        {selectedCategory && (
          <Descriptions column={1}>
            <Descriptions.Item label="Tên danh mục">
              {selectedCategory.name}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả">
              {selectedCategory.description}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Modal chỉnh sửa */}
      <Modal
        open={isEditModalVisible}
        title="Chỉnh sửa danh mục"
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleEditSubmit}
        okText="Lưu"
      >
        <Form layout="vertical" form={editForm}>
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thêm danh mục mới"
        open={isAddModalVisible}
        onCancel={() => setAddModalVisible(false)}
        onOk={async () => {
          try {
            const values = await addForm.validateFields();
            await cleanfood.productCategory.create(values);
            setAddModalVisible(false);
            addForm.resetFields(); // Reset form sau khi thêm
            fetchCategories(pagination.page, pagination.size); // Load lại danh sách
          } catch (error) {
            console.error("Thêm danh mục thất bại:", error);
          }
        }}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={addForm}>
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>


    </div>
  );
}

export default ProductCategoryList;
