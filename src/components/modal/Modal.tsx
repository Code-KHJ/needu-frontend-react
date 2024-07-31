import React, { useEffect } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.scss";
import ico_cancel from "@/assets/images/ico_cancel_white.png";

interface ModalProps {
  modalOpen: boolean;
  title: string;
  children: React.ReactNode;
  closeModal: () => void;
}

Modal.setAppElement("#root");

const ModalComponent: React.FC<ModalProps> = ({
  modalOpen,
  title,
  children,
  closeModal,
}) => {
  // react-modal 스타일
  const customStyles: Modal.Styles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      zIndex: 11,
    },
    content: {
      position: "absolute",
      width: "80%",
      height: "auto",
      maxWidth: "740px",
      maxHeight: "80vh",
      top: "50%",
      right: "unset",
      bottom: "unset",
      left: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      padding: "0",
      overflow: "auto",
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
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className={styles.modal_wrap}
    >
      <div className={styles.modal_title}>
        <h4>{title}</h4>
        <button className={styles.btn_close} type="reset" onClick={closeModal}>
          <img src={ico_cancel} alt="닫기" />
        </button>
      </div>
      <div className={styles.modal_content}>{children}</div>
    </Modal>
  );
};

export default ModalComponent;
