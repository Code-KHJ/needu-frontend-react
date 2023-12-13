import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Modal.scss";
import SearchId from "./contents/SearchId";
import SearchPw from "./contents/SearchPw";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  closeModal: () => void;
  content: string;
}

Modal.setAppElement("#root");

const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  closeModal,
  content,
}) => {
  // react-modal 스타일
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      zIndex: 11,
    },
    content: {
      width: "80%",
      height: "auto",
      maxWidth: "820px",
      top: "50%",
      right: "unset",
      bottom: "unset",
      left: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      padding: "0",
      overflow: "visible",
    },
  };

  //content에 따라 하위 컴포넌트 불러오기
  const [modalTitle, setModalTitle] = useState<string>("Title");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  useEffect(() => {
    switch (content) {
      case "searchId":
        setModalTitle("아이디 찾기");
        setModalContent(<SearchId />);
        break;
      case "searchPw":
        setModalTitle("비밀번호 찾기");
        setModalContent(<SearchPw />);
        break;
    }
  }, [content]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className="modal-title">
        <div>{modalTitle}</div>
        <button className="btn-close" type="reset" onClick={closeModal}>
          <img src="src/assets/images/cancel.png" alt="닫기" />
        </button>
      </div>
      <div className="modal-content">{modalContent}</div>
    </Modal>
  );
};

export default ModalComponent;
