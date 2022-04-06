import React from 'react';
import './paperStyles.css';


interface props {
  [x: string]: any;
}

const Paper: React.FC<props> = ({ children }) => {
  return (
    <div className={'paper'}>
      {children}
    </div>
  );
};

export default Paper;
