import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../apis/Users';
import {
  Button,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import StatusAlert from '../components/StatusAlert';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = () => {
    event.preventDefault();
  };

  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCreateAccount = async () => {
    setError(null);
    createUser({ username, password, email, role, name: fullName })
      .then(() => {
        setSuccess('Account created successfully!');

        // Clear form fields
        setUsername('');
        setPassword('');
        setEmail('');
        setFullName('');
        setRole('');
      })
      .catch((err) => {
        setError(err?.response?.data ?? err.message);
        return;
      });
  };

  return (
    <div
      className='vh-100 secondary'
      style={{
        backgroundImage: 'url(/wollastonsBackgroundBlurred.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(500px)',
      }}
    >
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
            <div
              className='card shadow-2-strong'
              style={{
                borderRadius: '1rem',
                border: '2px solid black',
                boxShadow: '0px 0px 10px 1px black',
              }}
            >
              <div className='card-body p-5 text-center'>
                <h3 className='mb-5'>Create Your Account</h3>

                <TextField
                  id='username-input'
                  label='Username'
                  value={username}
                  sx={{ width: '300px', marginBottom: '10px' }}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <br />

                <FormControl
                  sx={{ mt: 1, width: '300px', marginBottom: '18px' }}
                  variant='outlined'
                >
                  <InputLabel htmlFor='password-input'>Password</InputLabel>
                  <OutlinedInput
                    id='password-input'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                </FormControl>

                <TextField
                  id='name-input'
                  label='Full Name'
                  value={fullName}
                  sx={{ width: '300px', marginBottom: '20px' }}
                  onChange={(e) => setFullName(e.target.value)}
                />

                <br />

                <TextField
                  id='email-input'
                  label='Email Address'
                  value={email}
                  sx={{ width: '300px', marginBottom: '20px' }}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <br />

                <FormControl sx={{ width: '300px' }}>
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

                <div className='form-outline mb-4'></div>

                {error &&
                  <StatusAlert
                    message={error}
                    setMessage={setError}
                    status='alert-danger'
                  />
                }
                {success &&
                  <StatusAlert
                    message={success}
                    setMessage={setSuccess}
                    status='alert-success'
                  />
                }

                <Button
                  size='large'
                  variant='contained'
                  color='success'
                  sx={{ paddingX: '25px', width: '200px' }}
                  disabled={
                    !username || !password || !fullName || !email || !role
                  }
                  onClick={handleCreateAccount}
                >
                  <b>Create Account</b>
                </Button>

                <hr className='my-4' />

                <p>
                  <Link to={'/login'}>Return to login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
