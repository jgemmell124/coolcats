import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  return (
    <div className='container'>
      <footer className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>
        <div className='col-md-4 d-flex align-items-center'>
          <img src='../images/wollastons-logo.png' />
          <a
            href='/'
            className='mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1'
          ></a>
          <span className='mb-3 mb-md-0 text-muted'>
            &copy; 2024 WebDev Project
          </span>
        </div>

        <ul className='nav col-md-4 justify-content-end list-unstyled d-flex'>
          <li className='ms-3'>
            <a className='text-muted' href='#'>
              <FacebookIcon />
            </a>
          </li>
          <li className='ms-3'>
            <a className='text-muted' href='#'>
              <InstagramIcon />
            </a>
          </li>
          <li className='ms-3'>
            <a className='text-muted' href='#'>
              <svg className='bi' width='24' height='24'>
                <XIcon />
              </svg>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
export default Footer;
