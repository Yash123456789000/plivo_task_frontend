import React, { useState } from "react";
import "./TransactionModal.css";
import Button from "../Button";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";

export default function DatabaseModal({ isOpen, onClose }) {
  const { currentColor } = useStateContext();

  const [customerID, setCustomerID] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerImage, setCustomerImage] = useState("");
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("Active");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async () => {
    try {
      const newEntry = {
        CustomerID: parseInt(customerID),
        CustomerName: customerName,
        CustomerEmail: customerEmail,
        CustomerImage: customerImage,
        ProjectName: projectName,
        Status: status,
        StatusBg: getStatusColor(status),
        Weeks: "4", // placeholder
        Budget: "$5000", // placeholder
        Location: "Global", // optional
      };

      if(user.role === "user") {
        const userId = user._id; // Get the user ID from localStorage
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/database/${userId}`, newEntry);
        console.log("Database entry added:", response.data);
        const existing = JSON.parse(localStorage.getItem("databaseData") || "[]");
        localStorage.setItem("databaseData", JSON.stringify([...existing, response.data]));
        axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/database`, newEntry);
      }
      else{
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/database`, newEntry);
        console.log("Database entry added:");

        // Store in localStorage (optional)
        const existing = JSON.parse(localStorage.getItem("databaseData") || "[]");
        localStorage.setItem("databaseData", JSON.stringify([...existing, response.data]));
      }

      

      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Failed to add database entry:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "#00fe93";
      case "completed":
        return "#fec80a";
      case "pending":
        return "#5c6bc0";
      case "canceled":
        return "#fe1e00";
      default:
        return "#a8a5a6";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add New Database Entry</h3>
        <p className="modal-subtext">Fill in the details</p>

        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Customer ID
            <input type="number" placeholder="Unique ID" value={customerID} onChange={(e) => setCustomerID(e.target.value)} />
          </label>

          <label>
            Name
            <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </label>

          <label>
            Email
            <input type="email" placeholder="Customer Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
          </label>

          <label>
            Image URL
            <input type="text" placeholder="Link to image" value={customerImage} onChange={(e) => setCustomerImage(e.target.value)} />
          </label>

          <label>
            Project Name
            <input type="text" placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          </label>

          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-[#1f2028] text-white ml-10 cursor-pointer">
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </select>
          </label>
        </form>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <div onClick={handleSubmit}>
            <Button
              color="white"
              bgColor={currentColor}
              text="Add Entry"
              borderRadius="10px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
