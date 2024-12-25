// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CustomerCard from "../components/CustomerCard";

// const StoragePage = () => {
//   const [customers, setCustomers] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/customers")
//       .then((response) => setCustomers(response.data))
//       .catch((error) => console.error("Error fetching customers:", error));
//   }, []);

//   return (
//     <div className="storage-page">
//       <h2>All Customers</h2>
//       <input
//         type="text"
//         placeholder="Search customers"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="search-bar"
//       />
//       {customers
//         .filter((customer) =>
//           customer.name.toLowerCase().includes(search.toLowerCase())
//         )
//         .map((customer) => (
//           <CustomerCard key={customer._id} {...customer} />
//         ))}
//     </div>
//   );
// };

// export default StoragePage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerCard from "../components/CustomerCard";
import { useNavigate } from "react-router-dom";

const StoragePage = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  };

  const handleEdit = (customer) => {
    navigate(`/measurements/${customer.gender}`, { state: { customer } });
  };

  const handleDelete = async (id) => {
    console.log("Deleting customer with ID:", id);  // Debugging line
    try {
      await axios.delete(`/api/customers/${id}`);
      alert("Customer deleted successfully!");
      setCustomers(customers.filter(customer => customer._id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer.");
    }
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
          customer.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((customer) => (
          <CustomerCard
            key={customer._id}
            {...customer}
            onEdit={() => handleEdit(customer)}
            onDelete={() => handleDelete(customer._id)}
          />
        ))}
    </div>
  );
};

export default StoragePage;
