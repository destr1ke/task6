import React from "react";

export default function Form({ state, inputHandler, handleSubmit, userList }) {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog ">
        <div className="modal-content py-2">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Write message
            </h1>
            <button
              type="button"
              className="btn-close "
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex align-items-center justify-content-center">
            <form className="d-flex flex-column w-75" onSubmit={handleSubmit}>
              <input
                type="name"
                value={state.subject}
                onChange={inputHandler}
                className="form-control align-self-center mt-1"
                placeholder="subject"
                autoComplete="off"
                required
                name="subject"
              />
              <input
                type="name"
                value={state.recipient}
                onChange={inputHandler}
                className="form-control align-self-center mt-1"
                placeholder="recipient"
                required
                name="recipient"
                list="datalistOptions"
              />

              <datalist id="datalistOptions">
                {userList &&
                  userList.map((user) => <option value={user} key={user} />)}
              </datalist>

              <textarea
                type="text"
                value={state.text}
                onChange={inputHandler}
                className="form-control align-self-center mt-1"
                placeholder="start message"
                autoComplete="off"
                required
                name="text"
              />
              <input
                type="submit"
                className="form-control mt-3  align-self-center btn btn-outline-primary"
                value={"Send"}
                data-bs-dismiss="modal"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
