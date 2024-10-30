import React from 'react'

const Loader = () => {
    
    const loaderStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
    };

    const ballStyle = {
        width: '15px', 
        height: '15px', 
        borderRadius: '50%', 
        backgroundColor: '#D71E3D', 
        margin: '0 10px', 
        animation: 'Loading-animation 0.6s infinite alternate',
    };

    return (
        <div style={loaderStyle}>
            {[...Array(6)].map((_, index) => (
                <div
                    key={index}
                    style={{
                        ...ballStyle,
                        animationDelay: `${index * 0.1}s`, 
                    }}
                ></div>
            ))}
            <style>
                {`
                    @keyframes Loading-animation {
                        0% { transform: translateY(0) scale(1); }
                        50% { transform: translateY(-20px) scale(1.2); }
                        100% { transform: translateY(0) scale(1); }
                    }
                `}
            </style>
        </div>
    )
}

export default Loader
