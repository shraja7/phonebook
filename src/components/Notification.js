import React from "react";
import "./Notification.css";

const Notification = ({ message, type }) => {
  let notificationClass = "";

  if (type === "success") {
    notificationClass = "notification-success";
  } else if (type === "error") {
    notificationClass = "notification-error";
  }

  return <div className={`notification ${notificationClass}`}>{message}</div>;
};

export default Notification;
