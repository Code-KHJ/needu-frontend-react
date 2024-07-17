import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './Modal.module.scss';

interface ModalProps {
  modalOpen: boolean;
  title: string;
  type: string;
  children: React.ReactNode;
}

Modal.setAppElement('#root');

const ModalComponent: React.FC<ModalProps> = ({
  modalOpen,
  title,
  type,
  children,
}) => {
  // react-modal 스타일
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      zIndex: 11,
    },
    content: {
      position: 'absolute',
      width: '80%',
      height: 'auto',
      maxWidth: '740px',
      top: '50%',
      right: 'unset',
      bottom: 'unset',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      padding: '0',
      overflow: 'visible',
    },
  };

  const [isOpen, setIsOpen] = useState(modalOpen);

  useEffect(() => {
    setIsOpen(modalOpen);
  }, [modalOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className={styles.modal_wrap}
    >
      <div className={styles.modal_title}>
        <h4>{title}</h4>
        <button className={styles.btn_close} type="reset" onClick={closeModal}>
          <img src="src/assets/images/cancel.png" alt="닫기" />
        </button>
      </div>
      <div className={styles.modal_content}>{children}</div>
    </Modal>
  );
};

export default ModalComponent;
