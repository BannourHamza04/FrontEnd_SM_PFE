import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';
import Auth from '../Services/Auth';

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0; 
`;

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await Auth.isAuthenticated();
            setIsAuthenticated(authStatus);
        };
        checkAuth();
    }, [isAuthenticated]);
    
    if (isAuthenticated === null) {
        return (
            <LoadingContainer>
                <ClipLoader size={150} color={"#123abc"} loading={true} />
            </LoadingContainer>
        );
    }
    return isAuthenticated ? children :  <Navigate to="/login" /> ;
};

export default ProtectedRoute;