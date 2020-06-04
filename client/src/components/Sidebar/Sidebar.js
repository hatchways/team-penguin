import React from 'react';
import Contacts from './Contacts/Contacts';

const Sidebar = props => {
  const contacts = [];
  const selectedContact = {username: 'test selected contact'};

  return (
    <div>
      <h1>user avatar</h1>
      <Contacts 
        contacts={props.contacts}
        selected={props.selected}
        requestContact={props.requestContact}
        updateContact={props.updateContact}
        selectContact={props.selectContact}
      />
    </div>
  );
}

export default Sidebar;