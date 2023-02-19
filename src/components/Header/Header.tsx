import { useState } from "react";
import { useUser } from "../../contex/user/userContext";
import LoginModal from "../auth/LoginModal";
import Avatar from "../Avatar";
import "./header.scss";

function Header() {
  const [state, dispatch] = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const login = () => {
    setIsLoginModalOpen(true);
  };
  return (
    <>
      <nav className="navbar header font-family h-full bg-light-gray">
        {state.name ? (
          <div
            className="flex justify-center items-center mt-2"
            onClick={() => {
              dispatch({ type: "UNSET" });
            }}
          >
            <div className="mx-xs">
              <p className="flex">{state.name}</p>
              <p className="text-xs"> your comments: 4</p>
            </div>
            <Avatar
              className="rounded-full"
              alt={state.name}
              src={state.avatar}
              width={48}
              height={48}
            />
          </div>
        ) : (
          <div
            className="btn btn-light rounded-sm"
            onClick={() => {
              login();
            }}
          >
            Login
          </div>
        )}
      </nav>
      {isLoginModalOpen && (
        <LoginModal
          showModal={isLoginModalOpen}
          setShowModal={setIsLoginModalOpen}
        />
      )}
    </>
  );
}

export default Header;
