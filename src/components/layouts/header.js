import React, { useState, useContext } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse
} from 'mdb-react-ui-kit';
import SignIn from '../auth/SignIn';
import { Link } from 'react-router-dom';
import Auth from '../auth/auth';
import Role from '../auth/role';
import { AuthContext } from '../../context/authContext';

export default function App() {
  const [showBasic, setShowBasic] = useState(false);
  const context = useContext(AuthContext)

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'><img src="logo.png" alt="houceBounce" style={{width:200}} /></MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>

              <div className="center">

            <MDBNavbarItem className="space">
              <Link to="/" className="textNone">
              Home
              </Link>
            </MDBNavbarItem>
            <Role condition={!context.loggedIn}>
            <MDBNavbarItem className="space">
            <Link to="/signup" className="textNone">
              SignUp
              </Link>
            </MDBNavbarItem>
            </Role>
            <Auth cond={context.user.role == 'admin'}>
            <MDBNavbarItem className="space">
            <Link to="/chart" className="textNone">
              Chart
              </Link>
            </MDBNavbarItem>
            </Auth>
            <Auth cond={context.user.role == 'houseOwner'}>
            <MDBNavbarItem className="space">
            <Link to="/create" className="textNone">
              Create Request
              </Link>
            </MDBNavbarItem>
            </Auth>
              </div>


          </MDBNavbarNav>

          <SignIn/>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}