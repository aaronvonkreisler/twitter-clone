import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, withStyles } from '@material-ui/core';

const TabPanel = (props) => {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`profile-tabpanel-${index}`}
         aria-labelledby={`profile-tab-${index}`}
         {...other}
      >
         {value === index && <React.Fragment>{children}</React.Fragment>}
      </div>
   );
};

const a11yProps = (index) => {
   return {
      id: `profile-tab-${index}`,
      'aria-controls': `profile-tabpanel-${index}`,
   };
};

const TweeterTabs = withStyles({
   indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > span': {
         width: '100%',
         backgroundColor: 'rgb(29, 161, 242, 1)',
      },
      root: {
         borderBottom: '1px solid rgb(56, 68, 78)',
      },
   },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles({
   root: {
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '14px',
      backgroundColor: 'rgb(22, 32, 42)',
      color: 'rgb(136, 153, 166)',
      fontFamily: [
         '-apple-system',
         'BlinkMacSystemFont',
         'Segoe UI',
         'Roboto',
         'Helvetica',
         'Arial',
         'sans-serif',
      ].join(','),
      '&:hover': {
         color: 'rgb(29, 161, 242, 1)',
         backgroundColor: 'rgb(29, 161, 242, 0.1);',
      },
   },
   selected: {
      color: 'rgb(29, 161, 242, 1)',
   },
})((props) => <Tab disableRipple {...props} />);

const ProfileTabs = ({ tweets, replies, likes }) => {
   const [value, setValue] = useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
      <div>
         <AppBar
            position="static"
            style={{ backgroundColor: 'rgb(22, 32, 42)' }}
            elevation={0}
         >
            <TweeterTabs
               value={value}
               onChange={handleChange}
               variant="fullWidth"
               aria-label="Profile tabs"
            >
               <StyledTab label="Tweets" {...a11yProps(0)} />
               <StyledTab label="Tweets & replies" {...a11yProps(1)} />
               <StyledTab label="Likes" {...a11yProps(2)} />
            </TweeterTabs>
         </AppBar>
         <TabPanel value={value} index={0}>
            {tweets}
         </TabPanel>
         <TabPanel value={value} index={1}>
            {replies}
         </TabPanel>
         <TabPanel value={value} index={2}>
            {likes}
         </TabPanel>
      </div>
   );
};

ProfileTabs.propTypes = {};

export default ProfileTabs;