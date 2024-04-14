import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Alert = ({ alert, setAlert }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(null);
    }, 3000);

    return () => clearTimeout(timer);

  }, [alert]);

  if (!alert) {
    return null;
  }

  return (
    <div 
      style={{ 
        position: 'fixed', 
        right: '50vw', 
        top: '.5vh',
        zIndex: '1000', 
        transform: 'translate(50%, 50%)'
      }}
      className='alert alert-danger'>
      {alert}
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.string,
  setAlert: PropTypes.func.isRequired,
};

export default Alert;
