import React from "react";

export default function MessageItem({ message }) {
  return (
    <div
      className="list-group-item list-group-item-action"
      data-bs-toggle="collapse"
      data-bs-target={`#${message.sender + message.createdAt}`}
      aria-expanded="false"
      aria-controls={message.sender}
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{message.sender}</h5>
        <small className="text-body-secondary">
          {new Date(message.createdAt).toLocaleString()}
        </small>
      </div>
      <p className="mb-1">{message.subject}</p>
      <div className="collapse" id={message.sender + message.createdAt}>
        <div className="card card-body">
          <small className="text-body-secondary">{message.text}</small>
        </div>
      </div>
    </div>
  );
}
