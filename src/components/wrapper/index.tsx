import React from 'react';
import './wrapperStyles.css';

interface props {
  [x: string]: any;
}


const Wrapper: React.FC<props> = ({ children, ...props }) => {
  return (
    <div className={'wrapper-style'} {...props}>
      {children}
    </div>
  );
};

export default Wrapper;
