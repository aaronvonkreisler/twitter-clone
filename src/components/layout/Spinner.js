import React from 'react';
import { CircularProgress } from '@material-ui/core';
import '../../styles/design/utils.css';

const Spinner = () => {
   return (
      <div className="w-100 mt-15">
         <div className="flex flex-row justify-center ">
            <CircularProgress
               size={25}
               thickness={3.0}
               style={{ color: 'rgb(29, 161, 242, 1)' }}
            />
         </div>
      </div>
   );
};

export default Spinner;
