import React, { useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { startEditProfile } from '../actions/userPage';

export const ModalEditProfile = ({ ePrModalOpen, setEdPrModalOpen, bio, resetInfoProfile, uname, startEditProfile }) => {
  const [bioVal, setBioVal] = useState(bio);

  const onBioChange = (e) => {
    const bio = e.target.value;
    setBioVal(bio);
  }

  const onFormEditProfileSub = (e) => {
    e.preventDefault();

    startEditProfile(uname, {bio: bioVal});
    resetInfoProfile({bio: bioVal});
    setEdPrModalOpen(false);
  }

  return (
    <Modal
      className='modal-edit-profile'
      isOpen={ePrModalOpen}
      contentLabel="Edit Profile"
      closeTimeoutMS={100}
      onRequestClose={() => setEdPrModalOpen(false)}
    >
      <h5 className='modal-edit-profile__title'>Edit profile</h5>
      <form
        className='modal-edit-profile__form'
        data-testid='form'
        onSubmit={onFormEditProfileSub}
      >
        <textarea
          data-testid='bio_input'
          type='text'
          placeholder='Bio'
          value={bioVal}
          onChange={onBioChange}
        />
        <div className='modal-edit-profile__buttons'>
          <abbr title='Save Changes'>
            <button
              className='save-button'
              data-testid='save_button'
            >
              Save New Infos
            </button>
          </abbr>
        </div>
      </form>
      <div className='modal-edit-profile__buttons'>
        <abbr title='Close'>
            <button
              className='close-button'
              data-testid='close_button'
              onClick={() => setEdPrModalOpen(false)}
            >
              X
            </button>
        </abbr>
      </div>
    </Modal>
)};

const mapStateToProps = (state) => ({
  uname: state.auth.uname,
});

const mapDispatchToProps = (dispatch) => ({
  startEditProfile: (uname, updates) => dispatch(startEditProfile(uname, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditProfile);