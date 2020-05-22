import React from 'react';
import Grid from '@material-ui/core/Grid';

import Contacts from './Contacts/Contacts';


const Sidebar = props => {
  return (
    <Grid
      item
      container
      sm={3}
      direction='column'
      className={props.classes.root}
    >
    
      <Contacts 
        contacts={props.contacts}
        selected={props.selected}
        requestContact={props.requestContact}
        updateContact={props.updateContact}
        selectContact={props.selectContact}
      />
    </Grid>
  );
}

export default Sidebar;