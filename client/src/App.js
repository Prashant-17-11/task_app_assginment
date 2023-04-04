import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Homepage from "./components/Homepage";
import PrivateRoute from "./utility/PrivateRoute";
import UpdateTask from "./components/UpdateTask";
import CreateTask from "./components/CreateTask";

// Redux store
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./store/actions/auth";
import setAuthToken from "./utility/setAuthToken";
import { LOGOUT } from "./store/actions/types";

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route exact path='/home' element={<Homepage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route exact path='/createTask' element={<CreateTask />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route exact path='/updateTask' element={<UpdateTask />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
