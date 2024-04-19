import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const StatusAlert = ({ message, setMessage, status }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => clearTimeout(timer);

  }, [message]);

  if (!message) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: '50vw',
        top: '8vh',
        zIndex: '1000',
        transform: 'translate(50%, 50%)'
      }}
      className={`alert ${status}`}>
      {message}
    </div>
  );
};

StatusAlert.propTypes = {
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};

export default StatusAlert;
