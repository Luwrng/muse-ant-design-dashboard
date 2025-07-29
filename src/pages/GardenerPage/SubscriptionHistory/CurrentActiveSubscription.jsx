import "./CurrentActiveSubscription.css";

function CurrentActiveSubscription({ subscription }) {
  return (
    <div className="active-subscription-detail-container">
      <h1 className="active-subscription-detail-title">Gói dịch vụ của bạn</h1>
      {subscription ? (
        <div className="active-subscription-card">
          <div className="active-subscription-info">
            <p>
              <strong>ID gói:</strong> {subscription.subscriptionId}
            </p>
            <p>
              <strong>Tên gói dịch vụ:</strong>{" "}
              {subscription.servicePackage?.packageName}
            </p>
            <p>
              <strong>Giá gói:</strong> {subscription.servicePackage?.price} VND
            </p>
            <p>
              <strong>Loại gói:</strong> {subscription.subscriptionType}
            </p>
            <p>
              <strong>Ngày có hiệu lực:</strong>{" "}
              {new Date(subscription.startDate).toISOString().split("T")[0]},{" "}
              {
                new Date(subscription.startDate)
                  .toISOString()
                  .split("T")[1]
                  .split(".")[0]
              }
            </p>
            <p>
              <strong>Ngày hết hạn:</strong>{" "}
              {new Date(subscription.endDate).toISOString().split("T")[0]},{" "}
              {
                new Date(subscription.endDate)
                  .toISOString()
                  .split("T")[1]
                  .split(".")[0]
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="no-active-subscription-message">
          <p>Bạn chưa kích hoạt gói dịch vụ!</p>
        </div>
      )}
    </div>
  );
}

export default CurrentActiveSubscription;
