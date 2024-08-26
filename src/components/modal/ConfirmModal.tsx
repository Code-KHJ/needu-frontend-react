import React from "react";
import styles from "./Modal.module.scss";
import ModalComponent from "./Modal";

interface ConfirmModalProps {
  message: string;
  onClickOK: () => void;
  onClickCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onClickOK,
  onClickCancel,
}) => {
  return (
    <ModalComponent title="" modalOpen closeModal={onClickCancel}>
      <div>{message}</div>
      <div className={styles.btn_2}>
        <button
          style={{
            backgroundColor: "#aaa",
          }}
          onClick={onClickCancel}
        >
          취소
        </button>
        <button
          style={{
            backgroundColor: "#6269f5",
          }}
          onClick={onClickOK}
        >
          확인
        </button>
      </div>
    </ModalComponent>
  );
};

export default ConfirmModal;
