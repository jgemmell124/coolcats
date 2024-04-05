import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

const Navigation = ({ children }) => {

  return (
    <div style={{ overflow: 'hidden', height: '100vh' }}>
      <NavBar />
      <div 
        style={{ overflow: 'scroll' }}
        className='container-fluid h-100'>
        {/* <div className='row h-100'> */}
        {/*   <div className='col-2' id='green' style={{ maxWidth: '150px' }}> */}
        {/*     <SideBar /> */}
        {/*   </div> */}
        {/*   <div className='col' style={{ textAlign: 'justify', backgroundColor: 'grey' }}> */}
        {/*     {children} */}
        {/*   </div> */}
        {/* </div> */}
        {children}
      </div>
    </div>
  );
};

Navigation.propTypes = {
  children: PropTypes.node,
};


export default Navigation;
