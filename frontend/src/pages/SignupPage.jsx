import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../apis/Users';
import {
  Button,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = () => {
    event.preventDefault();
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCreateAccount = async () => {
    // Confirm the inputted passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setError(null);
      createUser({ username, password });
      setSuccess('Account created successfully!');
    } catch (err) {
      setError(err?.response?.data ?? err.message);
    }
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
                  id='outlined-required'
                  label='Username'
                  sx={{ width: '300px' }}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <br />

                <FormControl sx={{ m: 1, width: '300px' }} variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    type={showPassword ? 'text' : 'password'}
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

                <FormControl sx={{ width: '300px' }} variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    type={showConfirmPassword ? 'text' : 'password'}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Confirm Password'
                  />
                </FormControl>

                <div className='form-outline mb-4'></div>

                {error && <div className='alert alert-danger'>{error}</div>}
                {success && (
                  <div className='alert alert-success'>{success}</div>
                )}

                <Button
                  size='large'
                  variant='contained'
                  color='success'
                  sx={{ paddingX: '25px', width: '200px' }}
                  disabled={!username || !password || !confirmPassword}
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
