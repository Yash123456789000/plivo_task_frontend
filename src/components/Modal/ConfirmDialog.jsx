import React from "react"
import { FiAlertTriangle } from "react-icons/fi"
import "./ConfirmDialog.css"
import { useNavigate } from "react-router-dom";

export default function ConfirmDialog({ isOpen, onClose, onConfirm, message, heading }) {
  if (!isOpen) return null

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('websiteData');
    localStorage.removeItem('apiData');
    localStorage.removeItem('databaseData');
    localStorage.removeItem('calendarData');
    localStorage.removeItem('colorMode');
    localStorage.removeItem('themeMode');
    navigate('/');
    window.location.reload();
  }

  return (
    <div className="modal-overlay">
      <div className="modal animated-scale">
        <div className="modal-header">
          <FiAlertTriangle size={24} className="icon-warning" />
          <h3>{heading}</h3>
        </div>
        <p className="modal-subtext">{message || "Are you sure?"}</p>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="submit-btn" onClick={handleLogout}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
