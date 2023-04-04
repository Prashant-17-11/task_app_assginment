import React, { useEffect, useState } from "react";
import { updateTask } from "../store/actions/task";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

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
    updateTask(currentTask._id, formData);
    setFormData({ text: "" });
    navigate("/home");
  };

  return (
    <section className='container'>
      <h1 className='large text-primary'>Update Task</h1>
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

        <input type='submit' className='btn btn-primary' value='Update Task' />
      </form>
      <p className='my-1'>Get Organized and Accomplish More with Task Board!</p>
      <Link to='/home'>Return</Link>
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
