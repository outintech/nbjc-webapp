import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import {
  Box,
  Button,
  Container,
  Snackbar,
  Typography,
  Chip,
  InputLabel,
  TextField,
} from '@material-ui/core';
import { trackPromise } from 'react-promise-tracker';

import { createUser } from '../../api';
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
  submitButton: {
    width: '250px',
    height: '36px',
    margin: '50px auto',
  },
  submitDiv: {
    display: 'flex',
  },
});

const userLabels = ['Agender', 'Aliagender', 'Ally', 'Androgyne', 'Arab', 'Aromantic', 'Asexual', 'Asian/Pacific Islander', 'Bicurious', 'Bigender', 'Bisexual', 'Black', 'Cisgender', 'Demisexual', 'Female', 'Gay', 'Gender Fluid', 'Gender Non-Binary', 'Gender Non-Conforming', 'Gender Queer', 'Immigrant', 'Indigenous', 'Intersex', 'Latinx', 'Lesbian', 'Male', 'Middle Eastern', 'Multiracial', 'North Afircan', 'Pangender', 'Pansexual', 'Person Living with a Disablity', 'Person of Color', 'Pilipinx', 'Polyamorous', 'Polygender', 'Queer', 'Skoliosexual', 'Straight', 'Transgender', 'Trigender', 'Two Spirit', 'Veteran', 'White'];

const ProfilePage = ({ classes }) => {
  const [profileInfo, setProfileInfo] = useState({
    selectedLabels: [],
    name: '',
    username: '',
    pronouns: '',
    location: '',
  });
  const [snackBar, setSnackBar] = useState({
    openBar: false,
    popperMessage: '',
    vertical: 'top',
    horizontal: 'center',
  });
  const { user } = useContext(UserContext);
  // TODO: State needs to pull user info from backend after login, maybe done in the login component
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

  const handleSubmit = (e, updatedInfo) => {
    e.preventDefault();
    // Needs to make a post call to backend to submit profileinfo state as updated user details
    // Remember to trim( empty spaces from the end of strings)
    // eslint-disable-next-line no-console
    console.log(updatedInfo, user);
    trackPromise(
      createUser({
        ...updatedInfo,
        ...user,
      })
        .then(() => {
          openSnackBar({
            vertical: 'top',
            horizontal: 'center',
            popperMessage: 'Your changes have been saved.',
          });
        })
        .catch((err) => {
          console.log(err);
          openSnackBar({
            vertical: 'top',
            horizontal: 'center',
            popperMessage: 'Error saving your changes',
          });
        }),
    );
  };

  const { vertical, horizontal, openBar } = snackBar;

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
            <Button color="primary" size="small" onClick={closeSnackBar}>
              CLOSE
            </Button>
          )
        }
      />
      <Typography variant="h4" className={classes.title}>
        Create Your Profile
      </Typography>
      <Typography className={classes.blurb}>
        Please fill out the information below.
        We will not distribute your personal information.
        Your safety is our priority.
      </Typography>
      <form onSubmit={handleSubmit}>
        <InputLabel
          disableAnimation
          htmlFor="username"
        >
          Create Username
        </InputLabel>
        <TextField
          className={classes.textInput}
          onChange={handleChange}
          value={profileInfo.username}
          placeholder="username"
          autoComplete="off"
          variant="outlined"
          name="username"
          required
        />
        <InputLabel type="inputLabel">
          <Typography>Name</Typography>
        </InputLabel>
        <TextField
          className={classes.textInput}
          onChange={handleChange}
          value={profileInfo.name}
          placeholder="name"
          autoComplete="off"
          type="input"
          variant="outlined"
          name="name"
          autoFocus
          required
        />
        <InputLabel type="inputLabel">
          <Typography>Pronouns</Typography>
        </InputLabel>
        <TextField
          className={classes.textInput}
          onChange={handleChange}
          value={profileInfo.pronouns}
          placeholder="pronouns"
          autoComplete="off"
          type="input"
          variant="outlined"
          name="pronouns"
          required
        />
        <InputLabel type="inputLabel">
          <Typography>Location</Typography>
        </InputLabel>
        <TextField
          className={classes.textInput}
          onChange={handleChange}
          value={profileInfo.location}
          placeholder="location"
          autoComplete="off"
          type="input"
          variant="outlined"
          name="location"
          required
        />
        <Typography variant="h6">Tell us about yourself</Typography>
        <Box>
          {userLabels.map((label) => (
            profileInfo.selectedLabels.includes(label) ? (
              <Chip
                className={classes.identityChip}
                key={label}
                onClick={() => addLabel(label)}
                color="primary"
                icon={<CheckIcon />}
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
                  onClick={() => addLabel(label)}
                  color="primary"
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
        <div className={classes.submitDiv}>
          <Button
            type="submit"
            color="primary"
            className={classes.submitButton}
            variant="contained"
            onClick={(e) => handleSubmit(e, profileInfo)}
          >
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

ProfilePage.propTypes = {};

ProfilePage.defaultProps = {};

export default withStyles(styles)(ProfilePage);
