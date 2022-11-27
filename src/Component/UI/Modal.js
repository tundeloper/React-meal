import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  const [portal, setPortal] = useState();
  useEffect(() => {
    if (!portal) {
      const portalElement = document.createElement("div");
      portalElement.setAttribute("id", "overlays");
      document.querySelector("body").append(portalElement);
      setPortal(portalElement);
    }
  }, [portal]);
  return (
    <>
      {portal && (
        <>
          {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portal)}
          {ReactDOM.createPortal(
            <ModalOverlay>{props.children}</ModalOverlay>,
            portal
          )}
        </>
      )}
    </>
  );
};

export default Modal;
