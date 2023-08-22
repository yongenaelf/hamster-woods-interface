import { Modal, ModalProps, Row } from 'antd';
import { CloseIcon } from 'assets/images/index';

import styles from './style.module.css';

export default function CommonModal({ children, title, onCancel, closable = true, className, ...params }: ModalProps) {
  return (
    <Modal className={`${styles.commonModal} ${className}`} {...params} closable={false}>
      <Row className={`${styles.modal__title} modal__title`} justify="center" align="middle">
        <span>{title}</span>
        {closable && <CloseIcon className={styles.modal__closeIcon} onClick={onCancel} />}
      </Row>
      <div className="px-4">{children}</div>
    </Modal>
  );
}
