import { Modal, ModalHeader, ModalBody, ModalFooter } from '../utils/Modal';

export default function DeleteModal({
  showModal,
  confirmDelete,
  cancelDelete,
  pendingDelete,
}) {
  return (
    <Modal open={showModal} onClose={() => cancelDelete()}>
      <ModalHeader text="Do you want to continue?" />
      <ModalBody>
        <p>
          Are you sure you want to delete the video: {pendingDelete.title}. Any
          saved Translations will also be deleted?
        </p>
      </ModalBody>
      <ModalFooter>
        <div>
          <button onClick={() => confirmDelete()}>Accept</button>
          <button onClick={() => cancelDelete()}>Cancel</button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
