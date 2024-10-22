import React from 'react'

const Loader = ({size='50'}) => {
    return (
        <l-infinity
            size={size}
            stroke="4"
            stroke-length="0.15"
            bg-opacity="0.1"
            speed="1.3"
            color="white"
        />
    )
}

export default Loader