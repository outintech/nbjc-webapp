import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import {
  Container,
  Chip,
  Button,
  Typography,
  TextField,
  InputLabel,
  Box,
} from '@material-ui/core';

const styles = {
  chipWrapper: {
    maxHeight: 80,
    overflow: 'hidden',
  },
  chip: {
    marginBottom: 8,
    marginRight: 4,
  },
};

// Should these be abstracted to a different file
const userLabels = ['Agender', 'Aliagender', 'Ally', 'Androgyne', 'Arab', 'Aromantic', 'Asexual', 'Asian/Pacific Islander', 'Bicurious', 'Bigender', 'Bisexual', 'Black', 'Cisgender', 'Demisexual', 'Female', 'Gay', 'Gender Fluid', 'Gender Non-Binary', 'Gender Non-Conforming', 'Gender Queer', 'Immigrant', 'Indigenous', 'Intersex', 'Latinx', 'Lesbian', 'Male', 'Middle Eastern', 'Multiracial', 'North Afircan', 'Pangender', 'Pansexual', 'Person Living with a Disablity', 'Person of Color', 'Pilipinx', 'Polyamorous', 'Polygender', 'Queer', 'Skoliosexual', 'Straight', 'Transgender', 'Trigender', 'Two Spirit', 'Veteran', 'White'];

const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState({
    selectedLabels: ['Agender', 'Aliagender', 'Ally', 'Androgyne', 'Arab', 'Aromantic', 'Asexual'],
    name: 'Name',
    pronouns: 'pronouns',
    location: 'location',
  });

  // TODO: State needs to pull user info from backend after login, maybe done in the login component

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Needs to make a post call to backend to submit profileinfo state as updated user details
  // };

  return (
    <Container maxWidth="lg">
      <Typography>
        Users Profile
      </Typography>
      <Button>
        Edit Profile
      </Button>
      <form>
        <InputLabel type="inputLabel">
          <Typography>Name</Typography>
        </InputLabel>
        <TextField
          onChange={handleChange}
          value={profileInfo.name}
          autoComplete="off"
          type="input"
          variant="outlined"
          placeholder="User Name"
          name="name"
          autoFocus
        />
        <InputLabel type="inputLabel">
          <Typography>Pronouns</Typography>
        </InputLabel>
        <TextField
          onChange={handleChange}
          value={profileInfo.pronouns}
          autoComplete="off"
          type="input"
          variant="outlined"
          placeholder="User Name"
          name="pronouns"
        />
        <InputLabel type="inputLabel">
          <Typography>Location</Typography>
        </InputLabel>
        <TextField
          onChange={handleChange}
          value={profileInfo.location}
          autoComplete="off"
          type="input"
          variant="outlined"
          placeholder="User Name"
          name="location"
        />
        <Typography>Tell us about yourself</Typography>
        <Box>
          {userLabels.map((label) => (
            profileInfo.selectedLabels.includes(label) ? (
              <Chip
                key={label}
                onClick={() => addLabel(label)}
                color="secondary"
                className={label}
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
                  key={label}
                  variant="outlined"
                  onClick={() => addLabel(label)}
                  color="primary"
                  className={label}
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
