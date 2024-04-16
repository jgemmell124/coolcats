import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';

const DeleteConfirmDialog = ({ selectedItem, deleteFunc, itemType, name, open, setShowDeleteConfirmDialog, setError, setSuccess }) => {
  const handleClose = () => {
    setShowDeleteConfirmDialog(false);
  };

  const handleDelete = async () => {
    setError(null);
    deleteFunc(selectedItem._id)
      .then(() => {
        setSuccess(`${itemType} deleted successfully!`);
      })
      .catch((err) => {
        setError(err?.response?.data ?? err.message);
        return;
      });
    handleClose();
  };

  return (
    <Dialog
      open={open}
    >
      <DialogTitle>Delete {itemType}</DialogTitle>
      <DialogContent>Are you sure you want to delete {name}?</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteConfirmDialog.propTypes = {
  selectedItem: PropTypes.object.isRequired,
  deleteFunc: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setShowDeleteConfirmDialog: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired
};

export default DeleteConfirmDialog;