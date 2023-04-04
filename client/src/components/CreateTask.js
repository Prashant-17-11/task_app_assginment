import React, { useState } from "react";
import { addTask } from "../store/actions/task";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const CreateTask = ({ addTask }) => {
  const [formData, setFormData] = useState({
    text: "",
  });
  const { text } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    addTask(formData);
    setFormData({ text: "" });
    navigate("/home");
  };

  return (
    <section className='form_container'>
      <div className='top'>
        <h1 className='heading'>Create Task</h1>
        <p className='text'>Add your tasks</p>
      </div>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form_field'>
          <input
            type='text'
            placeholder='Add Task Description'
            name='text'
            value={text}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type='submit' className='form_button' value='Create Task' />
        <p className='text bottom'>
          Get Organized and Accomplish More with Task Board!
        </p>
      </form>
      <Link to='/home' className='return_button'>
        Return
      </Link>
    </section>
  );
};

CreateTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default connect(null, { addTask })(CreateTask);
