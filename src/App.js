import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationList from './Components/ApplicationList';
import Settings from './Components/Settings';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ApplicationList />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Router>
    );
}

export default App;
