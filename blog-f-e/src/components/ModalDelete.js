import React from 'react';
import Modal from 'react-modal';

export const ModalDelete = ({ rModalOpen, deleteBlog, setRModalOpen }) => (
    <Modal
      className='delete-modal'
      isOpen={rModalOpen}
      contentLabel="Delete Blog"
      closeTimeoutMS={100}
      onRequestClose={() => setRModalOpen(false)}
    >
      <h5 className='delete-modal__title'>If you delete this blog there is no way to return it.</h5>
      <div className='delete-modal__buttons'>
        <abbr title='Delete Blog'>
          <button className='delete-modal__delete-button' data-testid='delete_button' onClick={deleteBlog}>Delete Blog</button>
        </abbr>
        <abbr title='Close'>
          <button className='delete-modal__close-button' data-testid='close_button' onClick={() => setRModalOpen(false)}>X</button>
        </abbr>
      </div>
    </Modal>
);

export default ModalDelete;