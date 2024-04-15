import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Button,
  CardMedia, 
  CardHeader, 
  CardContent,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Input,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuth } from '../auth/authSlice';
import { ROLES_ENUM } from '../utils/constants';
import { Box } from '@mui/system';
import { updateUser } from '../apis/Users';
import Alert from './Alert';

const ProfileCard = ({ currentUser, setCurrentUser }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUser);
  const [error, setError] = useState(null);
  const { role, user } = useSelector(selectAuth);

  const { _id, email } = currentUser;
  const isAdmin = role === ROLES_ENUM.ADMIN;
  const isSelf = _id === user?._id;

  const roleDropDown = (
    isAdmin &&
    <InputLabel 
      sx={{ color: 'black' }}
    >
      {'Role: '}
      {isEditMode ? (
        <Select
          disabled={!isEditMode}
          variant='standard'
          size='small'
          value={editedUser.role ?? ROLES_ENUM.USER}
          onChange={e => {
            setEditedUser({ ...editedUser, role: e.target.value });
          }}
        >
          {Object.values(ROLES_ENUM).map(key => (
            <MenuItem key={key} value={ROLES_ENUM[key]}>
              {ROLES_ENUM[key]}
            </MenuItem>
          ))}
        </Select>

      )
        : (
          <TextField 
            size='small'
            disabled={!isEditMode}
            InputProps={{ disableUnderline: !isEditMode }} 
            variant='standard'
            value={editedUser.role} 
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'grey',
              },
            }} 
          />
        )}
    </InputLabel>
  );

  const editProfileButton = () => {
    return (
      <Button variant='contained' disableElevation onClick={() => setIsEditMode(true)}>Edit Profile</Button>
    );
  };

  const saveProfileButton = () => {
    const handleSave = async () => {
      // save profile
      try {
        const updatedUser = await updateUser(currentUser.username, editedUser);
        setIsEditMode(false);
        setCurrentUser(updatedUser);
        setEditedUser(updatedUser);
      } catch (e) {
        setError(e.response?.data);
      }
    };

    const handleCancel = () => {
      setEditedUser(currentUser);
      setIsEditMode(false);
    };


    return (
      <>
        <Button variant='contained' color='success' disableElevation onClick={handleSave}>Save</Button>
        <Button style={{ marginLeft: '4px' }} variant='contained' color='error' disableElevation onClick={handleCancel}>Cancel</Button>
      </>
    );
  };

  const usernameField = (
    <Box fontSize={'12'} sx={{ paddingBottom: '10px', display: 'flex', alignItems: 'flex-end' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Box paddingBottom='1px'>
          <Typography variant='h6' style={{ color: 'action.active' }}>@</Typography>
        </Box>
        <TextField
          size='small'
          label={isEditMode ? 'Username' : ''}
          variant='standard'
          onChange={e => setEditedUser({ ...editedUser, username: e.target.value })}
          value={editedUser.username}
          disabled={!isEditMode}
          InputProps={{ disableUnderline: !isEditMode }}
          inputProps={{ style: { fontSize: '18px' } }}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#000000',
            },
          }} 
        />
      </Box>
    </Box>
  );

  const imgInputStyle = {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  };

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid xs={3} item alignSelf={'center'}>
            <Tooltip title={isEditMode ? 'Change Profile Picture' : ''}>
              <IconButton 
                component='label'
                disabled={!isEditMode}
              >
                <CardMedia
                  component='img'
                  image='/Snoopy-doghouse-1.jpg'
                  alt='Snoopy doghouse'
                  sx={{ padding: '4px',  borderRadius: '50%', border: `${isEditMode ? '1px dashed grey' : ''}` }}
                  style={{ width: '100%', height: 'auto' }}
                />
                {/* TODO upload an actual image */}
                <Input type='file' style={imgInputStyle} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={9}>
            <CardHeader 
              action={(isAdmin || isSelf) && (isEditMode ? saveProfileButton() : editProfileButton())}
              title={usernameField}
              subheader={isAdmin ? `User ID: ${_id}` : ''}
              subheaderTypographyProps={{
                variant: 'subtitle2',
                color: 'gret',
              
              }}
            />
            <CardContent sx={{ flex: '2 0 auto' }}>
              <div style={{ margin: '10px' }}>
                <InputLabel sx={{ color: 'black' }}>{'Name: '}
                  <TextField 
                    size='small'
                    disabled={!isEditMode}
                    InputProps={{ disableUnderline: !isEditMode }}
                    variant='standard'
                    onChange={e => setEditedUser({ ...editedUser, name: e.target.value })}
                    value={editedUser.name} 
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: 'grey',
                      },
                    }}
                  />
                </InputLabel>
              </div>
              {email &&
                <div style={{ margin: '10px' }}>
                  <InputLabel sx={{ color: 'black' }}>{'Email: '}
                    <TextField 
                      size='small' 
                      disabled={!isEditMode}
                      InputProps={{ disableUnderline: !isEditMode }}
                      variant='standard'
                      onChange={e => setEditedUser({ ...editedUser, email: e.target.value })}
                      value={editedUser.email}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: 'grey',
                        },
                      }}
                    />
                  </InputLabel>
                </div>
              }
              <div style={{ margin: '10px' }}>
                {roleDropDown}
              </div>
              {(isAdmin || isSelf) && isEditMode &&
                <div style={{ margin: '10px' }}>
                  <InputLabel sx={{ color: 'black' }}>{'Change Password: '}
                    <TextField 
                      size='small' 
                      disabled={!isEditMode}
                      InputProps={{ disableUnderline: !isEditMode }}
                      variant='standard'
                      type='password'
                      onChange={e => setEditedUser({ ...editedUser, password: e.target.value })}
                      value={editedUser.password ?? ''}
                    />
                  </InputLabel>
                </div>
              }
              {(isAdmin || isSelf) && isEditMode &&
                <div style={{ margin: '10px' }}>
                  <InputLabel sx={{ color: 'black' }}>{'Confirm Change Password:'}
                    <TextField 
                      size='small'
                      disabled={!isEditMode}
                      InputProps={{ disableUnderline: !isEditMode }}
                      variant='standard'
                      type='password'
                      onChange={e => setEditedUser({ ...editedUser, confirmPassword: e.target.value })}
                      value={editedUser.confirmPassword ?? ''}
                    />
                  </InputLabel>
                </div>
              }
            </CardContent>
          </Grid>
        </Grid>
      </Box>
      <Alert alert={error} setAlert={setError} />
    </>
  );
};

ProfileCard.propTypes = {
  currentUser: PropTypes.object.isRequired,
  setCurrentUser: PropTypes.func.isRequired
};

export default ProfileCard;
