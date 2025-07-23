import React, { useState } from "react";
import { Form, Input, Button, Typography, message as AntMessage, Card, Select } from "antd";
import reportService from "../../services/apiServices/reportService";

const { Title } = Typography;
const { TextArea } = Input;

const GReportPage = () => {
  const [formData, setFormData] = useState({
    reportType: "",
    targetId: "",
    targetType: "",
    subject: "",
    description: "",
    severity: "",
    accountId: localStorage.getItem("account_id") || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, severity: value });
  };

  const handleSubmit = async () => {
    try {
      await reportService.reportGardener(formData);
      AntMessage.success("Gửi báo cáo thành công!");
      setFormData({
        reportType: "",
        targetId: "",
        targetType: "",
        subject: "",
        description: "",
        severity: "",
        accountId: localStorage.getItem("account_id") || "",
      });
    } catch (err) {
      AntMessage.error("Gửi báo cáo thất bại!");
      console.error(err);
    }
  };

  return (
    <Card style={{ maxWidth: 700, margin: "40px auto", padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: 32 }}>
        Gửi Báo Cáo Đến Quản Trị Viên
      </Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Loại báo cáo" required>
          <Input name="reportType" value={formData.reportType} onChange={handleChange} />
        </Form.Item>

        <Form.Item label="ID đối tượng" required>
          <Input name="targetId" value={formData.targetId} onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Loại đối tượng" required>
          <Input name="targetType" value={formData.targetType} onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Tiêu đề" required>
          <Input name="subject" value={formData.subject} onChange={handleChange} />
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
          <Select name="severity" value={formData.severity} onChange={handleSelectChange}>
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
  );
};

export default GReportPage;
