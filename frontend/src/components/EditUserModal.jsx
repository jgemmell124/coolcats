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
} from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import FormControl from '@mui/material/FormControl';

const EditUserModal = ({ open, user, setShowEditModal }) => {
  const [role, setRole] = React.useState(user.role);
  const [email, setEmail] = React.useState(user.email);
  const [fullName, setFullName] = React.useState(user.name);
  const [username, setUsername] = React.useState(user.username);

  // const [error, setError] = React.useState(null);

  const handleClose = () => {
    setShowEditModal(false);
  };

  React.useEffect(() => {
    setRole(user.role);
    setEmail(user.email);
    setFullName(user.name);
    setUsername(user.username);
  }, [user]);

  const noEditsApplied = () => {
    return (
      role === user.role &&
      email === user.email &&
      fullName === user.name &&
      username === user.username
    );
  };

  return (
    <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={open}>
      <Stack
        direction='column'
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <DialogTitle>
          <b>Edit User Details</b>
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
          defaultValue={fullName}
          label='Full Name'
          sx={{ width: '300px', marginBottom: '15px' }}
          onChange={(e) => setFullName(e.target.value)}
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
            <MenuItem value={'EMPLOYEE'}>EMLPOYEE</MenuItem>
            <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
          </Select>
        </FormControl>

        {/* {error && <div className='alert alert-danger'>{error}</div>} */}

        <Button
          variant='contained'
          color='success'
          sx={{ marginBottom: '25px' }}
          disabled={
            noEditsApplied() || !username || !email || !fullName || !role
          }
          onClick={() => {
            // TODO: actually save the changes -- maybe show a response message on success/failure
            // TODO: maybe add a tooltip for disabled button that says you must change at least one field
            setShowEditModal(false);
          }}
        >
          <SaveAltIcon sx={{ marginRight: '5px' }} /> Save Changes
        </Button>
      </Stack>
    </Dialog>
  );
};

EditUserModal.propTypes = {
  open: PropTypes.bool,
  user: PropTypes.object,
  setShowEditModal: PropTypes.func,
};

export default EditUserModal;
