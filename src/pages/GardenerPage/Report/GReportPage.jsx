import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  message as AntMessage,
  Card,
  Select,
} from "antd";
import reportService from "../../services/apiServices/reportService";
import LoadingPopup from "../../../components/loading/LoadingPopup";

const { Title } = Typography;
const { TextArea } = Input;

const GReportPage = () => {
  const [formData, setFormData] = useState({
    reportType: "",
    phoneNumber: "",
    targetType: "",
    subject: "",
    description: "",
    severity: "",
    accountId: localStorage.getItem("account_id") || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, severity: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await reportService.createUserReport(formData);
      AntMessage.success("Gửi báo cáo thành công!");
      setFormData({
        reportType: "",
        phoneNumber: "",
        targetType: "",
        subject: "",
        description: "",
        severity: "",
        accountId: localStorage.getItem("account_id") || "",
      });
    } catch (err) {
      AntMessage.error("Gửi báo cáo thất bại!");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card
        style={{
          maxWidth: 700,
          margin: "40px auto",
          padding: 24,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 32 }}>
          Gửi Báo Cáo Đến Quản Trị Viên
        </Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Loại báo cáo" required>
            <Input
              name="reportType"
              value={formData.reportType}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Số điện thoại" required>
            <Input
              name="targetId"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Loại đối tượng" required>
            <Input
              name="targetType"
              value={formData.targetType}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Tiêu đề" required>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Mô tả" required>
            <TextArea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Mức độ nghiêm trọng" required>
            <Select
              name="severity"
              value={formData.severity}
              onChange={handleSelectChange}
            >
              <Select.Option value="low">Thấp</Select.Option>
              <Select.Option value="medium">Trung bình</Select.Option>
              <Select.Option value="high">Cao</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="ID tài khoản (tự động)" required>
            <Input name="accountId" value={formData.accountId} disabled />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi Báo Cáo
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <LoadingPopup isOpen={isLoading} />
    </>
  );
};

export default GReportPage;
