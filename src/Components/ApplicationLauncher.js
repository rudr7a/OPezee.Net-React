import React, { useState } from 'react';
import { launchApplication } from '../Services/apiService';

const ApplicationLauncher = () => {
    const [appName, setAppName] = useState('');
    const [filePath, setFilePath] = useState('');
    const [parameters, setParameters] = useState('');

    const handleLaunch = async () => {
        try {
            await launchApplication(appName, filePath, parameters);
            alert('Application launched successfully!');
        } catch (error) {            
            alert('Failed to launch the application.'); 
        }
    };
    
    return (
        <div>
            <h2>Launch Application</h2>
            <input
                type="text"
                placeholder="Application Name"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
            />
            <input
                type="text"
                placeholder="File Path"
                value={filePath}
                onChange={(e) => setFilePath(e.target.value)}
            />
            <input
                type="text"
                placeholder="Parameters"
                value={parameters}
                onChange={(e) => setParameters(e.target.value)}
            />
            <button onClick={handleLaunch}>Launch</button>
        </div>
    );
};

export default ApplicationLauncher;