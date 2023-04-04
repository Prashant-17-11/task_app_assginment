import React, { useEffect, useState } from "react";
import { updateTask } from "../store/actions/task";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const UpdateTask = ({ updateTask, currentTask }) => {
  const [formData, setFormData] = useState({
    text: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({ text: !currentTask.text ? "" : currentTask.text });
  }, [currentTask.text]);

  const { text } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateTask(currentTask._id, formData);
    setFormData({ text: "" });
    navigate("/home");
  };

  return (
    <section className='form_container'>
      <div className='top'>
        <h1 className='heading'>Update Task</h1>
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

        <input type='submit' className='form_button' value='Update Task' />
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

UpdateTask.propTypes = {
  updateTask: PropTypes.func.isRequired,
  currentTask: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentTask: state.task.currentTask,
});

export default connect(mapStateToProps, { updateTask })(UpdateTask);
