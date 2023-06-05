import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AlertList from "./AlertList";
import MessageList from "./MessageList";
import Form from "./Form";

export default function Main() {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const [auth, setAuth] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [state, setState] = useState({
    sender: location.state?.name || false,
    recipient: "",
    subject: "",
    text: "",
  });

  useEffect(() => {
    if (!location.state) navigate("/login");
    fetchMessages();
    const ws = new WebSocket("ws://task6-ipcd.onrender.com/");
    ws.onopen = () => {
      console.log("WebSocket connection established");
    };
    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      if (newMessage.recipient === state.sender) {
        setAlerts((prevAlerts) => [...prevAlerts, newMessage]);
        fetchMessages();
      }
    };

    return () => {
      setAuth(false);
      ws.close();
    };
  }, [location.state, navigate]);

  const fetchMessages = () => {
    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ recipient: state.sender }),
    })
      .then((data) => data.json())
      .then((data) => {
        setMessages(data.messages);
        setUserList(data.uniqueUserNames);
      });
  };

  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/messages/create", {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setState({ ...state, recipient: "", subject: "", text: "" });
  };

  return (
    <div className="w-50  mx-auto pt-5">
      <AlertList alerts={alerts} />
      <MessageList messages={messages} />
      <Form
        state={state}
        handleSubmit={handleSubmit}
        inputHandler={inputHandler}
        userList={userList}
      />
    </div>
  );
}
