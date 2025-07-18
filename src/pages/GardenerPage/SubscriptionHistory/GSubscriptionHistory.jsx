import React, { useEffect } from 'react'
import { useState, useMemo } from "react"
import { Eye } from "lucide-react"
import "./GSubscriptionHistory.css";
import gardenerHistoryService from "../../services/apiServices/gardenerHistoryService"
import GSubscriptionHistoryDetail from './GSubscriptionHistoryDetail';

const mockSubscriptions = [
  {
    id: "SUB-2024-006",
    productName: "Organic Garden Care",
    category: "Monthly",
    gardenerPhoneNumber: "+1 (555) 0987",
    price: 119.0,
    date: "17/07/2025",
    status: "Active",
    subscriptionType: "Monthly",
    servicePackageName: "Organic Garden Care",
    servicePackagePrice: 119.0,
  },
  {
    id: "SUB-2024-005",
    productName: "Flower Garden Special",
    category: "Quarterly",
    gardenerPhoneNumber: "+1 (555) 0654",
    price: 199.0,
    date: "17/07/2025",
    status: "Suspended",
    subscriptionType: "Quarterly",
    servicePackageName: "Flower Garden Special",
    servicePackagePrice: 199.0,
  },
  {
    id: "SUB-2024-004",
    productName: "Vegetable Garden Care",
    category: "Monthly",
    gardenerPhoneNumber: "+1 (555) 0321",
    price: 59.0,
    date: "17/07/2025",
    status: "Cancelled",
    subscriptionType: "Monthly",
    servicePackageName: "Vegetable Garden Care",
    servicePackagePrice: 59.0,
  },
  {
    id: "SUB-2024-003",
    productName: "Basic Garden Care",
    category: "Quarterly",
    gardenerPhoneNumber: "+1 (555) 0789",
    price: 149.0,
    date: "17/07/2025",
    status: "Expired",
    subscriptionType: "Quarterly",
    servicePackageName: "Basic Garden Care",
    servicePackagePrice: 149.0,
  },
  {
    id: "SUB-2024-002",
    productName: "Complete Lawn Maintenance",
    category: "Yearly",
    gardenerPhoneNumber: "+1 (555) 0456",
    price: 899.0,
    date: "17/07/2025",
    status: "Active",
    subscriptionType: "Yearly",
    servicePackageName: "Complete Lawn Maintenance",
    servicePackagePrice: 899.0,
  },
  {
    id: "SUB-2024-001",
    productName: "Premium Garden Care",
    category: "Monthly",
    gardenerPhoneNumber: "+1 (555) 0123",
    price: 89.0,
    date: "17/07/2025",
    status: "Active",
    subscriptionType: "Monthly",
    servicePackageName: "Premium Garden Care",
    servicePackagePrice: 89.0,
  },
]

function GSubscriptionHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState(null)

  const [subscriptionHistory, setSubscriptionHistory] = useState();
  useEffect(() => {
    const fetchSubscriptionHistory = async () => {
      try{
        const gardenerId = localStorage.getItem("account_id");
        const result = await gardenerHistoryService.getSubscriptionHistory(gardenerId);
        setSubscriptionHistory(result)
      }
      catch(err){
        console.log(err);
      }
    }

    fetchSubscriptionHistory();
  }, [])

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(mockSubscriptions.map((sub) => sub.status))
    return ["All Status", ...Array.from(statuses)]
  }, [])

  const filteredSubscriptions = useMemo(() => {
    let filtered = mockSubscriptions

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (sub) =>
          sub.productName.toLowerCase().includes(lowerCaseSearchTerm) ||
          sub.id.toLowerCase().includes(lowerCaseSearchTerm) ||
          sub.gardenerPhoneNumber.toLowerCase().includes(lowerCaseSearchTerm),
      )
    }

    if (statusFilter !== "All Status") {
      filtered = filtered.filter((sub) => sub.status === statusFilter)
    }

    return filtered
  }, [searchTerm, statusFilter])

  const handleViewDetails = (subscription) => {
    setSelectedSubscription(subscription)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedSubscription(null)
  }

  return (
    <div className="gsbchistory-container">
      <div className="gsbchistory-header">
        <h1 className="gsbchistory-title">Gardener Subscriptions</h1>
      </div>

      <div className="gsbchistory-filters">
        <input
          type="text"
          placeholder="Search by package, ID, or phone..."
          className="gsbchistory-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="gsbchistory-status-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {uniqueStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="gsbchistory-table-wrapper">
        <table className="gsbchistory-table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Subscription ID</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Đơn vị khối lượng</th>
              <th>Trạng thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscriptions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.productName}</td>
                <td>{sub.id}</td>
                <td>{sub.category}</td>
                <td>${sub.price.toFixed(2)}</td>
                <td>{sub.date}</td>
                <td>
                  <span className={`gsbchistory-status-badge gsbchistory-status-${sub.status.toLowerCase()}`}>
                    {sub.status}
                  </span>
                </td>
                <td>
                  <button className="gsbchistory-view-details-button" onClick={() => handleViewDetails(sub)}>
                    <Eye size={16} />
                    <span className="sr-only">View Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedSubscription && (
        <GSubscriptionHistoryDetail subscription={selectedSubscription} onClose={closeModal} />
      )}
    </div>
  )
}

export default GSubscriptionHistory
