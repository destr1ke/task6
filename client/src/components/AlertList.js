import React from "react";
import Alert from "./Alert";

export default function AlertList({ alerts }) {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {alerts.map((alert) => (
        <Alert alert={alert} key={alert._id} />
      ))}
    </div>
  );
}
