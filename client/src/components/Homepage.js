import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTasks } from "../store/actions/task";
import Task from "./Task";
import { Link } from "react-router-dom";

const Homepage = ({ getTasks, tasks }) => {
  useEffect(() => {
    getTasks();
  }, [getTasks]);
  return (
    <section className='container'>
      <p>Welcome to Task Board - where teamwork and productivity meet!</p>
      <Link to='/createTask'>Create Task</Link>
      <div className='tasks'>
        {tasks ? tasks.map((task) => <Task key={task._id} task={task} />) : ""}
      </div>
    </section>
  );
};

Homepage.propTypes = {
  getTasks: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
});

export default connect(mapStateToProps, { getTasks })(Homepage);
