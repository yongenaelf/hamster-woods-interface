import { Modal, ModalProps, Row } from 'antd';
import { CloseIcon } from 'assets/images/index';

import styles from './style.module.css';
import useGetState from 'redux/state/useGetState';

export default function CommonModal({ children, title, onCancel, closable = true, className, ...params }: ModalProps) {
  const { isMobile } = useGetState();
  return (
    <Modal className={`${styles.commonModal} ${className}`} {...params} closable={false}>
      <Row className={`${styles.modal__title} modal__title`} justify="center" align="middle">
        <span>{title}</span>
        {closable && (
          <CloseIcon className={isMobile ? styles.modal__closeIcon_m : styles.modal__closeIcon} onClick={onCancel} />
        )}
      </Row>
      <div className="px-4">{children}</div>
    </Modal>
  );
}
