import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../store/actions/auth";

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link onClick={logout} to='/login'>
          Sign Out
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/login'>Sign In</Link>
      </li>
      <li>
        <Link to='/register'>Sign Up</Link>
      </li>
    </ul>
  );
  return (
    <>
      <div className='navbar'>
        <div className='navbar_title'>
          <Link to={isAuthenticated ? "/home" : "/"}>Task Board</Link>
        </div>
        <div className='navbar_options'>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
