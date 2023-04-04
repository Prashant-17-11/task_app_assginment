import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTask, getCurrentTask } from "../store/actions/task";

// profile images
import dog from "../images/dog.png";
import cat from "../images/cat.png";
import elephant from "../images/elephant.png";
import fox from "../images/fox.png";
import panda from "../images/panda.png";

const avatarImages = {
  dog: dog,
  cat: cat,
  elephant: elephant,
  fox: fox,
  panda: panda,
};

const Task = ({
  auth,
  task: { _id = "", user, text, name, avatar },
  deleteTask,
  getCurrentTask,
}) => {
  const navigate = useNavigate();

  return (
    <div className='task'>
      <div className='task_top'>
        <p className='task_description'>{text}</p>
        <div>
          <img src={avatarImages[avatar]} className='avatar' alt='avatar' />
          <p className='user'>{name}</p>
        </div>
      </div>
      <div className='task_bottom'>
        {auth.user._id === user && _id !== undefined ? (
          <button
            onClick={() => {
              getCurrentTask(_id);
              navigate("/updateTask");
            }}
            className='task_button'
          >
            Update Task
          </button>
        ) : (
          ""
        )}
        {auth.user._id === user && _id !== undefined ? (
          <button onClick={() => deleteTask(_id)} className='task_button'>
            Delete Task
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

Task.propTypes = {
  auth: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  getCurrentTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteTask, getCurrentTask })(Task);
