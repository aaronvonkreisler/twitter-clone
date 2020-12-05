import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import Sidebar from '../sidebar/Sidebar';

const useStyles = makeStyles((theme) => ({
   root: {
      height: '100vh',
      backgroundColor: 'rgb(21, 32, 42)',
      color: '#fff',
   },
   feed: {
      borderRight: '1px solid rgb(56,68,77)',
      borderLeft: '1px solid rgb(56,68,77)',
   },
   sidebar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
   },
}));

const Main = ({ children }) => {
   const classes = useStyles();
   return (
      <Grid container className={classes.root}>
         <Grid item xs={false} sm={2} md={2} lg={2} xl={4}>
            <Sidebar />
         </Grid>
         <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={6}
            xl={4}
            className={classes.feed}
         >
            {children}
         </Grid>
         <Grid item xs={false} sm={2} md={4} lg={4} xl={4}></Grid>
      </Grid>
   );
};

Main.propTypes = {};

export default Main;