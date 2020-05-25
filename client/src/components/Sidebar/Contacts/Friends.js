import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';


const Friends = props => {
  const entries = (selected, select) => props.friends.map(curr => (
    <Grid
      container
      spacing={3}
      alignItems='center'
  //     // className={
  //     //   selected === curr.username 
  //     //   ? props.classes.friend + ' ' + props.classes.selected 
  //     //   : props.classes.friend
  //     // }
      key={curr.username}
      onClick={() => {select(curr.index)}}
    >
  {/* 
  //     <Grid item>
  //       {curr.image ? (
  //         <Avatar 
  //           alt='avatar' 
  //           src={(curr.image.data.data, curr.image.contentType)} 
  //           //className={props.classes.avatar} 
  //         />
  //       ) : (
  //         <Avatar 
  //           alt='avatar' 
  //           //className={props.classes.avatar}
  //         >
            
  //         </Avatar>
  //       )}
  //     </Grid>*/}
      <Grid item>
        <Typography variant='h5'>{curr.username}</Typography>
      </Grid>
    </Grid>
  ));

  const [open, setOpen] = React.useState(false);

  const openModal = () => {
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
  }

  return (
    <Grid 
      item 
      container
      direction='column'
    >
      <Modal 
        open={open} 
        onClose={closeModal} 
       // className={props.classes.friendModal}
      >
        
      </Modal>
      {/* className={props.classes.addFriend} */}
      <Grid item >
        <Button color='primary' onClick={openModal} disableRipple>
        {/* classes={{root: props.classes.addFriendIcon}} */}
          <Icon className='fas fa-plus' />
          <Typography variant='body1'>Add friend</Typography>
        </Button>
      </Grid>
      {entries(props.selected, props.selectContact)}
    </Grid>
  );
}

export default Friends;