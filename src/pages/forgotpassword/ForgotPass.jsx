import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Typography, message, Card } from "antd";

import accountService from "../services/apiServices/accountService";

const { Title } = Typography;

const ForgotPass = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [form] = Form.useForm();

  const history = useHistory();

  // BƯỚC 1 – Nhập SĐT
  const handlePhoneSubmit = () => {
    if (!phone.match(/^\d{10,11}$/)) {
      message.error("Số điện thoại không hợp lệ!");
      return;
    }

    // ✅ TODO: Gửi OTP
    console.log("Gửi OTP đến:", phone);
    message.success("Đã gửi mã OTP tới số điện thoại.");
    setStep(2);
  };

  // BƯỚC 2 – Nhập OTP
  const handleOtpSubmit = () => {
    if (otp !== "123456") {
      message.error("Mã OTP không đúng!");
      return;
    }

    message.success("Xác thực OTP thành công!");
    setStep(3);
  };

  // BƯỚC 3 – Đổi mật khẩu
  const handlePasswordSubmit = async (values) => {
    const { password, confirmPassword } = values;

    const request = {
      phoneNumber: phone,
      action: "RESET",
      oldPassword: "",
      newPassword: password,
      confirmNewPassword: confirmPassword,
    };

    if (password !== confirmPassword) {
      message.error("Mật khẩu không khớp!");
      return;
    }

    try {
      await accountService.changeOrResetPassword(request);
    } catch (err) {
      console.log(err);
    }

    // console.log("Đổi mật khẩu cho:", request);
    message.success("Đổi mật khẩu thành công!");
    history.push("/sign-in");
  };

  // 👇 Màu tiêu đề theo bước
  const getStepColor = () => {
    if (step === 1) return "#1890ff"; // blue
    if (step === 2) return "#faad14"; // orange
    if (step === 3) return "#52c41a"; // green
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Card style={{ width: 400, borderTop: `5px solid ${getStepColor()}` }}>
        <Title
          level={3}
          style={{
            textAlign: "center",
            marginBottom: 24,
            color: getStepColor(),
          }}
        >
          {step === 1 && "🔒 Xác nhận số điện thoại"}
          {step === 2 && "📩 Nhập mã OTP"}
          {step === 3 && "🔑 Đặt lại mật khẩu"}
        </Title>

        {/* STEP 1: SĐT */}
        {step === 1 && (
          <Form layout="vertical" onFinish={handlePhoneSubmit}>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input
                placeholder="Nhập số điện thoại"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
                block
              >
                Gửi mã OTP
              </Button>
            </Form.Item>
          </Form>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <Form layout="vertical" onFinish={handleOtpSubmit}>
            <Form.Item
              label="Nhập mã OTP"
              name="otp"
              rules={[{ required: true, message: "Vui lòng nhập mã OTP" }]}
            >
              <Input
                // placeholder="VD: 123456"
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                style={{
                  backgroundColor: "#faad14",
                  borderColor: "#faad14",
                  color: "#fff",
                }}
                block
              >
                Xác nhận OTP
              </Button>
            </Form.Item>
          </Form>
        )}

        {/* STEP 3: Mật khẩu */}
        {step === 3 && (
          <Form layout="vertical" form={form} onFinish={handlePasswordSubmit}>
            <Form.Item
              label="Mật khẩu mới"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới" },
              ]}
            >
              <Input.Password placeholder="Mật khẩu mới" />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                style={{
                  backgroundColor: "#52c41a",
                  borderColor: "#52c41a",
                  color: "#fff",
                }}
                block
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default ForgotPass;
