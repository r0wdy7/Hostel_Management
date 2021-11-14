import React from "react"
import { AuthProvider } from "../../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "../Dashboard/Dashboard"
import Login from "./Authentication"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "../Authentication/ForgotPassword"
import UpdateProfile from "../Profile/UpdateProfile"
import { StudentList } from "../Student/StudentList"
import { ComplaintList } from "../Complaint/ComplaintList"
import { Contact } from "../Complaint/ComplainForm"
import { OutpassForm } from "../Outpass/OutpassForm"
import { OutpassList } from "../Outpass/OutpassList"

const Routes = () => (
  <main>
     {/* <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login}>
          { sessionStorage.getItem('state') ? <Redirect to="/" /> : undefined }
          </Route>
        <Route path="/profile" component={Profile}>
        { !sessionStorage.getItem('state') ? <Redirect to="/login" /> : undefined }
        </Route>
        <Route component={Error} />
      </Switch> */}
      <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute path="/student-list" component={StudentList} />
              <PrivateRoute path="/complaint-list" component={ComplaintList} />
              <PrivateRoute path="/complaint-form" component={Contact} />
              <PrivateRoute path="/outpass-form" component={OutpassForm} />
              <PrivateRoute path="/outpass-list" component={OutpassList} />
            </Switch>
          </AuthProvider>
        </Router>
  </main>
)

export default Routes;