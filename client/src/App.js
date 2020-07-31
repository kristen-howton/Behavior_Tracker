import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import { ActivityProvider } from './providers/ActivityProvider';
import Header from './Header';
import { LearnerProvider } from './providers/LearnerProvider';
import { BehaviorProvider } from './providers/BehaviorProvider';
import { ReportProvider } from './providers/ReportProvider';
import { ConsequenceProvider } from './providers/ConsequenceProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <ActivityProvider>
          <LearnerProvider>
            <BehaviorProvider>
              <ConsequenceProvider>
                <ReportProvider>
                  <Header />
                  <ApplicationViews />
                </ReportProvider>
              </ConsequenceProvider>
            </BehaviorProvider>
          </LearnerProvider>
        </ActivityProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;