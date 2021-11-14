import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Authentication/Login";
import PrivateRoute from "./Route/PrivateRoute";
import ForgotPassword from "./Authentication/ForgotPassword";
import UpdateProfile from "./Profile/UpdateProfile";
import { StudentList } from "./Student/StudentList";
import { ComplaintList } from "./Complaint/ComplaintList";
import { Contact } from "./Complaint/ComplainForm";
import { NavigationHeader } from "../Headers/NavigationHeader";
import { OutpassForm } from "./Outpass/OutpassForm";

import "./App.css";
import { OutpassList } from "./Outpass/OutpassList";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <>
            <NavigationHeader />
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute path="/student-list" component={StudentList} />
            <PrivateRoute path="/complaint-list" component={ComplaintList} />
            <PrivateRoute path="/complaint-form" component={Contact} />
            <PrivateRoute path="/outpass-form" component={OutpassForm} />
            <PrivateRoute path="/outpass-list" component={OutpassList} />
          </>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
