import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {

   
    return (

        <ThreeCircles
            height={100}
            width={100}
            color="#1D4ED8"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            
        />
    );
};

export default Loader;
