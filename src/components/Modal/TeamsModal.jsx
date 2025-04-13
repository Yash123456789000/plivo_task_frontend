import React from "react"
import "./TransactionModal.css"

export default function TeamsModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add New Employee</h3>
        <p className="modal-subtext">Fill in the details</p>

        <form className="modal-form">
          <label>
            Name
            <input type="text" placeholder="Full name" />
          </label>
          <label>
            Team
            <input type="number" placeholder="e.g. Sales Team"/>
          </label>
          <label>
            Position
            <input type="text" placeholder="e.g. Intern" />
          </label>
        </form>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="submit-btn"
            onClick={() => {
              // you can handle the submit logic here
              onClose()
            }}
          >
            Add Team
          </button>
        </div>
      </div>
    </div>
  )
}
