import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Snackbar, Slide } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { FaTwitter } from 'react-icons/fa';

const AlertDisplay = ({ alerts }) => {
   const [open] = useState(true);
   const [transition] = useState(Slide);

   return (
      alerts !== null &&
      alerts.length > 0 &&
      alerts.map((alert) => (
         <React.Fragment key={alert.id}>
            <Snackbar
               open={open}
               TransitionComponent={transition}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
               <MuiAlert
                  elevation={6}
                  variant="filled"
                  severity={alert.severity}
                  icon={<FaTwitter />}
               >
                  {alert.msg}
               </MuiAlert>
            </Snackbar>
         </React.Fragment>
      ))
   );
};

AlertDisplay.propTypes = {
   alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
   alerts: state.alerts,
});

export default connect(mapStateToProps)(AlertDisplay);
