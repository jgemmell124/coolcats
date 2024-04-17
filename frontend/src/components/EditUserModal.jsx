import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  Stack,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { createUser, updateUser } from '../apis/Users';

const EditUserModal = ({
  open,
  selectedUser,
  setShowEditModal,
  action,
  setError,
  setSuccess,
}) => {
  const [role, setRole] = React.useState(selectedUser.role);
  const [email, setEmail] = React.useState(selectedUser.email);
  const [name, setName] = React.useState(selectedUser.name);
  const [username, setUsername] = React.useState(selectedUser.username);

  const handleClose = () => {
    setShowEditModal(false);
  };

  const handleSubmit = () => {
    setError(null);
    const userParams = { username, email, password: '123', name, role };
    if (action === 'Create') {
      createUser(userParams)
        .then(() => {
          setSuccess('User created successfully!');
        })
        .catch((err) => {
          setError(err?.response?.data ?? err.message);
          return;
        });
    } else if (action === 'Edit') {
      updateUser(selectedUser._id, userParams)
        .then(() => {
          setSuccess('User saved successfully!');
        })
        .catch((err) => {
          setError(err?.response?.data ?? err.message);
          return;
        });
    }
    handleClose();
  };

  React.useEffect(() => {
    setRole(selectedUser.role);
    setEmail(selectedUser.email);
    setName(selectedUser.name);
    setUsername(selectedUser.username);
  }, [selectedUser]);

  const noEditsApplied = () => {
    return (
      role === selectedUser.role &&
      email === selectedUser.email &&
      name === selectedUser.name &&
      username === selectedUser.username
    );
  };

  return (
    <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={open}>
      <Stack
        direction='column'
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <DialogTitle>
          <b>{action} User</b>
        </DialogTitle>

        <TextField
          id='username-input'
          label='Username'
          defaultValue={username}
          sx={{ width: '300px', marginBottom: '15px' }}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          id='name-input'
          defaultValue={name}
          label='Full Name'
          sx={{ width: '300px', marginBottom: '15px' }}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          id='email-input'
          label='Email Address'
          defaultValue={email}
          sx={{ width: '300px', marginBottom: '15px' }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormControl sx={{ width: '300px', marginBottom: '15px' }}>
          <InputLabel id='role-select-label'>Role</InputLabel>
          <Select
            labelId='role-select-label'
            id='role-select'
            style={{
              textAlign: 'left',
            }}
            value={role}
            label='Role'
            onChange={(event) => setRole(event.target.value)}
          >
            <MenuItem value={'USER'}>USER</MenuItem>
            <MenuItem value={'EMPLOYEE'}>EMPLOYEE</MenuItem>
            <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type='submit'
          disabled={noEditsApplied() || !username || !email || !name || !role}
          onClick={handleSubmit}
        >
          {action === 'Create' ? 'Create' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  selectedUser: PropTypes.object,
  setShowEditModal: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
};

export default EditUserModal;
