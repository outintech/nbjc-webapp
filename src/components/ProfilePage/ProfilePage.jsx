import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import {
  Box,
  Button,
  Container,
  Snackbar,
  Typography,
  Popper,
  Card,
  Chip,
  TextField,
} from '@material-ui/core';
import { UserContext } from '../../context/UserContext';
import { updateUser } from '../../api/user';

const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  blurb: {
    textAlign: 'center',
    margin: '0 auto 20px auto',
    width: '80%',
  },
  textInput: {
    width: '100%',
    margin: '10px 0 20px 0',
  },
  label: {
    paddingLeft: '10px',
    color: 'black',
  },
  popperCard: {
    display: 'flex',
    flexDirection: 'row',
    height: '56px',
    width: '360px',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  popperButton: {
    height: '36px',
    width: '140px',
  },
  identityChip: {
    marginBottom: '8px',
    marginRight: '4px',
  },
});

const ProfilePage = ({ classes }) => {
  const { userProfile, user, profileChips } = useContext(UserContext);

  const {
    username,
    pronouns,
    location,
    identities = [],
  } = userProfile;

  const [profileInfo, setProfileInfo] = useState({
    identities,
    username,
    pronouns,
    location,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackBar, setSnackBar] = useState({
    openBar: false,
    popperMessage: '',
    vertical: 'top',
    horizontal: 'center',
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openSnackBar = (newState) => {
    setSnackBar({ ...newState, openBar: true });
  };

  const closeSnackBar = () => {
    setSnackBar({ ...snackBar, openBar: false });
  };

  const addLabel = (label) => {
    if (profileInfo.identities.includes(label)) {
      setProfileInfo((prevState) => ({
        ...prevState,
        identities: prevState.identities
          .filter((labelFilter) => labelFilter !== label),
      }));
    } else {
      setProfileInfo((prevState) => ({
        ...prevState,
        identities: [...prevState.identities, label],
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const open = Boolean(anchorEl);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Still having trouble making post request to update user
    // Remember to trim(empty spaces from the end of strings)
    try {
      updateUser({ username, pronouns, location }, user.token);
      console.log({ username, pronouns, location });
      console.log('success');
      openSnackBar({
        vertical: 'top',
        horizontal: 'center',
        popperMessage: 'Your changes have been saved.',
      });
    } catch (error) {
      console.error(error);
      openSnackBar({
        vertical: 'top',
        horizontal: 'center',
        popperMessage: 'Error saving your changes',
      });
    }
    setAnchorEl(null);
  };

  const { vertical, horizontal, openBar } = snackBar;
  const id = open ? 'transitions-popper' : undefined;

  return (
    <Container className={classes.container}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openBar}
        onClose={closeSnackBar}
        message={snackBar.popperMessage}
        autoHideDuration={5000}
        action={
          (
            <Button color="secondary" size="small" onClick={closeSnackBar}>
              CLOSE
            </Button>
          )
        }
      />
      <Typography variant="h4" className={classes.title}>
        Users Profile
      </Typography>
      <Typography className={classes.blurb}>
        View and edit your profile. After you make a change, click Save.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Name"
          className={classes.textInput}
          onChange={handleChange}
          onClick={handleClick}
          defaultValue={username}
          placeholder={username}
          autoComplete="off"
          type="input"
          variant="outlined"
          name="username"
          autoFocus
          required
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Pronouns"
          className={classes.textInput}
          onChange={handleChange}
          onClick={handleClick}
          defaultValue={pronouns}
          placeholder={pronouns}
          autoComplete="off"
          type="input"
          variant="outlined"
          name="pronouns"
          required
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Location"
          className={classes.textInput}
          onChange={handleChange}
          onClick={handleClick}
          defaultValue={location}
          placeholder={location}
          autoComplete="off"
          type="input"
          variant="outlined"
          name="location"
          required
        />
        <Popper
          type="submit"
          id={id}
          open={open}
          placement="bottom"
          disablePortal={false}
          anchorEl={anchorEl}
          transition
          modifiers={{
            flip: {
              enabled: true,
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: 'scrollParent',
            },
          }}
        >
          <Card className={classes.popperCard}>
            <Button
              className={classes.popperButton}
              color="primary"
              variant="outlined"
              aria-label="cancel"
              component="span"
              onClick={() => setAnchorEl(null)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={classes.popperButton}
              color="primary"
              variant="contained"
              aria-label="save"
              component="span"
              onClick={(e) => handleSubmit(e)}
            >
              Save
            </Button>
          </Card>
        </Popper>
        <Typography variant="h6">Tell us about yourself</Typography>
        <Box>
          {profileChips.map((chip) => (
            identities && profileInfo.identities.includes(chip.name) ? (
              <Chip
                className={classes.identityChip}
                key={chip.name}
                onClick={(e) => { addLabel(chip.name); handleClick(e); }}
                color="primary"
                icon={<CheckIcon />}
                anchorEl={anchorEl}
                label={
                  (
                    <Typography variant="body2">
                      {chip.name}
                    </Typography>
                  )
                }
              />
            )
              : (
                <Chip
                  className={classes.identityChip}
                  key={chip.name}
                  variant="outlined"
                  onClick={(e) => { addLabel(chip.name); handleClick(e); }}
                  color="primary"
                  anchorEl={anchorEl}
                  label={
                    (
                      <Typography variant="body2">
                        {chip.name}
                      </Typography>
                    )
                  }
                />
              )
          ))}
        </Box>
      </form>
    </Container>
  );
};

ProfilePage.propTypes = {};

ProfilePage.defaultProps = {};

export default withStyles(styles)(ProfilePage);
