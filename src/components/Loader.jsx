import React from 'react'
import imageSrc from '../assets/logo.jpeg';

const Loader = ({ size = '50' }) => {
    
    const loaderStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
    };

    const imageStyle = {
        width: '100px', 
        height: '100px', 
        borderRadius: '50%', 
        objectFit: 'cover', 
        animation: 'spin 2s linear infinite',
        border: '2px solid white',
    };

    return (
        <div style={loaderStyle}>
            <img 
                src={imageSrc} 
                alt="Loading..." 
                style={imageStyle} 
            />
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    )
}

export default Loader
