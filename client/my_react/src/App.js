import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LangingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import VideoUploadPage from './components/views/VideoUploadPage/VideoUploadPage'
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)}/>
          <Route exact path="/login" component={Auth(LoginPage, false)}/>
          <Route exact path="/register" component={Auth(RegisterPage, false)}/>
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;