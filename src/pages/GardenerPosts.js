import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Tag,
  Popconfirm,
  message,
  Select,
  Avatar,
  Divider,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

function GardenerPosts() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [viewingRecord, setViewingRecord] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Sample data - replace with actual API call
  const [data, setData] = useState([
    {
      PostId: 1,
      Title: "Growing Organic Tomatoes",
      Content:
        "Tips and tricks for growing the best organic tomatoes in your garden...",
      GardenerId: "GD001",
      GardenerName: "John Smith",
      GardenerAvatar: "https://xsgames.co/randomusers/avatar.php?g=male",
      Status: "Published",
      CreatedAt: "2024-03-20T10:30:00",
      UpdatedAt: "2024-03-20T10:30:00",
    },
    {
      PostId: 2,
      Title: "Seasonal Planting Guide",
      Content:
        "A comprehensive guide for planting different vegetables according to seasons...",
      GardenerId: "GD002",
      GardenerName: "Emma Wilson",
      GardenerAvatar: "https://xsgames.co/randomusers/avatar.php?g=female",
      Status: "Draft",
      CreatedAt: "2024-03-21T09:15:00",
      UpdatedAt: "2024-03-21T09:15:00",
    },
  ]);

  const showModal = (record = null) => {
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const showViewModal = (record) => {
    setViewingRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsViewModalVisible(false);
    setEditingRecord(null);
    setViewingRecord(null);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    if (editingRecord) {
      // Update existing post
      setData(
        data.map((item) =>
          item.PostId === editingRecord.PostId
            ? {
                ...item,
                ...values,
                UpdatedAt: new Date().toISOString(),
              }
            : item,
        ),
      );
      message.success("Post updated successfully");
    } else {
      // Add new post
      const newPost = {
        PostId: Math.max(...data.map((item) => item.PostId)) + 1,
        ...values,
        Status: "Draft",
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString(),
        // Temporary data - should come from logged-in user
        GardenerId: "GD003",
        GardenerName: "New Gardener",
        GardenerAvatar: "https://xsgames.co/randomusers/avatar.php?g=pixel",
      };
      setData([...data, newPost]);
      message.success("Post created successfully");
    }
    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleDelete = (record) => {
    setData(data.filter((item) => item.PostId !== record.PostId));
    message.success("Post deleted successfully");
  };

  const columns = [
    {
      title: "Post ID",
      dataIndex: "PostId",
      key: "PostId",
      width: 100,
      sorter: (a, b) => a.PostId - b.PostId,
    },
    {
      title: "Gardener",
      key: "gardener",
      width: 200,
      render: (_, record) => (
        <Space>
          <Avatar src={record.GardenerAvatar} />
          <span>{record.GardenerName}</span>
        </Space>
      ),
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
      width: 300,
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.Title).toLowerCase().includes(value.toLowerCase()) ||
          String(record.Content).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: 120,
      render: (status) => (
        <Tag color={status === "Published" ? "success" : "warning"}>
          {status}
        </Tag>
      ),
      filters: [
        { text: "Published", value: "Published" },
        { text: "Draft", value: "Draft" },
      ],
      onFilter: (value, record) => record.Status === value,
    },
    {
      title: "Created At",
      dataIndex: "CreatedAt",
      key: "CreatedAt",
      width: 180,
      render: (date) => new Date(date).toLocaleString(),
      sorter: (a, b) => new Date(a.CreatedAt) - new Date(b.CreatedAt),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => showViewModal(record)}
          />
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this post?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
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
                    <Title level={5}>Gardener Posts</Title>
                  </Col>
                  <Col>
                    <Space>
                      <Input
                        placeholder="Search posts..."
                        prefix={<SearchOutlined />}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 200 }}
                      />
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => showModal()}
                      >
                        Add Post
                      </Button>
                    </Space>
                  </Col>
                </Row>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{
                    position: ["bottom", "right"],
                    pageSize: 10,
                    showSizeChanger: true,                   
                  }}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Edit/Add Modal */}
      <Modal
        title={editingRecord ? "Edit Post" : "Add New Post"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="Title"
            label="Post Title"
            rules={[
              {
                required: true,
                message: "Please input the post title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Content"
            label="Content"
            rules={[
              {
                required: true,
                message: "Please input the post content!",
              },
            ]}
          >
            <TextArea rows={6} />
          </Form.Item>

          {editingRecord && (
            <Form.Item
              name="Status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: "Please select the status!",
                },
              ]}
            >
              <Select>
                <Select.Option value="Published">Published</Select.Option>
                <Select.Option value="Draft">Draft</Select.Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item>
            <Space style={{ float: "right" }}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingRecord ? "Update" : "Add"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal
        title="View Post"
        visible={isViewModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {viewingRecord && (
          <div>
            <Space align="center" style={{ marginBottom: 16 }}>
              <Avatar size={64} src={viewingRecord.GardenerAvatar} />
              <div>
                <Title level={5}>{viewingRecord.GardenerName}</Title>
                <Text type="secondary">
                  Gardener ID: {viewingRecord.GardenerId}
                </Text>
              </div>
            </Space>
            <Divider />
            <Title level={4}>{viewingRecord.Title}</Title>
            <Text type="secondary">
              Posted on {new Date(viewingRecord.CreatedAt).toLocaleString()}
            </Text>
            <Paragraph style={{ marginTop: 16 }}>
              {viewingRecord.Content}
            </Paragraph>
            <Space style={{ marginTop: 16 }}>
              <Tag
                color={
                  viewingRecord.Status === "Published" ? "success" : "warning"
                }
              >
                {viewingRecord.Status}
              </Tag>
              <Text type="secondary">
                Last updated:{" "}
                {new Date(viewingRecord.UpdatedAt).toLocaleString()}
              </Text>
            </Space>
          </div>
        )}
      </Modal>
    </>
  );
}

export default GardenerPosts;
