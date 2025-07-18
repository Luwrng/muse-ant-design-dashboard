import React, { useEffect } from 'react'
import { CreditCard, Eye } from "lucide-react"
import { useState, useMemo } from "react"
import GPackageOrderHistoryDetail from './GPackageOrderHistoryDetail';

import gardenerHistoryService from "../../services/apiServices/gardenerHistoryService";
import "./GPackageOrderHistory.css";

const mockPayments = [
  {
    id: "PAY-2024-005",
    packageName: "Standard Gardener Package",
    paymentMethod: "debit card",
    price: "$199.00",
    date: "14/07/2024",
    status: "Refunded",
    orderId: "ORD-2024-005",
    paymentDetail: {
      orderId: "ORD-2024-005",
      paymentId: "PAY-2024-005",
      paymentAmount: 199.0,
      currency: "USD",
      status: "Refunded",
      paymentDate: "2024-07-14T10:00:00.000Z",
      paymentMethod: "debit card",
      orderTotalAmount: 199.0,
      orderStatus: "Completed",
      packageName: "Standard Gardener Package",
    },
  },
  {
    id: "PAY-2024-004",
    packageName: "Premium Gardener Package",
    paymentMethod: "bank transfer",
    price: "$299.00",
    date: "17/07/2024",
    status: "Pending",
    orderId: "ORD-2024-004",
    paymentDetail: {
      orderId: "ORD-2024-004",
      paymentId: "PAY-2024-004",
      paymentAmount: 299.0,
      currency: "USD",
      status: "Pending",
      paymentDate: "2024-07-17T11:00:00.000Z",
      paymentMethod: "bank transfer",
      orderTotalAmount: 299.0,
      orderStatus: "Processing",
      packageName: "Premium Gardener Package",
    },
  },
  {
    id: "PAY-2024-003",
    packageName: "Basic Gardener Package",
    paymentMethod: "credit card",
    price: "$99.00",
    date: "15/07/2024",
    status: "Failed",
    orderId: "ORD-2024-003",
    paymentDetail: {
      orderId: "ORD-2024-003",
      paymentId: "PAY-2024-003",
      paymentAmount: 99.0,
      currency: "USD",
      status: "Failed",
      paymentDate: "2024-07-15T09:30:00.000Z",
      paymentMethod: "credit card",
      orderTotalAmount: 99.0,
      orderStatus: "Failed",
      packageName: "Basic Gardener Package",
    },
  },
  {
    id: "PAY-2024-002",
    packageName: "Standard Gardener Package",
    paymentMethod: "paypal",
    price: "$199.00",
    date: "16/07/2024",
    status: "Success",
    orderId: "ORD-2024-002",
    paymentDetail: {
      orderId: "ORD-2024-002",
      paymentId: "PAY-2024-002",
      paymentAmount: 199.0,
      currency: "USD",
      status: "Success",
      paymentDate: "2024-07-16T14:15:00.000Z",
      paymentMethod: "paypal",
      orderTotalAmount: 199.0,
      orderStatus: "Completed",
      packageName: "Standard Gardener Package",
    },
  },
  {
    id: "PAY-2024-001",
    packageName: "Premium Gardener Package",
    paymentMethod: "credit card",
    price: "$299.00",
    date: "17/07/2024",
    status: "Success",
    orderId: "ORD-2024-001",
    paymentDetail: {
      orderId: "ORD-2024-001",
      paymentId: "PAY-2024-001",
      paymentAmount: 299.0,
      currency: "USD",
      status: "Success",
      paymentDate: "2024-07-17T16:45:00.000Z",
      paymentMethod: "credit card",
      orderTotalAmount: 299.0,
      orderStatus: "Completed",
      packageName: "Premium Gardener Package",
    },
  },
]

function GPackageOrderHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All Status")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedPaymentDetail, setSelectedPaymentDetail] = useState(null)

  const[paymentHistory, setPaymentHistory] = useState();
  useEffect(() => {
    const fetchPaymentHistory = async () =>{
      try{
        const gardenerId = localStorage.getItem("account_id");
        const result = gardenerHistoryService.getPaymentHistory(gardenerId);
        setPaymentHistory(result);
      }
      catch(err){
        console.log(err);
      }
    }

    fetchPaymentHistory()
  },[])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleStatusFilterChange = (event) => {
    setFilterStatus(event.target.value)
  }

  const handleViewDetails = (payment) => {
    setSelectedPaymentDetail(payment.paymentDetail)
    setShowDetailModal(true)
  }

  const handleCloseModal = () => {
    setShowDetailModal(false)
    setSelectedPaymentDetail(null)
  }

  const filteredPayments = useMemo(() => {
    let filtered = mockPayments

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (payment) =>
          payment.packageName.toLowerCase().includes(lowerCaseSearchTerm) ||
          payment.orderId.toLowerCase().includes(lowerCaseSearchTerm) ||
          payment.id.toLowerCase().includes(lowerCaseSearchTerm),
      )
    }

    if (filterStatus !== "All Status") {
      filtered = filtered.filter((payment) => payment.status === filterStatus)
    }

    return filtered
  }, [searchTerm, filterStatus])

  return (
    <div className="gpayhistory-container">
      <header className="gpayhistory-header">
        <div className="gpayhistory-title-section">
          <CreditCard className="gpayhistory-icon" />
          <h1 className="gpayhistory-title">Gardener Payment</h1>
        </div>
      </header>

      <div className="gpayhistory-controls">
        <input
          type="text"
          placeholder="Search by package, order ID, or payment ID..."
          className="gpayhistory-search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select className="gpayhistory-status-select" value={filterStatus} onChange={handleStatusFilterChange}>
          <option value="All Status">All Status</option>
          <option value="Refunded">Refunded</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
          <option value="Success">Success</option>
        </select>
      </div>

      <div className="gpayhistory-table-wrapper">
        <table className="gpayhistory-table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Payment Id</th>
              <th>Ngày</th>
              <th>Trạng thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.packageName}</td>
                <td>{payment.paymentMethod}</td>
                <td>{payment.price}</td>
                <td>{payment.id}</td>
                <td>{payment.date}</td>
                <td>
                  <span className={`gpayhistory-status-badge gpayhistory-status-${payment.status.toLowerCase()}`}>
                    {payment.status}
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

      {showDetailModal && selectedPaymentDetail && (
        <GPackageOrderHistoryDetail isOpen={showDetailModal} onClose={handleCloseModal} paymentDetail={selectedPaymentDetail} />
      )}
    </div>
  )
}

export default GPackageOrderHistory
