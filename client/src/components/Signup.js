import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../store/actions/auth";
import PropTypes from "prop-types";

import "../styles/Login.css";

const Signup = ({ register, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "",
    password2: "",
  });

  const { name, email, avatar, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      register({ name, email, avatar, password });
    }
  };

  if (isAuthenticated && !loading) {
    return <Navigate to='/home' />;
  }

  return (
    <section className='form_container'>
      <div className='top'>
        <h1 className='heading'>Sign Up</h1>
        <p className='text'>Create Your Account</p>
      </div>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form_field'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className='form_field'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className='form_field'>
          <label className='text'>
            Enter One of the following:
            <br />
            dog, cat, elephant, panda, fox
          </label>
          <input
            type='avatar'
            placeholder='Select your avatar'
            name='avatar'
            value={avatar}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className='form_field'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            // minLength='6'
          />
        </div>
        <div className='form_field'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            // minLength='6'
          />
        </div>
        <input type='submit' className='form_button' value='Register' />
        <p className='text bottom'>
          Already have an account?{" "}
          <Link to='/login' className='highlight'>
            Sign In
          </Link>
        </p>
      </form>
    </section>
  );
};

Signup.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { register })(Signup);
