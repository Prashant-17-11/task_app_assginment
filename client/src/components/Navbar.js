import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../store/actions/auth";
import "../styles/Navbar.css";

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul>
      <Link to='/createTask'>
        <li>Create Task</li>
      </Link>
      <Link onClick={logout} to='/login'>
        <li>Sign Out</li>
      </Link>
    </ul>
  );
  const guestLinks = (
    <ul>
      <Link to='/login'>
        <li>Sign In</li>
      </Link>
      <Link to='/register'>
        <li>Sign Up</li>
      </Link>
    </ul>
  );
  return (
    <>
      <div className='navbar'>
        <div className='navbar_title'>
          <Link to={isAuthenticated ? "/home" : "/"}>
            <h1>Task Board</h1>
          </Link>
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
