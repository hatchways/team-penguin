import React, { useState, useEffect } from 'react';
import Contacts from './Contacts/Contacts';
import axios from 'axios';

const Sidebar = props => {
  const contacts = [];
  const selectedContact = {username: 'test selected contact'};
  const email = localStorage.getItem('email');
  const [approveInvite, setApproveInvite] = useState(false);

  const updateContact = async(approvedEmail) => {
    const approvedRes = await axios.put(`http://localhost:3001/invitations/user/${email}/approve`, 
                                      {  'from_email': approvedEmail });
    if(approvedRes.data.approved && approvedRes.data.from_user_email === approvedEmail){
      //add snackbar alert
      console.log(approvedRes.data);
      setApproveInvite(true);
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
    </div>
  );
}

export default Sidebar;