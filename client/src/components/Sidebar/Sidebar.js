import React, { useState, useEffect } from 'react';
import Contacts from './Contacts/Contacts';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

const Sidebar = props => {
  const email = localStorage.getItem('email');
  const [approveInvite, setApproveInvite] = useState('');

  function closeAlertHandler() {
    setApproveInvite('');
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const updateContact = async(approvedEmail) => {
    const approvedRes = await axios.put(`http://localhost:3001/invitations/user/${email}/approve`, 
                                      {  'from_email': approvedEmail });
    if(approvedRes.data.approved && approvedRes.data.from_user_email === approvedEmail){
      //add snackbar alert
      setApproveInvite(`${approvedEmail} is now your friend`);
    }
  }

  return (
    <div>
      <h1>user avatar</h1>
      <Contacts 
        contacts={props.contacts}
        selected={props.selected}
        requestContact={props.requestContact}
        updateContact={updateContact}
        selectContact={props.selectContact}
      />
       <Snackbar open = {approveInvite.length !== 0} autoHideDuration={3000} onClose = { closeAlertHandler }>
                          <Alert onClose={closeAlertHandler} severity="success">
                            {approveInvite} 
                          </Alert>
        </Snackbar>
    </div>
  );
}

export default Sidebar;