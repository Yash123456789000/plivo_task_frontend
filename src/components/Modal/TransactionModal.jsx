import React from "react"
import "./TransactionModal.css"

export default function TransactionModal({ isOpen, heading, message, label1, placeholder1, label2, placeholder2, label3, placeholder3, onClose }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add New {heading}</h3>
        <p className="modal-subtext">{message}</p>

        <form className="modal-form">
          <label>
            {label1}
            <input type="text" placeholder={`e.g. ${placeholder1}`} />
          </label>
          <label>
            {label2}
            <input type="number" placeholder={`e.g. ${placeholder2}`} />
          </label>
          <label>
            {label3}
            <input type="text" placeholder={`e.g. ${placeholder3}`} />
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
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  )
}
