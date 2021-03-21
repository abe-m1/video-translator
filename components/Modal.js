import ReactDom from 'react-dom';
import styles from '../styles/Modal.module.scss';

export default function Modal({ showModal }) {
  return showModal
    ? ReactDom.createPortal(
        <div className={styles.modalBackground}>
          <div className={styles.modal}>MODAL</div>
        </div>,
        document.body
      )
    : null;
}
