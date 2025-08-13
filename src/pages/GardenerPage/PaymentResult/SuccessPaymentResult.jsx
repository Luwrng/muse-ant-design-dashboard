import React from "react";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./PaymentResult.css";

function SuccessPaymentResult() {
  const history = useHistory();

  const handleGoBack = () => {
    history.push("/gardener/dashboard");
  };

  return (
    <div className={`gpayresult-container gpayresult-success-bg$`}>
      <div className="gpayresult-card">
        <button onClick={handleGoBack} className="gpayresult-go-back">
          <ArrowLeft size={16} /> Quay lại
        </button>

        <div className="gpayresult-status-icon">
          <CheckCircle className="gpayresult-icon-success" size={80} />
        </div>
        <h1 className={`gpayresult-title gpayresult-text-success`}>
          Thanh toán thành công! 🌱
        </h1>
        <p className="gpayresult-message">
          Thanh toán thành công! Cảm ơn bạn đã mua dịch vụ của chúng tôi.
        </p>
      </div>
    </div>
  );
}

export default SuccessPaymentResult;
