import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import { ActivityProvider } from './providers/ActivityProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <ActivityProvider>
          <ApplicationViews />
        </ActivityProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;