import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import Friends from './Friends';
import Requests from './Requests';
import Pending from './Pending';

const useStyles = makeStyles(theme => ({
  invitationHeadings: {
    marginBottom: 0
  }
}));

const Contacts = props => {
  const classes = useStyles();
  const [display, setDisplay] = useState('friends');
  const toggleDisplay = (event, setting) => {
    setDisplay(setting);
  }
 const [friends, setFriends] = useState([]);

 const email = localStorage.getItem('email'); 
 const loadFriends = async() => {
   const res = await axios.get(`http://localhost:3001/invitations/user/${email}/contacts`);
   if(res.data.contacts.length !== 0){
    setFriends(res.data.contacts);
   }
   else {
     setFriends(['You dont have any contacts. Send invites to initiate a conversation']);
   }
 }

 useEffect(() => {
   loadFriends()
 }, [friends.length]);

  return (
    <Grid
      container
      direction='column'
    >
      {/*  className={props.classes.tabsContainer} */}
      <Grid item >
        <Tabs 
          value={display} 
          onChange={toggleDisplay} 
          variant='scrollable' 
          scrollButtons='auto' 
          // classes={{
          //   indicator: props.classes.tabsIndicator
          // }}
        >
          <Tab 
            value='friends' 
            label='Friends' 
            disableRipple
            // className={props.classes.tab}
            // classes={{
            //   selected: props.classes.selectedTab
            // }}
          />
          <Tab 
            value='invitations' 
            label='Invitations'
            disableRipple 
            // className={props.classes.tab}
            // classes={{
            //   selected: props.classes.selectedTab
            // }}
          />
        </Tabs>
      </Grid>

      {display === 'friends' && 
        <Friends 
          friends={friends}
          selected={props.selected} 
          requestContact={props.requestContact}
          selectContact={props.selectContact}
        />
      }
      {display === 'invitations' && 
        <Fragment>
        <Requests 
          requests={props.requests} 
          updateContact={props.updateContact}
          classes={classes}
        />
        <Pending pending={props.pending} classes={classes}/>
        </Fragment>
      }
    </Grid>
  );
}

export default Contacts;