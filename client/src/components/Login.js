import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../store/actions/auth";
import PropTypes from "prop-types";
import "../styles/Login.css";

const Login = ({ login, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if Logged in
  if (isAuthenticated && !loading) {
    return <Navigate to='/home' />;
  }

  return (
    <section className='form_container'>
      <div className='top'>
        <h1 className='heading'>Sign In</h1>
        <p className='text'>Sign Into Your Account</p>
      </div>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form_field'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form_field'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' className='form_button' value='Login' />
        <p className='text bottom'>
          Don't have an account?{" "}
          <Link to='/register' className='highlight'>
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Login);
