import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTask, getCurrentTask } from "../store/actions/task";

const Task = ({
  auth,
  task: { _id, user, text, name, avatar, updatePrivilegesTo },
  deleteTask,
  getCurrentTask,
}) => {
  const userHasPrivilege = () => {
    const currentUser = auth.user._id;
    updatePrivilegesTo.map(({ user }) => (user === currentUser ? true : ""));
  };
  const navigate = useNavigate();
  return (
    <div>
      <p>{text}</p>
      <p>{name}</p>
      <p>{avatar}</p>
      {auth.user._id === user ? (
        <button
          onClick={() => {
            getCurrentTask(_id);
            navigate("/updateTask");
          }}
        >
          Update Task
        </button>
      ) : (
        ""
      )}
      <p>
        {auth.user._id === user || userHasPrivilege() ? (
          <button onClick={() => deleteTask(_id)}>Delete Task</button>
        ) : (
          ""
        )}
      </p>
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
