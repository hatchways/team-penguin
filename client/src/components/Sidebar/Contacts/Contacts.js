import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import Friends from './Friends';
import Requests from './Requests';
import Pending from './Pending';

const Contacts = props => {
  const [display, setDisplay] = React.useState('friends');
  const toggleDisplay = (event, setting) => {
    setDisplay(setting);
  }
 const [friends, setFriends] = React.useState([]);

 const loadFriends = async() => {
   const res = await axios.get(`http://localhost:3001/invitations/user/rjtbansal@gmail.com/contacts`);
   console.log(res.data.contacts);
   setFriends([...res.data.contacts])
 }
 loadFriends();
  const requests = [
    {username: 'test request1'},
    {username: 'test request2'},
    {username: 'test request3'}
  ];
  const pending = [
    {username: 'test pending1'},
    {username: 'test pending2'},
    {username: 'test pending3'}
  ];
  
  //const friends = props.contacts.filter(curr => curr.status === 3);
  //const requests = props.contacts.filter(curr => curr.status === 2);
  //const pending = props.contacts.filter(curr => curr.status === 1);

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
            value='requests' 
            label='Requests'
            disableRipple 
            // className={props.classes.tab}
            // classes={{
            //   selected: props.classes.selectedTab
            // }}
          />
          <Tab 
            value='pending' 
            label='Pending'
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
      {display === 'requests' && 
        <Requests 
          requests={requests} 
          updateContact={props.updateContact}
        />
      }
      {display === 'pending' && <Pending pending={pending} />}
    </Grid>
  );
}

export default Contacts;