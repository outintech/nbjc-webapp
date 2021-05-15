import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  Container,
  Snackbar,
  Typography,
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
  submitButton: {
    width: '250px',
    height: '36px',
    margin: '50px auto',
  },
});

const ProfilePage = ({ classes }) => {
  const {
    userProfile,
    // setUserProfile,
    user,
    profileChips,
  } = useContext(UserContext);

  const {
    name,
    username,
    pronouns,
    location,
    identities: userIdentites = [],
  } = userProfile;

  const identities = userIdentites.map((identity) => [identity.id, identity.name]);

  const [profileInfo, setProfileInfo] = useState({
    identities,
    username,
    pronouns,
    location,
    name,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackBar, setSnackBar] = useState({
    openBar: false,
    popperMessage: '',
    vertical: 'top',
    horizontal: 'center',
  });
  const [inputError, setInputError] = useState({
    nameError: false,
    nameErrorMessage: '',
    usernameError: false,
    usernameErrorMessage: '',
    pronounsError: false,
    pronounsErrorMessage: '',
    locationError: false,
    locationErrorMessage: '',
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

  const labelExists = (identityAttributes, label) => {
    const exists = identityAttributes.find((el) => el[1] === label);
    if (exists) {
      return true;
    }
    return false;
  };

  const addLabel = (label) => {
    if (labelExists(profileInfo.identities, label.name)) {
      setProfileInfo((prevState) => ({
        ...prevState,
        identities: prevState.identities
          .filter((labelFilter) => labelFilter[1] !== label.name),
      }));
    } else {
      setProfileInfo((prevState) => ({
        ...prevState,
        identities: [...prevState.identities, [label.id, label.name]],
      }));
    }
  };

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setProfileInfo((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const fieldValidation = (fieldName, fieldValue) => {
    if (!fieldValue || fieldValue.trim() === '') {
      setInputError((prevState) => ({
        ...prevState,
        [`${fieldName}Error`]: true,
        [`${fieldName}ErrorMessage`]: `${fieldName} required`,
      }));
    } else if (/[^a-zA-Z0-9_ -]/.test(fieldValue) && (fieldName === 'name' || fieldName === 'username')) {
      setInputError((prevState) => ({
        ...prevState,
        [`${fieldName}Error`]: true,
        [`${fieldName}ErrorMessage`]: 'Invalid characters',
      }));
    } else if (fieldValue.trim().length > 20) {
      setInputError((prevState) => ({
        ...prevState,
        [`${fieldName}Error`]: true,
        [`${fieldName}ErrorMessage`]: 'Maximum length is 20 charcaters',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(inputError).some((el) => el === true)) {
      openSnackBar({
        vertical: 'top',
        horizontal: 'center',
        popperMessage: 'Please fix errors before submitting',
      });
      return;
    }
    try {
      await updateUser({
        username: profileInfo.username,
        pronouns: profileInfo.pronouns,
        location: profileInfo.location,
        userId: user.userId,
        identities: profileInfo.identities,
        name: profileInfo.name,
      }, user.token);
      // setUserProfile(updatedProfile.data.user);
      openSnackBar({
        vertical: 'top',
        horizontal: 'center',
        popperMessage: 'Your changes have been saved.',
      });
    } catch (error) {
      if (error.message.exception.includes('Username has already been taken')) {
        openSnackBar({
          vertical: 'top',
          horizontal: 'center',
          popperMessage: 'Username has already been taken',
        });
      } else {
        openSnackBar({
          vertical: 'top',
          horizontal: 'center',
          popperMessage: 'Error saving your changes',
        });
      }
    }
    setAnchorEl(null);
  };

  const { vertical, horizontal, openBar } = snackBar;
  const { logout } = useAuth0();

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
          onChange={(e) => handleChange(e, 'name')}
          onClick={handleClick}
          onBlur={() => fieldValidation('name', profileInfo.name)}
          error={inputError.nameError}
          helperText={inputError.nameErrorMessage}
          defaultValue={name}
          placeholder={name}
          autoComplete="off"
          type="input"
          variant="outlined"
          name="name"
          autoFocus
          required
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Username"
          className={classes.textInput}
          onChange={(e) => handleChange(e, 'username')}
          onClick={handleClick}
          onBlur={() => fieldValidation('username', profileInfo.username)}
          error={inputError.usernameError}
          helperText={inputError.usernameErrorMessage}
          defaultValue={username}
          placeholder={username}
          autoComplete="off"
          type="input"
          variant="outlined"
          name="name"
          autoFocus
          required
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Pronouns"
          className={classes.textInput}
          onChange={(e) => handleChange(e, 'pronouns')}
          onClick={handleClick}
          onBlur={() => fieldValidation('pronouns', profileInfo.pronouns)}
          error={inputError.pronounsError}
          helperText={inputError.pronounsErrorMessage}
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
          onBlur={() => fieldValidation('location', profileInfo.location)}
          error={inputError.locationError}
          helperText={inputError.locationErrorMessage}
          defaultValue={location}
          placeholder={location}
          autoComplete="off"
          type="input"
          variant="outlined"
          name="location"
          required
        />
        <Typography variant="h6">Tell us about yourself</Typography>
        <Box>
          {profileChips && profileChips.map((chip) => (
            identities && labelExists(profileInfo.identities, chip.name) ? (
              <Chip
                className={classes.identityChip}
                key={chip.name}
                onClick={(e) => { addLabel(chip); handleClick(e); }}
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
                  onClick={(e) => { addLabel(chip); handleClick(e); }}
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
      <Button
        type="button"
        color="primary"
        className={classes.submitButton}
        variant="contained"
        onClick={(e) => handleSubmit(e)}
      >
        save changes
      </Button>
      <Button
        type="button"
        color="primary"
        className={classes.submitButton}
        variant="contained"
        onClick={() => logout({
          // Need to update env variable
          returnTo: 'http://localhost:3000',
          client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
          federated: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/v2/logout?federated`,
        })}
      >
        logout
      </Button>
    </Container>
  );
};

ProfilePage.propTypes = {};

ProfilePage.defaultProps = {};

export default withStyles(styles)(ProfilePage);
