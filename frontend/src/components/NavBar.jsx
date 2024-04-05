import React from 'react';
import { Button } from 'react-bootstrap';

const NavBar = () => {

  /* return ( */
  /*   <nav className='navbar navbar-expand-md navbar-light bg-primary'> */
  /*     <a className='navbar-brand' href='#'>Navbar</a> */
  /*     <button className='navbar-toggler' type='button' */
  /*       data-toggle='collapse' data-target='#navbarNavAltMarkup' */
  /*       aria-controls='navbarNavAltMarkup' aria-expanded='false' */
  /*       aria-label='Toggle navigation'> */
  /*       <span className='navbar-toggler-icon'> */
  /*       </span> */
  /*     </button> */
  /*     <form className='form-inline'> */
  /*       <input className='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search'/> */
  /*       <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>Search</button> */
  /*     </form> */
  /*     <div className='collapse navbar-collapse' id='navbarNavAltMarkup'> */
  /*       <div className='navbar-nav'> */
  /*         <a className='nav-item nav-link active' href='#'> */
  /*           Home */
  /*         </a> */
  /*         <a className='nav-item nav-link' href='#'>Features</a> */
  /*         <a className='nav-item nav-link' href='#'>Price</a> */
  /*         <a className='nav-item nav-link' href='#'>About</a> */
  /*       </div> */
  /*     </div> */
  /*   </nav> */
  /* ); */

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark justify-contnent-between'>
      <a className='navbar-brand' href='#'>Navbar</a>
      <Button className='navbar-toggler collapsed' type='button' data-toggle='collapse' data-target='#navbarColor01' aria-controls='navbarColor01' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </Button>
      <div className='navbar-collapse collapse justify-content-between' id='navbarColor01' >
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item active'>
            <a className='nav-link' href='#'>Home <span className='sr-only'>(current)</span></a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>Features</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>Pricing</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>About</a>
          </li>
        </ul>
        <form className='form-inline' style={{ marginRight: '15px' }}>
          <div className='input-group'>
            <input className='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search'/>
            <button className='btn btn-outline-info my-2 my-sm-0' type='submit'>Search</button>
          </div>
        </form>
      </div>
    </nav>
  );

};

export default NavBar;
