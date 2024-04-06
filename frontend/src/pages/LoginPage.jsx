import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login } from '../apis/Users';


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError(null);
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data ?? err.message);
    }
  };


  return (
    <div className='vh-100 secondary' style={{ backgroundColor: '#696969' }}>
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
            <div className='card shadow-2-strong' style={{ borderRadius: '1rem' }}>
              <div className='card-body p-5 text-center'>

                <h3 className='mb-5'>Sign in</h3>

                <div className='form-outline mb-4'>
                  <input 
                    type='text'
                    className='form-control form-control-lg' 
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label className='form-label'>Username</label>
                </div>

                <div className='form-outline mb-4'>
                  <div className='input-group'>
                    <input
                      type={`${showPassword ? 'text' : 'password'}`} 
                      className='form-control form-control-lg'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='input-group-append'>
                      <button 
                        className='btn btn-lg btn-outline-primary'
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          borderTopLeftRadius: '0px',
                          borderBottomLeftRadius: '0px',
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <label className='form-label'>Password</label>
                </div>

                {error && <div className='alert alert-danger'>{error}</div> }

                <button
                  className='btn btn-primary btn-lg btn-block'
                  type='submit'
                  onClick={handleLogin}
                  disabled={!username || !password}
                >
                  Login
                </button>

                <hr className='my-4'/>

                <p>{'Don\'t have an account?'} <a >Sign Up Here</a></p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LoginPage;
