import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const inputHandler = (e) => {
    setName(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    navigate("/", { state: { auth: true, name } });
  }

  return (
    <div className=" w-25 min-vh-100 mx-auto d-flex flex-column justify-content-center ">
      <form className="d-flex flex-column w-75" onSubmit={handleSubmit}>
        <input
          type="name"
          value={name}
          onChange={inputHandler}
          className="form-control align-self-center"
          placeholder="Enter name"
          autoComplete="off"
          required
          name="name"
        />
        <input
          type="submit"
          className="form-control mt-3  align-self-center btn btn-outline-primary"
          value={"Sign in"}
        />
      </form>
    </div>
  );
}
