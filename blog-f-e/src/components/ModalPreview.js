import React from "react";
import Modal from "react-modal";
import BlogPage from "./BlogPage";

export const ModalPreview = ({ pModalOpen, setPModalOpen, bid }) => {
    return (
        <div className="modal-preview__container">
            <Modal
                className="modal-preview"
                isOpen={pModalOpen}
                contentLabel="Preview Blog"
                closeTimeoutMS={50}
                onRequestClose={() => setPModalOpen(false)}
            >
                <div className="modal-preview__button-container">
                    <button className="modal-preview__close-button" data-testid='close_button' onClick={() => setPModalOpen(false)}>X</button>
                </div>
                <BlogPage match={{params: {bid: `${bid}`}}} isPreview={true} />
            </Modal>
        </div>
    )
};

export default ModalPreview;