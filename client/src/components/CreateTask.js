import React, { useState } from "react";
import { addTask } from "../store/actions/task";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

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
    <section className='container'>
      <h1 className='large text-primary'>Create Task</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Add your tasks
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Add Task Description'
            name='text'
            value={text}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Create Task' />
      </form>
      <p className='my-1'>Get Organized and Accomplish More with Task Board!</p>
      <Link to='/home'>Return</Link>
    </section>
  );
};

CreateTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default connect(null, { addTask })(CreateTask);
