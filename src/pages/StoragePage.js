import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import CustomerCard from "../components/CustomerCard";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import LoadingSpinner from "../components/LoadingSpinner";
import "../css/StoragePage.css";

const StoragePage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [search, setSearch] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axiosInstance.get("/customers");
      if (response.data) {
        const normalizedCustomers = response.data.map((customer) => ({
          ...customer,
          phone: customer.mobile || customer.phone,
        }));
        setCustomers(normalizedCustomers);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching customers");
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customer) => {
    navigate(`/edit-customer`, { state: { customer } });
  };

  const handleDelete = (customer, event) => {
    event.preventDefault();
    setSelectedCustomerId(customer._id);
    setSelectedCustomerName(customer.name);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedCustomerId) return;

    try {
      setIsDeleting(true);
      setError("");

      const response = await axiosInstance.delete(
        `/customers/${selectedCustomerId}`
      );

      if (response.status === 200) {
        setCustomers((prevCustomers) =>
          prevCustomers.filter((c) => c._id !== selectedCustomerId)
        );
        setSuccessMessage(`${selectedCustomerName} deleted successfully`);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Delete error:", error);
      setError(error.response?.data?.message || "Error deleting customer");
    } finally {
      setIsDeleting(false);
      setShowModal(false);
      setSelectedCustomerId(null);
      setSelectedCustomerName("");
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedCustomerId(null);
    setSelectedCustomerName("");
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="storage-page">
      {successMessage && (
        <div className="message success-message">{successMessage}</div>
      )}
      {error && <div className="message error-message">{error}</div>}

      <div className="page-header">
        <h2>Customer Directory</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or phone number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
        </div>
      </div>

      {filteredCustomers.length === 0 && !loading ? (
        <div className="no-results">No customers found</div>
      ) : (
        <div className="customers-grid">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer._id}
              customerId={customer._id}
              name={customer.name}
              phone={customer.phone}
              onEdit={() => handleEdit(customer)}
              onDelete={(event) => handleDelete(customer, event)}
            />
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={showModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete ${selectedCustomerName}? This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default StoragePage;
