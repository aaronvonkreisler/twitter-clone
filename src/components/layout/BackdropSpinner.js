import React from 'react';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
   backdrop: {
      zIndex: 2000,
   },
});

const BackdropSpinner = () => {
   const classes = useStyles();
   return (
      <React.Fragment>
         <Backdrop open={true} className={classes.backdrop}>
            <CircularProgress style={{ color: 'rgb(29, 161, 242, 1)' }} />
         </Backdrop>
      </React.Fragment>
   );
};

export default BackdropSpinner;
