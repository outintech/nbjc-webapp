import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  Container,
  Popper,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { TextInput } from './TextInput';
import { ProfileChip } from './ProfileChip';

const styles = () => ({
  container: {
    // maxHeight: 'lg',
    overflow: 'hidden',
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
  },
  popperButton: {
    height: '36px',
    width: '140px',
  },
});

// Should these be abstracted to a different file
const userLabels = ['Agender', 'Aliagender', 'Ally', 'Androgyne', 'Arab', 'Aromantic', 'Asexual', 'Asian/Pacific Islander', 'Bicurious', 'Bigender', 'Bisexual', 'Black', 'Cisgender', 'Demisexual', 'Female', 'Gay', 'Gender Fluid', 'Gender Non-Binary', 'Gender Non-Conforming', 'Gender Queer', 'Immigrant', 'Indigenous', 'Intersex', 'Latinx', 'Lesbian', 'Male', 'Middle Eastern', 'Multiracial', 'North Afircan', 'Pangender', 'Pansexual', 'Person Living with a Disablity', 'Person of Color', 'Pilipinx', 'Polyamorous', 'Polygender', 'Queer', 'Skoliosexual', 'Straight', 'Transgender', 'Trigender', 'Two Spirit', 'Veteran', 'White'];

const ProfilePage = ({ classes }) => {
  const [profileInfo, setProfileInfo] = useState({
    selectedLabels: ['Bisexual', 'Black', 'Gender Fluid'],
    name: 'Shayne',
    pronouns: 'he/him',
    location: 'Brooklyn, NY',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackBar, setSnackBar] = useState({
    openBar: false,
    vertical: 'top',
    horizontal: 'center',
  });

  // TODO: State needs to pull user info from backend after login, maybe done in the login component
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
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
  const id = open ? 'transitions-popper' : undefined;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Needs to make a post call to backend to submit profileinfo state as updated user details
  // //Remember to trim( empty spaces from the end of strings)
  // };

  const { vertical, horizontal, openBar } = snackBar;

  return (
    <Container className={classes.container}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openBar}
        onClose={closeSnackBar}
        message="Your chages have been saved."
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
      <form>
        <TextInput
          inputName="Name"
          profileInfo={profileInfo.name}
          handleChange={handleChange}
          handleClick={handleClick}
          classes={classes}
        />
        <Popper
          id={id}
          open={open}
          placement="bottom"
          disablePortal={false}
          anchorEl={anchorEl}
          transition
          modifiers={{
            flip: {
              enabled: false,
            },
            preventOverflow: {
              enabled: false,
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
              onClick={handleClick}
            >
              Cancel
            </Button>
            <Button
              className={classes.popperButton}
              color="secondary"
              variant="contained"
              aria-label="save"
              component="span"
              onClick={() => openSnackBar({ vertical: 'top', horizontal: 'center' })}
            >
              Save
            </Button>
          </Card>
        </Popper>
        <TextInput
          inputName="Pronouns"
          profileInfo={profileInfo.pronouns}
          handleChange={handleChange}
          handleClick={handleClick}
          classes={classes}
        />
        <TextInput
          inputName="Location"
          profileInfo={profileInfo.location}
          handleChange={handleChange}
          handleClick={handleClick}
          classes={classes}
        />
        <Typography variant="h6">Tell us about yourself</Typography>
        <Box>
          {userLabels.map((label) => (
            <ProfileChip
              classes={classes}
              onClick={(e) => { addLabel(label); handleClick(e); }}
              anchorel={anchorEl}
              label={label}
              selected={profileInfo.selectedLabels.includes(label)}
            />
          ))}
        </Box>
      </form>
    </Container>
  );
};

ProfilePage.propTypes = {};

ProfilePage.defaultProps = {};

export default withStyles(styles)(ProfilePage);
