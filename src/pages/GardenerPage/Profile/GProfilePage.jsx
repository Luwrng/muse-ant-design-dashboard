import React, { useEffect } from "react";
import { useState } from "react";
import defaultavatar from "../../../assets/images/gardener/defaultavatar.jpg";

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
import accountService from "../../services/apiServices/accountService";

function GProfilePage() {
  //Tab, Popup part
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

  //Data part
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [certificates, setCertificates] = useState([]);

  //Get profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accountId = localStorage.getItem("account_id");
        const result = await accountService.getProfile(accountId);

        const { addresses, certificates, ...accountInfo } = result;

        setProfile(accountInfo);
        setAddresses(addresses || []);
        setCertificates(certificates || []);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    fetchProfile();
  }, []);

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
                src={profile.avatar || defaultavatar}
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
                  <span>{profile.phoneNumber}</span>
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
                  <span
                    className={`gprofile-status ${
                      profile.isVerified ? "verified" : "unverified"
                    }`}
                  >
                    {profile.isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
                <div className="gprofile-detail-item">
                  <label>Created Date</label>
                  <span>{profile.createdAt}</span>
                </div>
              </div>

              <div className="gprofile-detail-row">
                <div className="gprofile-detail-item">
                  <label>Last Updated</label>
                  <span>{profile.updatedAt}</span>
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
              {addresses.map((address, index) => (
                <div
                  key={address.id}
                  className="gprofile-address-item"
                  onClick={() => handleAddressClick(address)}
                >
                  <span className="gprofile-address-number">
                    No. {index + 1}
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
                    <span>{selectedCertificateData.issuingAuthority}</span>
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
