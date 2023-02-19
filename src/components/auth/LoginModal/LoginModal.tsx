import { useState } from "react";
import "./loginModal.scss";
import { useUser } from "./../../../contex/user/userContext";
import { IModalBase } from "../../../types";
import Modal from "../../Modal";

function LoginModal({ setShowModal, showModal }: IModalBase) {
  const [, dispatch] = useUser();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const submitForm = () => {
    try {
      if (value === "") {
        throw new Error("Please enter your username");
      }
      if (value.length < 3) {
        throw new Error("Username must be at least 3 characters");
      }

      dispatch({
        type: "SET",
        payload: {
          name: value,
          avatar:
            "https://www.soorban.com/images/news/2022/01/1641362628_Y7vG6.jpg",
        },
      });
      setShowModal(false);
    } catch (e: Error | any) {
      setError(e.message);
    }
  };
  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className=" mt-5 font-family">
        <h1 className="text-center ">Welcome!</h1>
        <p className="text-center mb-5">Please enter your name to continue.</p>
        <form className="my-xl">
          <div className="form-group flex flex-column">
            <label htmlFor="nameInput">Name:</label>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              className="input rounded-sm py-xl"
              id="nameInput"
              placeholder="Enter your name"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary my-xl w-full rounded-sm py-xl text-base "
            onClick={(evt) => {
              evt.preventDefault();
              submitForm();
            }}
          >
            Submit
          </button>
          <p className="text-danger">{error}</p>
        </form>
      </div>
    </Modal>
  );
}

export default LoginModal;
