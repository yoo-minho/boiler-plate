import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LangingPage'
import ReadmePage from './components/views/ReadmePage/ReadmePage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import VideoUploadPage from './components/views/VideoUploadPage/VideoUploadPage'
import VideoDetailPage from './components/views/VideoDetailPage/VideoDetailPage'
import SubscriptionPage from './components/views/SubscriptionPage/SubscriptionPage'

import MoviePage from './components/views/MoviePage/MoviePage'
import MovieDetail from './components/views/MovieDetail/MovieDetail'

import Auth from './hoc/auth'
import FavoritePage from './components/views/FavoritePage/FavoritePage';

import ChatPage from './components/views/ChatPage/ChatPage';
import TodoPage from './components/views/TodoPage/TodoPage';

function App() {
  return (
    <Router>
      <div>

        <Switch>

          <Route exact path="/" component={Auth(LandingPage, null)}/>

          <Route exact path="/readme" component={Auth(ReadmePage, null)}/>

          <Route exact path="/login" component={Auth(LoginPage, false)}/>
          <Route exact path="/register" component={Auth(RegisterPage, false)}/>
          
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)}/>
          <Route exact path="/video/post/:videoId" component={Auth(VideoDetailPage, null)}/>
          <Route exact path="/subscription" component={Auth(SubscriptionPage, null)}/>

          <Route exact path="/movie" component={Auth(MoviePage, null)}/>        
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)}/>
          <Route exact path="/favorite" component={Auth(FavoritePage, null)}/>

          <Route exact path="/chat" component={Auth(ChatPage, true)}/>
          <Route exact path="/todo" component={Auth(TodoPage, null)}/>

        </Switch>
      </div>
    </Router>
  );
}

export default App;