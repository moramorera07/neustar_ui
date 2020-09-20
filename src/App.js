import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import ScreenRoutes from './routes/ScreenRoutes'

function App() {
  return (
    <div className="App">
      <Router>
        <ScreenRoutes/>
      </Router>
    </div>
  );
}

export default App;
