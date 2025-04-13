import React, { useState } from "react";
import axios from "axios";
import "./TransactionModal.css";
import Button from "../Button";
import { useStateContext } from "../../contexts/ContextProvider";

export default function WebsiteModal({ isOpen, onClose }) {
  const { currentColor } = useStateContext();

  const [productImage, setProductImage] = useState("");
  const [company, setCompany] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState("active");

  if (!isOpen) return null;

  const user = JSON.parse(localStorage.getItem("user"));

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#00fe93";
      case "completed":
        return "#fec80a";
      case "cancelled":
        return "#fe6c00";
      case "rejected":
        return "#fe1e00";
      default:
        return "#a8a5a6";
    }
  };

  const handleSubmit = async () => {
    try {
      const newWebsite = {
        ProductImage: productImage,
        company,
        owner,
        traffic: "N/A", // Placeholder
        lastUpdated: new Date(), // Or whatever logic you want
        Location: "Global", // Placeholder
        Status: status,
        StatusBg: getStatusColor(status),
      };

      if (user.role === 'user') {
        const userId = user._id; // Get the user ID from localStorage
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/website/${userId}`,
          newWebsite
        );
        console.log("Website added:", response.data);
        localStorage.setItem(
          "websiteData",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("websiteData") || "[]"),
            response.data,
          ])
        );
        await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/website`,
          newWebsite
        );
        window.location.reload();
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/website`,
          newWebsite
        );
        console.log("Website added:", response.data);
        localStorage.setItem(
          "websiteData",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("websiteData") || "[]"),
            response.data,
          ])
        );
      }

      window.location.reload(); // Reload the page to see the new data
      onClose(); // Close the modal after successful add
    } catch (error) {
      console.error("Failed to add website:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add New Website</h3>
        <p className="modal-subtext">Fill in the details</p>

        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Image
            <input
              type="text"
              placeholder="Give image link"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
            />
          </label>

          <label>
            Company
            <input
              type="text"
              placeholder="company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </label>

          <label>
            Owner
            <input
              type="text"
              placeholder="name"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </label>

          <label>
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-[#1f2028] text-white ml-10 cursor-pointer"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
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
              text="Add Website"
              borderRadius="10px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
