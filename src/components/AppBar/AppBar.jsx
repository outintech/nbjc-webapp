import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';

import { useMediaQuery, withStyles } from '@material-ui/core';

import MaterialAppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import MenuIcon from '@material-ui/icons/Menu';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

// import { UserContext } from '../../context/UserContext';

const styles = (theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
      height: 56,
    },
    [theme.breakpoints.up('md')]: {
      height: 64,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.navBlack.light,
    color: theme.palette.navBlack.contrastText,
  },
  links: {
    marginRight: '1rem',
    color: theme.palette.navBlack.textDark,
  },
  selected: {
    background: theme.palette.action.selected,
  },
  icons: {
    color: '#000',
  },
  drawer: {
    width: 375,
    flexShrink: 0,
    position: 'static !important',
    '& .MuiBackdrop-root': {
      zIndex: 1,
    },
  },
  drawerPaper: {
    width: 375,
  },
  avatar: {
    backgroundColor: '#ffffff',
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    marginLeft: 'auto',
    textTransform: 'uppercase',
  },
  logo: {
    flexGrow: 1,
    textAlign: 'center',
  },
});

const AppBar = ({
  selected,
  classes,
  routes,
  isLoading,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  // const userContext = useContext(UserContext);
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };
  const showDrawerItems = () => routes.map((item) => {
    const otherProps = {
      selected: item.key === selected,
      color: item.key === selected ? 'primary' : 'inherit',
    };
    return (
      <ListItem
        button
        key={item.key}
        selected={otherProps.selected}
        className={cx({ [classes.selected]: otherProps.selected })}
        onClick={() => {
          setShowDrawer(false);
          history.push(item.path);
        }}
      >
        <ListItemIcon>
          <item.icon className={classes.icons} />
        </ListItemIcon>
        <ListItemText>
          <Typography className={classes.icons} variant="subtitle2">
            {item.label}
          </Typography>
        </ListItemText>
      </ListItem>
    );
  });

  const NavIcons = () => {
    let appIcons;
    if (
      selected === 'spaceDetails'
      || selected === 'addReview'
      || selected === 'reviews'
    ) {
      appIcons = (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="go-back"
          onClick={goBack}
          data-testid="appbar-go-back"
        >
          <ArrowBackIos />
        </IconButton>
      );
    } else {
      appIcons = (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setShowDrawer(!showDrawer)}
          data-testid="appbar-menu"
        >
          <MenuIcon />
        </IconButton>
      );
    }
    return appIcons;
  };

  const Logo = () => {
    const matches = useMediaQuery('(min-width:376px)');
    let logoSrc = '/mobile-appBar-logo.svg';
    if (matches) {
      logoSrc = '/web-appBar-logo.svg';
    }
    return (
      <div className={classes.logo}>
        <img src={logoSrc} alt="logo" />
      </div>
    );
  };

  const AddASpace = () => {
    const matches = useMediaQuery('(min-width:376px)');
    return matches ? (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        alignItems: 'center',
        alignSelf: 'right',
      }}
      >
        <AddCircleOutlineIcon className={classes.icons} fontSize="small" />
        <Link href="/spaces/new" underline="none" className={classes.links}>
          Add a Space
        </Link>
      </div>
    ) : <AddCircleOutlineIcon className={classes.icons} fontSize="small" style={{ marginRight: 2 }} />;
  };

  return (
    <>
      <div className={classes.root} data-testid="app-bar">
        <MaterialAppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <NavIcons />
            {!isLoading ? (
              <Logo />
            ) : null}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'right',
              alignItems: 'center',
              alignSelf: 'right',
            }}
            >
              <AddASpace />
              <Link href="/profile" underline="none" className={classes.links}>
                Log In
              </Link>
            </div>

          </Toolbar>
        </MaterialAppBar>
        <Drawer
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
          data-testid="appbar-drawer"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
            backdrop: classes.backdrop,
          }}
        >
          <Toolbar />
          <List>
            {showDrawerItems()}
            <ListItem
              button
              key="support"
              onClick={() => {
                setShowSupportDialog(true);
              }}
            >
              <ListItemIcon>
                <HelpOutlineOutlinedIcon
                  color="tertiary"
                  className={classes.icons}
                />
              </ListItemIcon>
              <ListItemText>
                <Typography className={classes.icons} variant="subtitle2">
                  Support
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </div>
      <Dialog
        open={showSupportDialog}
        onClose={() => setShowSupportDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Leave The Lavender Book?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to leave The Lavender Book? You will be taken
            to Google Forms to contact Support.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSupportDialog(false)} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => {
              window.open('https://forms.gle/mLDNTMGxMojuiKKLA', '_blank');
              setShowSupportDialog(false);
              setShowDrawer(false);
            }}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AppBar.propTypes = {
  selected: PropTypes.string,
  classes: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

AppBar.defaultProps = {
  selected: 'home',
  isLoading: false,
};

export default withStyles(styles)(AppBar);
