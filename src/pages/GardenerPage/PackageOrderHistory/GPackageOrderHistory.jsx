import React, { useEffect } from "react";
import { CreditCard, Eye } from "lucide-react";
import { useState, useMemo } from "react";
import GPackageOrderHistoryDetail from "./GPackageOrderHistoryDetail";
import Paginate from "../../../components/paginate/Paginate";

import gardenerHistoryService from "../../services/apiServices/gardenerHistoryService";
import "./GPackageOrderHistory.css";

function GPackageOrderHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPaymentDetail, setSelectedPaymentDetail] = useState(null);

  const [paymentHistory, setPaymentHistory] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const gardenerId = localStorage.getItem("account_id");
        const result = await gardenerHistoryService.getPaymentHistory(
          gardenerId,
          currentPage,
          10
        );
        setPaymentHistory(result.items);
        setTotalPages(result.totalPages);
        setTotalResults(result.total);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPaymentHistory();
  }, [currentPage]);

  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // const handleStatusFilterChange = (event) => {
  //   setFilterStatus(event.target.value);
  // };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (payment) => {
    setSelectedPaymentDetail(payment);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedPaymentDetail(null);
  };
 const Statusmap = (status)=>{
  switch(status){  case "SUCCESS": return "Thành công";
    case "PENDING": return "Chưa thanh toán";
  default :return "Không xác định";}

 }
  // const filteredPayments = useMemo(() => {
  //   // console.log(paymentHistory);
  //   let filtered = paymentHistory;

  //   if (searchTerm && Array.isArray(filtered)) {
  //     const lowerCaseSearchTerm = searchTerm.toLowerCase();
  //     filtered = filtered.filter(
  //       (payment) =>
  //         payment.packageName.toLowerCase().includes(lowerCaseSearchTerm) ||
  //         payment.paymentId.toLowerCase().includes(lowerCaseSearchTerm)
  //     );
  //   }

  //   if (filterStatus !== "All Status") {
  //     filtered = filtered.filter((payment) => payment.status === filterStatus);
  //   }

  //   return filtered;
  // }, [searchTerm, filterStatus, paymentHistory]);

  return (
    <div className="gpayhistory-container">
      {/* <header className="gpayhistory-header">
        <div className="gpayhistory-title-section">
          <h1 className="gpayhistory-title">Lịch sử thanh toán</h1>
        </div>
      </header> */}

      {/* <div className="gpayhistory-controls">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên gói dịch vụ và id thanh toán..."
          className="gpayhistory-search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="gpayhistory-status-select"
          value={filterStatus}
          onChange={handleStatusFilterChange}
        >
          <option value="All Status">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
          <option value="SUCCESS">Success</option>
        </select>
      </div> */}

      <div className="gpayhistory-table-wrapper">
        <table className="gpayhistory-table">
          <thead>
            <tr>
              <th>Id thanh toán</th>
              <th>Tên gói dịch vụ</th>
              <th>Phương thức thanh toán</th>
              <th>Tổng tiền thanh toán</th>
              <th>Ngày thanh toán</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(paymentHistory) &&
              paymentHistory.map((payment) => (
                <tr key={payment.paymentId}>
                  <td>{payment.paymentId}</td>
                  <td>{payment.packageName}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.paymentAmount}</td>
                  <td>
                    {new Date(payment.paymentDate).toISOString().split("T")[0]}
                  </td>
                  <td>
                    <span style={{}}
                      className={`gpayhistory-status-badge gpayhistory-status-${payment.status.toLowerCase()}`}
                    >
                      {Statusmap(payment.status)}
                    </span>
                  </td>
                  <td>
                    <button
                      className="gpayhistory-view-details-button"
                      onClick={() => handleViewDetails(payment)}
                      aria-label="View Details"
                    >
                      <Eye className="gpayhistory-view-details-icon" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalResults}
        onPageChange={handlePageChange}
      />

      {showDetailModal && selectedPaymentDetail && (
        <GPackageOrderHistoryDetail
          isOpen={showDetailModal}
          onClose={handleCloseModal}
          paymentDetail={selectedPaymentDetail}
        />
      )}
    </div>
  );
}

export default GPackageOrderHistory;
