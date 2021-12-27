import React from 'react';
import Modal from 'react-modal';
import NewBlog from './NewBlog';

export const ModalEdit = ({ eModalOpen, blog, setEModalOpen }) => (
        <Modal
            className='edit-modal'
            isOpen={eModalOpen}
            contentLabel="Edit Blog"
            closeTimeoutMS={100}
            onRequestClose={() => setEModalOpen(false)}
        >
            <div className='edit-modal__buttons'>
                <abbr title='Close'>
                    <button className='edit-modal__close-button' data-testid='close_button' onClick={() => setEModalOpen(false)}>X</button>
                </abbr>
            </div>
            <div className='edit-modal__form'>
                <NewBlog isEdit={true} blog={blog} edit={() => setEModalOpen(false)} />
            </div>
        </Modal>
);

export default ModalEdit;