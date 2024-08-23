import React from 'react';
import { Button } from '@mui/material';
import { quitApplication } from './services/apiService'; // Assume you have a quit endpoint

const HomeButton = () => {
    const handleHome = async () => {
        try {
            await quitApplication();
            // Logic to return to the home screen
        } catch (error) {
            console.error('Error quitting application:', error);
        }
    };

    return (
        <Button variant="contained" color="primary" onClick={handleHome}>
            Home
        </Button>
    );
};

export default HomeButton;
