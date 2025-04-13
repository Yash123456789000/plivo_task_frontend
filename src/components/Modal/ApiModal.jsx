import React, { useState } from "react";
import "./TransactionModal.css";
import Button from "../Button";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";

export default function ApiModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { currentColor } = useStateContext();

  // State for input fields
  const [apiService, setApiService] = useState("");
  const [company, setCompany] = useState("");
  const [employee, setEmployee] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async () => {
    try {
      const newApi = {
        EmployeeID: parseInt(employeeId), // Convert to number, as required by the schema
        api: apiService,
        company,
        employee,
        lastUpdated: new Date().toISOString().split("T")[0], // Optional - will default in schema
        Country: "Global" // Optional - will default in schema
      };

      if(user.role == "user") {
        const userId = user._id; // Get the user ID from localStorage
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/${userId}`, newApi);
        console.log("API added:", response.data);
        const existingApis = JSON.parse(localStorage.getItem("apiData")) || [];
        const updatedApis = [...existingApis, response.data];
        localStorage.setItem("apiData", JSON.stringify(updatedApis));
        await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api`, newApi);
      }
      else{
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api`, newApi);
        console.log("API added:");

        // ✅ Optional: Update localStorage if you store APIs locally
        const existingApis = JSON.parse(localStorage.getItem("apiData")) || [];
        const updatedApis = [...existingApis, response.data];
        localStorage.setItem("apiData", JSON.stringify(updatedApis));
      }

      window.location.reload(); 

      onClose(); // close modal
    } catch (error) {
      console.error("Failed to add API:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add New API</h3>
        <p className="modal-subtext">Fill in the details</p>

        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            API
            <input
              type="text"
              placeholder="API Service"
              value={apiService}
              onChange={(e) => setApiService(e.target.value)}
            />
          </label>

          <label>
            Company
            <input
              type="text"
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </label>

          <label>
            Employee
            <input
              type="text"
              placeholder="Name"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
            />
          </label>

          <label>
            ID
            <input
              type="text"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
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
              text="Add API"
              borderRadius="10px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
