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
    marginBottom: theme.spacing(0)
  }
}));

const Contacts = props => {
  const classes = useStyles();
  const [display, setDisplay] = useState('friends');
  const toggleDisplay = (event, setting) => {
    setDisplay(setting);
  }
 const [friends, setFriends] = useState([]);
 const [pendingInvites, setPendingInvites] = useState([]);
 const [pendingRequests, setPendingRequests] = useState([]);

 const email = localStorage.getItem('email'); 
 const loadFriends = async() => {
   const res = await axios.get(`http://localhost:3001/invitations/user/${email}/contacts`);
   if(res.data.contacts.length !== 0){
    setFriends([...res.data.contacts]);
   }
   else {
     setFriends(['You dont have any contacts. Send invites to initiate a conversation']);
   }
 }

 const loadPendingInvites = async() => {
  const res = await axios.get(`http://localhost:3001/invitations/user/${email}`);
  if(res.data.invitations.length !== 0){
   setPendingInvites([...res.data.invitations]);
  }
  else {
    setPendingInvites(['No pending invitations']);
  }
}

const loadPendingRequests = async() => {
  const res = await axios.get(`http://localhost:3001/invitations/user/requests/${email}`);
  if(res.data.invitations.length !== 0){
   setPendingRequests([...res.data.invitations]);
  }
  else {
    setPendingRequests(['No pending invitation requests']);
  }
}

 useEffect(() => {
   loadFriends()
 }, [friends.length]);

 useEffect(() => {
   loadPendingInvites();
 }, [pendingInvites.length]);

 useEffect(() => {
  loadPendingRequests();
}, [pendingRequests.length]);

  
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
          requests={pendingRequests} 
          updateContact={props.updateContact}
          classes={classes}
        />
        <Pending pending={pendingInvites} classes={classes}/>
        </Fragment>
      }
    </Grid>
  );
}

export default Contacts;