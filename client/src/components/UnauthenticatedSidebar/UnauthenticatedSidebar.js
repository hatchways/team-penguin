import React from 'react';
import messengerImg from '../../assets/messenger-img.png';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as ChatLogo } from '../../assets/chat_bubble_outline.svg';

const useStyles = makeStyles(theme => ({
  image: {
    backgroundImage: `linear-gradient(rgba(58, 141, 255,0.85),rgba(134, 185, 255,1)),url(${messengerImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageHeading: {
    color: 'white',
    padding: '0 4rem',
    textAlign: 'center',
    paddingTop: '1rem'
  }
}));

const UnauthenticatedSidebar = props => {
  const classes = useStyles();
  return (
    <div className={ classes.image }>
      <ChatLogo />
      <Typography component='h1' variant='h4' className= { classes.imageHeading }>Converse with anyone in any language</Typography>
    </div>
  );
}

export default UnauthenticatedSidebar;