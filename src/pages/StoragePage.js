import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerCard from "../components/CustomerCard";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";

const StoragePage = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("https://tailorlog.onrender.com/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  };

  const handleEdit = (customer) => {
    navigate(`/edit-customer`, { state: { customer } });
  };

  const handleDelete = (id, event) => {
    event.preventDefault();
    
    const rect = event.target.getBoundingClientRect();
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    });
    setCustomerToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async (id) => {
    try {
      await axios.delete(`https://tailorlog.onrender.com/customers/${customerToDelete}`);
      setCustomers(customers.filter((customer) => customer._id !== customerToDelete));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer.");
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="storage-page">
      <h2>All Customers</h2>
      <input
        type="text"
        placeholder="Search customers"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
     {customers
  .filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone.toLowerCase().includes(search.toLowerCase())
  )
  .map((customer) => (
    <CustomerCard
      key={customer._id}
      {...customer}
      onEdit={() => handleEdit(customer)}
      onDelete={(event) => handleDelete(customer._id, event)}
    />
  ))}
      
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Are you sure you want to delete this customer?"
        customerId={customerToDelete}
        position={modalPosition}
      />
    </div>
  );
};

export default StoragePage;
