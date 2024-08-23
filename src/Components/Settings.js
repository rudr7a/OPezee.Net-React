import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApplications, addApplication, deleteApplication } from '../Services/apiService';
import { Button, List, ListItem, ListItemText, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';

const Settings = () => {
    const [applications, setApplications] = useState([]);
    const [appName, setAppName] = useState('');
    const [filePath, setFilePath] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            const apps = await getApplications();
            setApplications(apps);
        };
        fetchApplications();
    }, []);

    const handleFileSelection = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFilePath(selectedFile.path); // Store the file path
            setAppName(selectedFile.name.replace('.exe', '')); // Set the application name based on the file name
        }
    };

    const handleAdd = async () => {
        if (!appName || !filePath) {
            alert('Please provide both application name and file path.');
            return;
        }

        try {
            await addApplication(appName, filePath, '');
            const apps = await getApplications();
            setApplications(apps);
            setAppName('');
            setFilePath('');
        } catch (error) {
            console.error('Error adding application:', error);
            alert('Failed to add application. Please try again.');
        }
    };

    const handleDelete = async (appId) => {
        try {
            await deleteApplication(appId);
            const apps = await getApplications();
            setApplications(apps);
        } catch (error) {
            console.error('Error deleting application:', error);
            alert('Failed to delete application. Please try again.');
        }
    };

    const handleHome = () => {
        navigate('/');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Settings</h2>

            <div style={{ marginBottom: '20px' }}>
                <TextField
                    label="Application Name"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    fullWidth
                    style={{ marginBottom: '20px' }}
                />
                <TextField
                    label="File Path"
                    value={filePath}
                    onChange={(e) => setFilePath(e.target.value)}
                    fullWidth
                />
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <input
                    type="file"
                    onChange={handleFileSelection}
                    style={{ display: 'none' }}
                    id="file-upload"
                    accept=".exe"
                />
                <label htmlFor="file-upload">
                    <Button variant="contained" component="span" style={{ marginRight: '10px' }}>
                        Select Application
                    </Button>
                </label>
                <Button variant="contained" color="primary" onClick={handleAdd}>
                    Add Application
                </Button>
            </div>

            <List style={{ marginTop: '20px' }}>
                {applications.map((app) => (
                    <ListItem key={app.id} button>
                        <ListItemText primary={app.name} secondary={app.filePath} />
                        <IconButton onClick={() => handleDelete(app.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>

            <IconButton
                style={{
                    position: 'fixed',
                    bottom: 20,
                    left: 20,
                    width: 50,
                    height: 50,
                }}
                onClick={handleHome}
            >
                <HomeIcon style={{ fontSize: 40 }} />
            </IconButton>
        </div>
    );
};

export default Settings;
