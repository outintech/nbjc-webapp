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

const userLabels = ['Agender', 'Aliagender', 'Ally', 'Androgyne', 'Arab', 'Aromantic', 'Asexual', 'Asian/Pacific Islander', 'Bicurious', 'Bigender', 'Bisexual', 'Black', 'Cisgender', 'Demisexual', 'Female', 'Gay', 'Gender Fluid', 'Gender Non-Binary', 'Gender Non-Conforming', 'Gender Queer', 'Immigrant', 'Indigenous', 'Intersex', 'Latinx', 'Lesbian', 'Male', 'Middle Eastern', 'Multiracial', 'North Afircan', 'Pangender', 'Pansexual', 'Person Living with a Disablity', 'Person of Color', 'Pilipinx', 'Polyamorous', 'Polygender', 'Queer', 'Skoliosexual', 'Straight', 'Transgender', 'Trigender', 'Two Spirit', 'Veteran', 'White'];

const ProfilePage = ({ classes }) => {
  const [profileInfo, setProfileInfo] = useState({
    selectedLabels: ['Bisexual', 'Black', 'Gender Fluid'],
    name: 'Name Here',
    pronouns: 'Pronouns Here',
    location: 'Location Here',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackBar, setSnackBar] = useState({
    openBar: false,
    popperMessage: '',
    vertical: 'top',
    horizontal: 'center',
  });

  const { userProfile } = useContext(UserContext);

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
    if (profileInfo.selectedLabels.includes(label)) {
      setProfileInfo((prevState) => ({
        ...prevState,
        selectedLabels: prevState.selectedLabels
          .filter((labelFilter) => labelFilter !== label),
      }));
    } else {
      setProfileInfo((prevState) => ({
        ...prevState,
        selectedLabels: [...prevState.selectedLabels, label],
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

  const handleSubmit = (e, updatedInfo) => {
    e.preventDefault();
    // TODO:make post call to backend to submit profileinfo state as updated user details
    // Remember to trim( empty spaces from the end of strings)
    try {
      // eslint-disable-next-line no-console
      console.log(updatedInfo);
      // eslint-disable-next-line no-console
      console.log('success');
      openSnackBar({
        vertical: 'top',
        horizontal: 'center',
        popperMessage: 'Your changes have been saved.',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fail');
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
          label="Name"
          className={classes.textInput}
          onChange={handleChange}
          onClick={handleClick}
          value={userProfile.username}
          placeholder={userProfile.usernmae}
          autoComplete="off"
          type="input"
          variant="outlined"
          name="name"
          autoFocus
          required
        />
        <TextField
          label="Pronouns"
          className={classes.textInput}
          onChange={handleChange}
          onClick={handleClick}
          value={userProfile.pronouns}
          placeholder={userProfile.pronouns}
          autoComplete="off"
          type="input"
          variant="outlined"
          name="pronouns"
          required
        />
        <TextField
          label="Location"
          className={classes.textInput}
          onChange={handleChange}
          onClick={handleClick}
          value={userProfile.location}
          placeholder={userProfile.locaiton}
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
              onClick={(e) => handleSubmit(e, profileInfo)}
            >
              Save
            </Button>
          </Card>
        </Popper>
        <Typography variant="h6">Tell us about yourself</Typography>
        <Box>
          {userLabels.map((label) => (
            profileInfo.selectedLabels.includes(label) ? (
              <Chip
                className={classes.identityChip}
                key={label}
                onClick={(e) => { addLabel(label); handleClick(e); }}
                color="primary"
                icon={<CheckIcon />}
                anchorEl={anchorEl}
                label={
                  (
                    <Typography variant="body2">
                      {label}
                    </Typography>
                  )
                }
              />
            )
              : (
                <Chip
                  className={classes.identityChip}
                  key={label}
                  variant="outlined"
                  onClick={(e) => { addLabel(label); handleClick(e); }}
                  color="primary"
                  anchorEl={anchorEl}
                  label={
                    (
                      <Typography variant="body2">
                        {label}
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
