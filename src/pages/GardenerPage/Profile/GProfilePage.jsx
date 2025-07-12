import React from "react";
import { useState } from "react";

//Import Conponent
import GAddCertificate from "./Modals/GAddCertificate";
import GAddressDetail from "./Modals/GAddressDetail";
import GCreateAddress from "./Modals/GCreateAddress";
import GPasswordChange from "./Modals/GPasswordChange";
import GProfileUpdate from "./Modals/GProfileUpdate";
import GUpdateAddress from "./Modals/GUpdateAddress";
import GUpdateCertificate from "./Modals/GUpdateCertificate";

//Import Styling
import "./GProfilePage.css";

function GProfilePage() {
  const [activeTab, setActiveTab] = useState("account");
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showAddressDetail, setShowAddressDetail] = useState(false);
  const [showUpdateAddress, setShowUpdateAddress] = useState(false);
  const [showCreateAddress, setShowCreateAddress] = useState(false);
  const [showAddCertificate, setShowAddCertificate] = useState(false);
  const [showUpdateCertificate, setShowUpdateCertificate] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState("");

  const [profile, setProfile] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    gender: "Male",
    status: "Active",
    verificationStatus: "Verified",
    createdDate: "2023-01-15",
    lastUpdated: "2024-01-10",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      number: 1,
      addressLine: "123 Garden Street, Apt 4B",
      city: "New York",
      province: "NY",
      country: "USA",
      postalCode: "10001",
    },
    {
      id: 2,
      number: 2,
      addressLine: "456 Park Avenue",
      city: "New York",
      province: "NY",
      country: "USA",
      postalCode: "10002",
    },
  ]);

  const [certificates, setCertificates] = useState([
    {
      id: 1,
      name: "Organic Gardening Certification",
      issuedBy: "Green Institute",
      issueDate: "2023-06-15",
      expiryDate: "2025-06-15",
      status: "Active",
      imageUrl:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Landscape Design Certificate",
      issuedBy: "Design Academy",
      issueDate: "2022-03-10",
      expiryDate: "2024-03-10",
      status: "Active",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    },
  ]);

  const handleAddressClick = (address) => {
    setSelectedAddress(address);
    setShowAddressDetail(true);
  };

  const handleUpdateAddress = () => {
    setShowAddressDetail(false);
    setShowUpdateAddress(true);
  };

  const selectedCertificateData = certificates.find(
    (cert) => cert.name === selectedCertificate
  );

  return (
    <div className="gprofile-profile">
      <div className="gprofile-tabs">
        <button
          className={`gprofile-tab ${activeTab === "account" ? "active" : ""}`}
          onClick={() => setActiveTab("account")}
        >
          Account Information
        </button>
        <button
          className={`gprofile-tab ${
            activeTab === "certificates" ? "active" : ""
          }`}
          onClick={() => setActiveTab("certificates")}
        >
          Certificates
        </button>
      </div>

      {activeTab === "account" && (
        <div className="gprofile-account-tab">
          <div className="gprofile-profile-section">
            <div className="gprofile-avatar-section">
              <img
                src={profile.avatar || "/placeholder.svg"}
                alt="Profile"
                className="gprofile-avatar"
              />
              <h2>{profile.name}</h2>
            </div>

            <div className="gprofile-profile-details">
              <div className="gprofile-detail-row">
                <div className="gprofile-detail-item">
                  <label>Email</label>
                  <span>{profile.email}</span>
                </div>
                <div className="gprofile-detail-item">
                  <label>Phone Number</label>
                  <span>{profile.phone}</span>
                </div>
              </div>

              <div className="gprofile-detail-row">
                <div className="gprofile-detail-item">
                  <label>Gender</label>
                  <span>{profile.gender}</span>
                </div>
                <div className="gprofile-detail-item">
                  <label>Status</label>
                  <span className="gprofile-status active">
                    {profile.status}
                  </span>
                </div>
              </div>

              <div className="gprofile-detail-row">
                <div className="gprofile-detail-item">
                  <label>Verification Status</label>
                  <span className="gprofile-status verified">
                    {profile.verificationStatus}
                  </span>
                </div>
                <div className="gprofile-detail-item">
                  <label>Created Date</label>
                  <span>{profile.createdDate}</span>
                </div>
              </div>

              <div className="gprofile-detail-row">
                <div className="gprofile-detail-item">
                  <label>Last Updated</label>
                  <span>{profile.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="gprofile-addresses-section">
            <div className="gprofile-addresses-header">
              <h3>Addresses</h3>
              <button
                className="gprofile-add-address-btn"
                onClick={() => setShowCreateAddress(true)}
              >
                + Add Address
              </button>
            </div>

            <div className="gprofile-addresses-list">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="gprofile-address-item"
                  onClick={() => handleAddressClick(address)}
                >
                  <span className="gprofile-address-number">
                    No. {address.number}
                  </span>
                  <span className="gprofile-address-line">
                    {address.addressLine}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="gprofile-action-buttons">
            <button
              className="gprofile-btn-primary"
              onClick={() => setShowUpdateProfile(true)}
            >
              Update Profile
            </button>
            <button
              className="gprofile-btn-secondary"
              onClick={() => setShowChangePassword(true)}
            >
              Change Password
            </button>
          </div>
        </div>
      )}

      {activeTab === "certificates" && (
        <div className="gprofile-certificates-tab">
          <div className="gprofile-certificate-header">
            <select
              className="gprofile-certificate-dropdown"
              value={selectedCertificate}
              onChange={(e) => setSelectedCertificate(e.target.value)}
            >
              <option value="">Select a certificate</option>
              {certificates.map((cert) => (
                <option key={cert.id} value={cert.name}>
                  {cert.name}
                </option>
              ))}
            </select>
            <button
              className="gprofile-btn-primary"
              onClick={() => setShowAddCertificate(true)}
            >
              Add Certificate
            </button>
          </div>

          {selectedCertificateData && (
            <div className="gprofile-certificate-details">
              <div className="gprofile-certificate-info">
                <div className="gprofile-certificate-text">
                  <div className="gprofile-detail-item">
                    <label>Certificate Name</label>
                    <span>{selectedCertificateData.name}</span>
                  </div>
                  <div className="gprofile-detail-item">
                    <label>Issued By</label>
                    <span>{selectedCertificateData.issuedBy}</span>
                  </div>
                  <div className="gprofile-detail-item">
                    <label>Issue Date</label>
                    <span>{selectedCertificateData.issueDate}</span>
                  </div>
                  <div className="gprofile-detail-item">
                    <label>Expiry Date</label>
                    <span>{selectedCertificateData.expiryDate}</span>
                  </div>
                  <div className="gprofile-detail-item">
                    <label>Status</label>
                    <span className="gprofile-status active">
                      {selectedCertificateData.status}
                    </span>
                  </div>
                </div>
                <div className="gprofile-certificate-image">
                  <label>Certificate Image</label>
                  <img
                    src={selectedCertificateData.imageUrl || "/placeholder.svg"}
                    alt="Certificate"
                  />
                </div>
              </div>
              <button
                className="gprofile-btn-primary gprofile-update-cert-btn"
                onClick={() => setShowUpdateCertificate(true)}
              >
                Update Certificate Information
              </button>
            </div>
          )}
        </div>
      )}

      {showUpdateProfile && (
        <GProfileUpdate
          profile={profile}
          onClose={() => setShowUpdateProfile(false)}
          onUpdate={setProfile}
        />
      )}

      {showChangePassword && (
        <GPasswordChange onClose={() => setShowChangePassword(false)} />
      )}

      {showAddressDetail && selectedAddress && (
        <GAddressDetail
          address={selectedAddress}
          onClose={() => setShowAddressDetail(false)}
          onUpdate={handleUpdateAddress}
        />
      )}

      {showUpdateAddress && selectedAddress && (
        <GUpdateAddress
          address={selectedAddress}
          onClose={() => setShowUpdateAddress(false)}
          onUpdate={(updatedAddress) => {
            setAddresses(
              addresses.map((addr) =>
                addr.id === updatedAddress.id ? updatedAddress : addr
              )
            );
            setShowUpdateAddress(false);
          }}
        />
      )}

      {showCreateAddress && (
        <GCreateAddress
          onClose={() => setShowCreateAddress(false)}
          onAdd={(newAddress) => {
            const addressWithId = {
              ...newAddress,
              id: addresses.length + 1,
              number: addresses.length + 1,
            };
            setAddresses([...addresses, addressWithId]);
            setShowCreateAddress(false);
          }}
        />
      )}

      {showAddCertificate && (
        <GAddCertificate
          onClose={() => setShowAddCertificate(false)}
          onAdd={(newCertificate) => {
            const certWithId = {
              ...newCertificate,
              id: certificates.length + 1,
            };
            setCertificates([...certificates, certWithId]);
            setShowAddCertificate(false);
          }}
        />
      )}

      {showUpdateCertificate && selectedCertificateData && (
        <GUpdateCertificate
          certificate={selectedCertificateData}
          onClose={() => setShowUpdateCertificate(false)}
          onUpdate={(updatedCertificate) => {
            setCertificates(
              certificates.map((cert) =>
                cert.id === updatedCertificate.id ? updatedCertificate : cert
              )
            );
            setShowUpdateCertificate(false);
          }}
        />
      )}
    </div>
  );
}

export default GProfilePage;
