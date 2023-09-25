import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './Home';
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import QuestionOne from './QuestionOne';
import QuestionTwo from './QuestionTwo';
import QuestionThree from './QuestionThree';
import Emotion from './Emotion';
import UserID from './UserID';
import Spotify from './Spotify';
import SpotifyUser from './SpotifyUser';
import Test from './Test';
import ExploreSpotify from './ExploreSpotify';
import End from './End';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },

  {
    path: "/home",
    element:<Home/>
  },

  {
    path: "/questionone",
    element:<QuestionOne/>
  },
  {
    path: "/questiontwo",
    element:<QuestionTwo/>
  },
  {
    path: "/questionthree",
    element:<QuestionThree/>
  },
  {
    path: "/emotion",
    element:<Emotion/>
  },
  {
    path: "/userid",
    element:<UserID/>
  },
  {
    path: "/spotify",
    element:<Spotify/>
  },
  {
    path: "/spotifyuser",
    element:<SpotifyUser/>
  },
  {
    path: "/test",
    element:<Test/>
  },
  {
    path: "/explorespotify",
    element:<ExploreSpotify/>
  },
  {
    path: "/end",
    element:<End/>
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router = {router} />
  // <React.StrictMode>
  //   <QuestionThree/>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
