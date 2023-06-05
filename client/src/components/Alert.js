import React from "react";

export default function Alert({ alert }) {
  return (
    <div
      className="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      key={alert._id}
      data-bs-autohide="true"
    >
      <div className="toast-header">
        <strong className="me-auto">{alert.sender}</strong>
        <small className="text-body-secondary">
          {new Date(alert.createdAt).toLocaleTimeString()}
        </small>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body ">
        <p className="text-success">Subject: {alert.subject}</p>
        <small className="text-success">Message: {alert.text}</small>
      </div>
    </div>
  );
}
