import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTasks } from "../store/actions/task";
import Task from "./Task";
import "../styles/Homepage.css";

const Homepage = ({ getTasks, tasks }) => {
  useEffect(() => {
    getTasks();
  }, [getTasks]);
  return (
    <section className='home_container'>
      <p className='slogan'>
        Welcome to Task Board - where teamwork and productivity meet!
      </p>
      <div className='tasks'>
        {tasks !== null
          ? tasks.map((task) => <Task key={task._id} task={task} />)
          : ""}
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
