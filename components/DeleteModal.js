import { Modal, ModalHeader, ModalBody, ModalFooter } from '../utils/Modal';

export default function DeleteModal({
  showModal,
  confirmDelete,
  cancelDelete,
}) {
  return (
    <Modal open={showModal} onClose={() => cancelDelete()}>
      <ModalHeader text="Do you want to continue?" />
      <ModalBody>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae rerum
          consequatur accusamus fuga iure laudantium, inventore aliquam animi
          facilis soluta, exercitationem nihil quasi blanditiis ex aut error
          placeat dolorum voluptate.
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
