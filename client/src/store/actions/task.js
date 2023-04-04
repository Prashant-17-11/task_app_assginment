import api from "../../utility/api";
import {
  GET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  TASK_ERROR,
  GET_TASK,
  CLEAR_TASK,
  ADD_PRIVILEGED_USER,
  CLEAR_ALL,
} from "./types";

// Get all tasks
export const getTasks = () => async (dispatch) => {
  try {
    const res = await api.get("/task");
    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get current task
export const getCurrentTask = (taskId) => async (dispatch) => {
  try {
    const res = await api.get(`/task/${taskId}`);
    dispatch({
      type: GET_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Create a task
export const addTask =
  ({ text }) =>
  async (dispatch) => {
    const body = JSON.stringify({ text });
    try {
      const res = await api.post("/task", body);
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TASK_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

// Update a task
export const updateTask = (taskId, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/task/${taskId}`, formData);
    dispatch({
      type: UPDATE_TASK,
      payload: res.data,
    });
    dispatch({ type: CLEAR_TASK });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add users who are allowed update access to a task
export const addPrivilegedUser = (taskId, userId) => async (dispatch) => {
  try {
    const res = await api.put(`/task/updatePrivilegesTo/${taskId}/${userId}`);
    dispatch({
      type: ADD_PRIVILEGED_USER,
      payload: res.data,
    });
    dispatch({
      type: CLEAR_ALL,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete a task
export const deleteTask = (taskId) => async (dispatch) => {
  try {
    const res = await api.delete(`/task/${taskId}`);
    dispatch({
      type: DELETE_TASK,
      payload: taskId,
    });
    getTasks();
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
