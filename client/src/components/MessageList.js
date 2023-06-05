import React from "react";
import { Pencil } from "react-bootstrap-icons";
import MessageItem from "./MessageItem";
export default function MessageList({ messages }) {
  return (
    <div className="list-group">
      <div
        className="list-group-item list-group-item-action active"
        aria-current="true"
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="">Messages</h5>
          <div
            className="d-flex btn btn-light d-flex text-black p-2"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <Pencil color="black" size={22} />
            <span className="mx-2">Write</span>
          </div>
        </div>
      </div>

      {messages &&
        messages.map((message) => (
          <MessageItem message={message} key={message._id} />
        ))}
    </div>
  );
}
