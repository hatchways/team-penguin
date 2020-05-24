import React from 'react';
import messengerImg from '../../assets/messenger-img.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  image: {
    backgroundImage: `url(${messengerImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
  }
}));

const UnauthenticatedSidebar = props => {
  const classes = useStyles();
  return (
    <div className={ classes.image }>
      {/* <h1>Unauthenticated image</h1> */}
    </div>
  );
}

export default UnauthenticatedSidebar;