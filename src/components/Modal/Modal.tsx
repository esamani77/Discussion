import { CloseSquare } from "iconsax-react";
import { useRef } from "react";
import "./modal.scss";
import { IProps } from "./Modal.types";

function Modal({ children, setShowModal, showModal }: IProps) {
  const modalBackDrop = useRef(null);

  const backClicked = (evt: any) => {
    if (modalBackDrop.current && evt?.target?.classList[0] === "modal") {
      setShowModal(false);
    }
  };

  return (
    <div
      className="modal absolute top-0 left-0 flex justify-center items-center"
      onClick={backClicked}
      ref={modalBackDrop}
    >
      <div className="modal-body flex justify-center items-center flex-column relative rounded-sm">
        <span
          className="absolute top-0 left-0 m-2"
          onClick={() => setShowModal(false)}
        >
          <CloseSquare size={16} />
        </span>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
