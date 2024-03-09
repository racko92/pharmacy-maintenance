import React from 'react';
import { Modal } from 'antd';

interface IConfirmationModalProps {
  isModalOpen: boolean;
  title: string;
  content: string | React.ReactNode;
  handleOk: () => void;
  handleCancel: () => void;
}

const ConfirmationModal = ({
  isModalOpen,
  title,
  content,
  handleOk,
  handleCancel,
}: IConfirmationModalProps) => (
  <Modal
    title={title}
    open={isModalOpen}
    onOk={handleOk}
    onCancel={handleCancel}
  >
    {content}
  </Modal>
);

export default ConfirmationModal;
