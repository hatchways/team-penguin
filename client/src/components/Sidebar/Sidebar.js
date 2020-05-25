import React from 'react';
import Grid from '@material-ui/core/Grid';

import Contacts from './Contacts/Contacts';

const contacts = [];
const selectedContact = {username: 'test selected contact'};

const Sidebar = props => {
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