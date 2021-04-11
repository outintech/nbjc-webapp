import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import {
  Box,
  Button,
  Container,
  Snackbar,
  Typography,
  Chip,
  TextField,
} from '@material-ui/core';
import { trackPromise } from 'react-promise-tracker';

import { createUser } from '../../api';
import { UserContext } from '../../context/UserContext';

import useQuery from '../../hooks/useQuery';

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

const ProfilePage = ({ classes }) => {
  const [profileInfo, setProfileInfo] = useState({
    identities_attributes: [],
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
  const [inputError, setInputError] = useState({
    usernameError: false,
    usernameErrorMessage: '',
    pronounsError: false,
    pronounsErrorMessage: '',
    locationError: false,
    locationErrorMessage: '',
  });
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [userCreated, setUserCreated] = useState(false);
  const { user, profileChips } = useContext(UserContext);
  const history = useHistory();

  const openSnackBar = (newState) => {
    setSnackBar({ ...newState, openBar: true });
  };

  const closeSnackBar = () => {
    setSnackBar({ ...snackBar, openBar: false });
  };

  const addLabel = (label) => {
    if (selectedLabels.includes(label)) {
      setProfileInfo((prevState) => ({
        ...prevState,
        identities_attributes: prevState.identities_attributes
          .filter((labelFilter) => labelFilter.name !== label),
      }));
      setSelectedLabels((prevState) => prevState
        .filter((labelFilter) => labelFilter !== label));
    } else {
      setProfileInfo((prevState) => ({
        ...prevState,
        identities_attributes: [...prevState.identities_attributes, { name: label }],
      }));
      setSelectedLabels((prevState) => [...prevState, label]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fieldValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === '' || !fieldValue) {
      setInputError((prevState) => ({
        ...prevState,
        [`${fieldName}Error`]: true,
        [`${fieldName}ErrorMessage`]: `${fieldName} is required`,
      }));
    } else {
      setInputError((prevState) => ({
        ...prevState,
        [`${fieldName}Error`]: false,
        [`${fieldName}ErrorMessage`]: '',
      }));
    }
    return null;
  };

  const handleSubmit = (e, updatedInfo) => {
    e.preventDefault();
    if (Object.values(inputError).some((el) => el === true)) {
      openSnackBar({
        vertical: 'top',
        horizontal: 'center',
        popperMessage: 'Please fix errors before submitting',
      });
      return;
    }
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
        .then(() => {
          setUserCreated(true);
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
  if (userCreated) {
    const query = useQuery();
    console.log(query.get('returnTo'));
    history.push(`${query.get('returnTo')}`);
  }
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
        <TextField
          label="username"
          className={classes.textInput}
          onChange={handleChange}
          onBlur={() => fieldValidation('username', profileInfo.username)}
          value={profileInfo.username}
          autoComplete="off"
          variant="outlined"
          name="username"
          error={inputError.usernameError}
          helperText={inputError.usernameErrorMessage}
          validate
          required
        />
        <TextField
          label="name"
          className={classes.textInput}
          onChange={handleChange}
          onBlur={() => fieldValidation('name', profileInfo.name)}
          value={profileInfo.name}
          autoComplete="off"
          type="input"
          variant="outlined"
          name="name"
          error={inputError.nameError}
          helperText={inputError.nameErrorMessage}
          autoFocus
          required
        />
        <TextField
          label="pronouns"
          className={classes.textInput}
          onChange={handleChange}
          onBlur={() => fieldValidation('pronouns', profileInfo.pronouns)}
          value={profileInfo.pronouns}
          autoComplete="off"
          type="input"
          variant="outlined"
          name="pronouns"
          error={inputError.pronounsError}
          helperText={inputError.pronounsErrorMessage}
          required
        />
        <TextField
          label="location"
          className={classes.textInput}
          onChange={handleChange}
          onBlur={() => fieldValidation('location', profileInfo.location)}
          value={profileInfo.location}
          autoComplete="off"
          type="input"
          variant="outlined"
          name="location"
          error={inputError.locationError}
          helperText={inputError.locationErrorMessage}
          required
        />
        <Typography variant="h6">Tell us about yourself</Typography>
        <Box>
          {profileChips && profileChips.map((chip) => (
            selectedLabels.includes(chip.name) ? (
              <Chip
                className={classes.identityChip}
                key={chip.name}
                onClick={() => addLabel(chip.name)}
                color="primary"
                icon={<CheckIcon />}
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
                  onClick={() => addLabel(chip.name)}
                  color="primary"
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
