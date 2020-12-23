import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

const BackdropSpinner = () => {
   return (
      <React.Fragment>
         <Backdrop open={true}>
            <CircularProgress style={{ color: 'rgb(29, 161, 242, 1)' }} />
         </Backdrop>
      </React.Fragment>
   );
};

export default BackdropSpinner;
