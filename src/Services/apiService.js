import axios from 'axios';

const API_BASE_URL = 'https://localhost:7145/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, 
});

export const getApplications = async () => {
    try {
        const response = await axiosInstance.get('/ApplicationLauncher/applications');
        return response.data;
    } catch (error) {        
        throw error;
    }
};

export const addApplication = async (appName, filePath, parameters) => {
    try {
        const response = await axiosInstance.post('/ApplicationLauncher/applications', {
            name: appName,
            filePath: filePath,
            parameters: parameters || '',
        });

        return response.data;
    } catch (error) {
       
        throw error;
    }
};

export const launchApplication = async (name, filePath, parameters) => {
    try {
        
        const response = await axiosInstance.post('/ApplicationLauncher/launch', {
            name: name,
            filePath: filePath.replace(/['"]+/g, ''), 
            parameters: parameters,
        });
        return response.data;
    } catch (error) {
        
        if (error.response) {
            
        }
        throw error;
    }
};

export const deleteApplication = async (appId) => {
    try {
        const response = await axiosInstance.delete(`/ApplicationLauncher/applications/${appId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
