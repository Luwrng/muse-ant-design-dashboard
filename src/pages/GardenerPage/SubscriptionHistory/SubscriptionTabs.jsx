import React, { useEffect, useState } from "react";
import "./SubscriptionTabs.css";
import CurrentActiveSubscription from "./CurrentActiveSubscription";
import GSubscriptionHistory from "./GSubscriptionHistory";
import PackageOrderHistory from "../PackageOrderHistory/GPackageOrderHistory";
import gardenerHistoryService from "../../services/apiServices/gardenerHistoryService";
import LoadingPopup from "../../../components/loading/LoadingPopup";

function SubscriptionTabs() {
  const [activeTab, setActiveTab] = useState("active");
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Fetch dât
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (activeTab === "active") {
          const gardenerId = localStorage.getItem("account_id");
          const res = await gardenerHistoryService.getCurrentSubscription(
            gardenerId
          );

          setSubscription(res);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="subscription-tabs-container">
      <div className="subscription-tabs-header">
        <button
          className={`subscription-tab-button ${
            activeTab === "active" ? "active" : ""
          }`}
          onClick={() => setActiveTab("active")}
        >
          Gói đang hoạt động
        </button>
        <button
          className={`subscription-tab-button ${
            activeTab === "history" ? "active" : ""
          }`}
          onClick={() => setActiveTab("history")}
        >
          Lịch sử thanh toán gói
        </button>
      </div>
      <div className="subscription-tabs-content">
        {activeTab === "active" && (
          <CurrentActiveSubscription subscription={subscription} />
        )}
        {activeTab === "history" && <PackageOrderHistory />}
      </div>

      <LoadingPopup isOpen={isLoading} />
    </div>
  );
}

export default SubscriptionTabs;
