import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  Stack,
  Box,
  Button,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
} from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const EditUserModal = ({ open, user, setShowEditModal }) => {
  // Make an initial copy of the user object
  const initialUserInfo = { ...user };
  console.log(`opened edit user modal with user ${user}`);

  const [role, setRole] = React.useState(user.role);
  const [email, setEmail] = React.useState(user.email);
  const [fullName, setFullName] = React.useState(user.name);
  const [username, setUsername] = React.useState(user.username);

  const handleClose = () => {
    setShowEditModal(false);
  };

  React.useEffect(() => {
    setRole(user.role);
    setEmail(user.email);
    setFullName(user.name);
    setUsername(user.username);
  }, [user]);

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

        <Button
          variant='contained'
          color='success'
          sx={{ marginBottom: '25px' }}
        >
          <SaveAltIcon
            sx={{ marginRight: '5px' }}
            disabled={initialUserInfo === user}
          />{' '}
          Save Changes
        </Button>
      </Stack>
    </Dialog>
  );
};

// import React, { useState } from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import {
//   DialogContent,
//   Grid,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   TextField,
// } from '@mui/material';
// import PropTypes from 'prop-types';

// const EditUserModal = ({ open, user }) => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState('');
//   const [ingredients, setIngredients] = useState([]);

//   return (
//     <Dialog open={open} fullWidth maxWidth='sm'>
//       <DialogTitle>Edit User {user.username}</DialogTitle>
//       <DialogContent>
//         <Grid container spacing={2}>
//           <Grid item sm={8}>
//             <TextField
//               fullWidth
//               required
//               id='name'
//               placeholder='Name'
//               onChange={(e) => setName(e.target.value)}
//             />
//           </Grid>
//           <Grid item sm={4}>
//             <OutlinedInput
//               fullWidth
//               id='outlined-adornment-amount'
//               startAdornment={
//                 <InputAdornment position='start'>$</InputAdornment>
//               }
//               placeholder='Price'
//               onChange={(e) => setPrice(e.target.value)}
//             />
//           </Grid>
//           <Grid item sm={12}>
//             <TextField
//               fullWidth
//               required
//               multiline
//               rows={3}
//               placeholder='Description'
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </Grid>
//           <Grid item sm={12}>
//             <h6>Ingredients</h6>
//           </Grid>
//         </Grid>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const RenderIngredients = ({ ingredients }) => {
//   return (
//     <div>
//       {ingredients.map((ingredient) => {
//         {
//           ingredient;
//         }
//       })}
//     </div>
//   );
// };

EditUserModal.propTypes = {
  open: PropTypes.bool,
  user: PropTypes.object,
  setShowEditModal: PropTypes.func,
};

export default EditUserModal;
