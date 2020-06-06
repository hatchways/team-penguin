import React, { useState, useEffect } from 'react';
import Contacts from './Contacts/Contacts';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

import SidebarHeader from './SidebarHeader';

const Sidebar = props => {
  const email = localStorage.getItem('email');
  const authToken = localStorage.getItem('authToken');
  const [friends, setFriends] = useState([]);
  const [approveInvite, setApproveInvite] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);

  function closeAlertHandler() {
    setApproveInvite('');
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const updateContact = async(fromEmail, action) => {

    if(action === 'approve') {
      const approvedRes = await axios.put(`http://localhost:3001/invitations/user/${email}/approve`, 
                                      {  'from_email': fromEmail }, {headers: { Authorization: authToken}});
      if(approvedRes.data.approved && approvedRes.data.from_user_email === fromEmail){
        setApproveInvite(`${fromEmail} is now your friend`);
        loadFriends();
      }
    }
    else if(action === 'reject') {
      const rejectedRes = await axios.put(`http://localhost:3001/invitations/user/${email}/reject`, 
                                      {  'from_email': fromEmail }, {headers: { Authorization: authToken}});
      if(rejectedRes.data.rejected){
        setApproveInvite(`You have declined ${fromEmail}'s request`);
      }
    }
    loadPendingRequests();
    loadPendingInvites();
  }

  const loadPendingRequests = async() => {
    const res = await axios.get(`http://localhost:3001/invitations/user/requests/${email}`, {headers: { Authorization: authToken}});
    if(res.data.invitations && res.data.invitations.length !== 0){
     setPendingRequests(res.data.invitations);
    }
    else {
      setPendingRequests(['No pending invitation requests']);
    }
  }

  const loadPendingInvites = async() => {
    const res = await axios.get(`http://localhost:3001/invitations/user/${email}`, {headers: { Authorization: authToken}});
    if(res.data.invitations && res.data.invitations.length !== 0){
     setPendingInvites(res.data.invitations);
    }
    else {
      setPendingInvites(['No pending invitations']);
    }
  }

  const loadFriends = async() => {
    const res = await axios.get(`http://localhost:3001/invitations/user/${email}/contacts`, {headers: { Authorization: authToken}});
    if(res.data.contacts.length !== 0){
     setFriends(res.data.contacts);
    }
    else {
      setFriends(['You dont have any contacts. Send invites to initiate a conversation']);
    }
  }
 
  useEffect(() => {
    loadFriends();
  },[friends.length]);
 

  useEffect(() => {
    loadPendingRequests();
  }, [pendingRequests.length]);
  
  useEffect(() => {
    loadPendingInvites();
  }, [pendingInvites.length]);

  return (
    <div>
      <SidebarHeader />
      <div className="sidebarContainer">
        <Contacts 
          friends={friends}
          loadPendingInvites = {loadPendingInvites}
          selected={props.selected}
          requestContact={props.requestContact}
          updateContact={updateContact}
          selectContact={props.selectContact}
          requests={pendingRequests}
          pending = {pendingInvites}
        />
        <Snackbar open = {approveInvite.length !== 0} autoHideDuration={3000} onClose = { closeAlertHandler }>
                            <Alert onClose={closeAlertHandler} severity="success">
                              {approveInvite} 
                            </Alert>
          </Snackbar>
      </div>
    </div>
  );
}

export default Sidebar;