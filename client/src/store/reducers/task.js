import {
  GET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  TASK_ERROR,
  CLEAR_TASK,
  GET_TASK,
  ADD_PRIVILEGED_USER,
} from "../actions/types";

const initialState = {
  tasks: [],
  currentTask: {},
  loading: true,
  error: {},
};

function taskReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case GET_TASK:
      return {
        ...state,
        currentTask: payload,
        loading: false,
      };
    case TASK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_TASK:
    case UPDATE_TASK:
    case ADD_PRIVILEGED_USER:
      return {
        ...state,
        tasks: [payload, ...state.tasks],
        loading: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload),
        loading: false,
      };
    case CLEAR_TASK:
      return {
        ...state,
        currentTask: {},
        loading: false,
      };
    default:
      return state;
  }
}

export default taskReducer;
