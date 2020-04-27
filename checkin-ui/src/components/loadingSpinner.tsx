import spinner from '../images/spinner.gif'
import React from 'react';

export const LoadingSpinner = () => {
  return (
    <img  src={spinner} style={{width: '100px', height: '100px'}}/>
  );
};
