import { useEffect } from "react";
import Modal from "react-modal";
import { HashLoader } from "react-spinners";

Modal.setAppElement("#root");

const IsLoadingSpinner = () => {
  const modalOpen = true;
  // react-modal 스타일
  const customStyles: Modal.Styles = {
    overlay: {
      backgroundColor: "#ffffffb7",
      zIndex: 999,
    },
    content: {
      position: "absolute",
      width: "50%",
      height: "auto",
      maxWidth: "740px",
      maxHeight: "80vh",
      top: "40%",
      right: "unset",
      bottom: "unset",
      left: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      padding: "0",
      overflow: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: "0",
      background: "unset",
    },
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalOpen]);

  return (
    <Modal isOpen={modalOpen} style={customStyles}>
      <h5 style={{ color: "#888", marginBottom: "40px" }}>
        잠시만 기다려주세요.
      </h5>
      <HashLoader color="#6269f5" />
    </Modal>
  );
};

export default IsLoadingSpinner;
