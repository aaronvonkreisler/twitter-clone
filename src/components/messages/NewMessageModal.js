import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dialog, LinearProgress } from '@material-ui/core';
import { FiSearch } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { closeMessageModal } from '../../actions/modal';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch';
import SmallUserPreview from '../layout/SmallUserPreview';
import UserPill from './UserPill';
import '../../styles/design/newMessageModal.css';

const NewMessageModal = ({ startNewChat, open, closeMessageModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const fullScreen = useMediaQuery('(max-width: 500px)');

  const {
    handleSearchDebouncedRef,
    result,
    fetching,
    setFetching,
    setResult,
  } = useDebouncedSearch();

  useEffect(() => {
    if (result.length > 0 && setResult) {
      setResult(result);
    }
  }, [result, setResult]);

  useEffect(() => {
    if (selectedUsers.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [selectedUsers]);

  const handleRemoveUser = (user) => {
    setSelectedUsers(selectedUsers.filter((obj) => obj._id !== user._id));
  };

  const handleUserClick = (user) => {
    const userAlreadyExists =
      selectedUsers.filter((person) => person._id === user._id).length > 0;
    if (!userAlreadyExists) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      handleRemoveUser(user);
    }
  };

  const handleModalClose = () => {
    closeMessageModal();
    setSearchQuery('');
    setSelectedUsers([]);
    setResult([]);
  };

  const handleSubmit = () => {
    const userIds = selectedUsers.map((user) => user._id);
    startNewChat({ users: userIds });

    handleModalClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleModalClose}
      fullWidth
      fullScreen={fullScreen}
      scroll="paper"
    >
      <div className="modal-header">
        <div className="header-left">
          <button onClick={handleModalClose} className="close-button">
            <CgClose />
          </button>
        </div>
        <div className="header-right">
          <span className="title">New Message </span>
          <button
            onClick={handleSubmit}
            className="next-button"
            disabled={buttonDisabled}
          >
            <span className="button-text">Next</span>
          </button>
        </div>
      </div>
      <div className="modal-search">
        <div className="search-icon">
          <FiSearch />
        </div>
        <div className="search-input">
          <input
            type="text"
            placeholder="Search people"
            value={searchQuery}
            onChange={(e) => {
              handleSearchDebouncedRef(e.target.value);
              setSearchQuery(e.target.value);
              e.target.value && setFetching(true);
            }}
          />
        </div>
      </div>
      {selectedUsers.length > 0 && (
        <div className="selected-users">
          {selectedUsers.map((user) => (
            <UserPill user={user} key={user._id} onClick={handleRemoveUser} />
          ))}
        </div>
      )}

      <div className="modal-content">
        {fetching && <LinearProgress variant="indeterminate" />}
        {!fetching &&
          result &&
          result.length > 0 &&
          result.map((user) => (
            <SmallUserPreview
              user={user}
              bottomBorder
              key={user._id}
              onClick={handleUserClick}
            />
          ))}
      </div>
    </Dialog>
  );
};

NewMessageModal.propTypes = {
  startNewChat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  open: state.modal.messageOpen,
});
export default connect(mapStateToProps, { closeMessageModal })(NewMessageModal);
