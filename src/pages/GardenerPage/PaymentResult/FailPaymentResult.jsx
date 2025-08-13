import React from "react";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./PaymentResult.css";

function FailPaymentResult() {
  const history = useHistory();

  const handleGoBack = () => {
    history.push("/gardener/dashboard");
  };

  return (
    <div className={`gpayresult-container gpayresult-fail-bg`}>
      <div className="gpayresult-card">
        <button onClick={handleGoBack} className="gpayresult-go-back">
          <ArrowLeft size={16} /> Quay lại
        </button>

        <div className="gpayresult-status-icon">
          <XCircle className="gpayresult-icon-fail" size={80} />
        </div>

        <h1 className={`gpayresult-title gpayresult-text-fail`}>
          Thanh toán thất bại 😔
        </h1>
        <p className="gpayresult-message">
          Thanh toán không thành công! Xin vui lòng kiểm tra lại thông tin hoặc
          thử lại sau vài phút.
        </p>
      </div>
    </div>
  );
}

export default FailPaymentResult;
