import {
  Row,
  Col,
  Card,
  Table,
  Typography,
  Tag,
  Tooltip,
  Button,
  Modal,
  Descriptions,
} from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const { Title } = Typography;

function Transaction() {
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showSubscriptionDetails = (record) => {
    setSelectedSubscription(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedSubscription(null);
  };

  const columns = [
    {
      title: "Subscription ID",
      dataIndex: "SubscriptionId",
      key: "subscriptionId",
      width: 130,
    },
    {
      title: "Package ID",
      dataIndex: "PackageId",
      key: "packageId",
      width: 120,
    },
    {
      title: "Gardener ID",
      dataIndex: "GardenerId",
      key: "gardenerId",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "status",
      width: 100,
      render: (status) => {
        let color = "default";
        switch (status.toLowerCase()) {
          case "active":
            color = "success";
            break;
          case "Inactive":
            color = "warning";
            break;
          case "expired":
            color = "error";
            break;
          case "":
            color = "default";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{status}</Tag>;
      },
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "Inactive" },
        { text: "Expired", value: "expired" },
        { text: "", value: "" },
      ],
      onFilter: (value, record) => record.Status.toLowerCase() === value,
    },
    {
      title: "Subscription Type",
      dataIndex: "SubscriptionType",
      key: "subscriptionType",
      width: 140,
      filters: [
        { text: "Monthly", value: "Monthly" },
        { text: "Quarterly", value: "Quarterly" },
        { text: "Yearly", value: "Yearly" },
      ],
      onFilter: (value, record) => record.SubscriptionType === value,
    },
    // {
    //     title: "Created At",
    //     dataIndex: "CreatedAt",
    //     key: "createdAt",
    //     width: 120,
    //     render: (date) => new Date(date).toLocaleDateString(),
    //     sorter: (a, b) => new Date(a.CreatedAt) - new Date(b.CreatedAt),
    // },
    // {
    //     title: "Start Date",
    //     dataIndex: "StartDate",
    //     key: "startDate",
    //     width: 120,
    //     render: (date) => new Date(date).toLocaleDateString(),
    //     sorter: (a, b) => new Date(a.StartDate) - new Date(b.StartDate),
    // },
    // {
    //     title: "End Date",
    //     dataIndex: "EndDate",
    //     key: "endDate",
    //     width: 120,
    //     render: (date) => new Date(date).toLocaleDateString(),
    //     sorter: (a, b) => new Date(a.EndDate) - new Date(b.EndDate),
    // },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 80,
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <Tooltip title="View Details">
            <FontAwesomeIcon
              icon={faEye}
              onClick={() => showSubscriptionDetails(record)}
              style={{
                fontSize: "16px",
                color: "#1890ff",
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      SubscriptionId: "SUB001",
      PackageId: "PKG001",
      GardenerId: "GDN001",
      Status: "Active",
      SubscriptionType: "Monthly",
      CreatedAt: "2024-03-15",
      StartDate: "2024-03-20",
      EndDate: "2024-04-19",
    },
    {
      key: "2",
      SubscriptionId: "SUB002",
      PackageId: "PKG003",
      GardenerId: "GDN002",
      Status: "Inactive",
      SubscriptionType: "Quarterly",
      CreatedAt: "2024-03-16",
      StartDate: "2024-04-01",
      EndDate: "2024-06-30",
    },
    {
      key: "3",
      SubscriptionId: "SUB003",
      PackageId: "PKG002",
      GardenerId: "GDN003",
      Status: "Active",
      SubscriptionType: "Yearly",
      CreatedAt: "2024-03-10",
      StartDate: "2024-03-15",
      EndDate: "2025-03-14",
    },
    {
      key: "4",
      SubscriptionId: "SUB004",
      PackageId: "PKG001",
      GardenerId: "GDN001",
      Status: "Expired",
      SubscriptionType: "Monthly",
      CreatedAt: "2024-02-15",
      StartDate: "2024-02-20",
      EndDate: "2024-03-19",
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
                    <Title level={5} style={{ margin: 0 }}>
                      Subscriptions
                    </Title>
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
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`,
                  }}
                  className="ant-border-space"
                  scroll={{ x: 1200 }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title={
          <Row justify="space-between" align="middle">
            <Col>
              <span style={{ fontSize: "18px", fontWeight: 500 }}>
                Subscription Details
              </span>
            </Col>
          </Row>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {selectedSubscription && (
          <div style={{ padding: "20px 0" }}>
            <Descriptions
              bordered
              column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Subscription ID">
                {selectedSubscription.SubscriptionId}
              </Descriptions.Item>
              <Descriptions.Item label="Package ID">
                {selectedSubscription.PackageId}
              </Descriptions.Item>
              <Descriptions.Item label="Gardener ID">
                {selectedSubscription.GardenerId}
              </Descriptions.Item>
              <Descriptions.Item label="Subscription Type">
                {selectedSubscription.SubscriptionType}
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {new Date(selectedSubscription.CreatedAt).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag
                  color={
                    selectedSubscription.Status.toLowerCase() === "active"
                      ? "success"
                      : selectedSubscription.Status.toLowerCase() === "Inactive"
                        ? "warning"
                        : selectedSubscription.Status.toLowerCase() ===
                            "expired"
                          ? "error"
                          : "default"
                  }
                >
                  {selectedSubscription.Status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Start Date">
                {new Date(selectedSubscription.StartDate).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="End Date">
                {new Date(selectedSubscription.EndDate).toLocaleDateString()}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Transaction;
