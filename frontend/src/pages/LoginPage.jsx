import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../auth/authSlice';
import { login } from '../apis/Auth';
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = () => {
    event.preventDefault();
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setError(null);
      const user = await login(username, password);
      dispatch(loginUser(user));
      navigate('/', { replace: true });
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
                <h3 className='mb-5'>Sign in</h3>

                <TextField
                  id='outlined-required'
                  label='Username'
                  sx={{ width: '300px' }}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <br />

                <FormControl sx={{ mt: 1.5, width: '300px' }} variant='outlined'>
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

                <div className='form-outline mb-4'></div>

                {error && <div className='alert alert-danger'>{error}</div>}

                <Button
                  size='large'
                  variant='contained'
                  color='error'
                  sx={{ paddingX: '25px', width: '200px' }}
                  disabled={!username || !password}
                  onClick={handleLogin}
                >
                  <b>Login</b>
                </Button>

                {/* <button
                  className='btn btn-primary btn-lg btn-block'
                  type='submit'
                  onClick={handleLogin}
                  disabled={!username || !password}
                >
                  Login
                </button> */}

                <hr className='my-4' />

                <p>
                  {'Need an account?'}{' '}
                  <Link to={'/signup'}>Create one here</Link>
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
