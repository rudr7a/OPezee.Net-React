import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApplications, launchApplication } from '../Services/apiService';
import { Grid, IconButton, Typography, CircularProgress, Backdrop } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import WebIcon from '@mui/icons-material/Web';
import CodeIcon from '@mui/icons-material/Code';
import SettingsIcon from '@mui/icons-material/Settings';

const iconMapping = {
    "chrome": <WebIcon style={{ fontSize: 50 }} />,
    "vscode": <CodeIcon style={{ fontSize: 50 }} />,
    "default": <ComputerIcon style={{ fontSize: 50 }} />
};

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const apps = await getApplications();
                setApplications(apps);
            } catch (error) {
                
            }
        };
        fetchApplications();
    }, []);

    const handleLaunch = async (app) => {
        setLoading(true);
        try {
            await launchApplication(app.name, app.filePath, app.parameters);
            alert(`${app.name} launched successfully!`);
        } catch (error) {
           
            alert(`Failed to launch ${app.name}.`);
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (appName) => {
        return iconMapping[appName.toLowerCase()] || iconMapping["default"];
    };

    const handleSettingsClick = () => {
        navigate('/settings');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Available Applications</h2>
            <Grid container spacing={3} justifyContent="center">
                {applications.length === 0 && (
                    <Typography variant="h6" style={{ marginTop: '20px' }}>
                        Please add your applications from the settings.
                    </Typography>
                )}
                {applications.map((app) => (
                    <Grid item xs={4} sm={3} md={2} key={app.id} style={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton
                            onClick={() => handleLaunch(app)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            {getIcon(app.name)}
                            <Typography variant="body2" align="center">{app.name}</Typography>
                        </IconButton>
                    </Grid>
                ))}
            </Grid>

            <IconButton
                style={{
                    position: 'fixed',
                    bottom: 20,
                    left: 20,
                }}
                onClick={handleSettingsClick}
            >
                <SettingsIcon style={{ fontSize: 40 }} />
            </IconButton>

            <Backdrop open={loading} style={{ zIndex: 1000, color: '#fff' }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default ApplicationList;
