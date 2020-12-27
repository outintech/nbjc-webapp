import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import states from '../../api/states';

const styles = (theme) => ({
  inputLabel: {
    margin: '18px 0',
    color: '#000',
  },
  inputField: {
    display: 'block',
    marginTop: '18px',
    '& input': {
      [theme.breakpoints.up('mobile')]: {
        minWidth: '326px',
      },
    },
  },
  stateLabel: {
    padding: '0px 12px',
  },
  smallFormControl: {
    width: 150,
  },
  formControl: {
    marginTop: '18px',
    display: 'block',
  },
  form: {
    [theme.breakpoints.up('mobile')]: {
      margin: 0,
    },
    [theme.breakpoints.up('xs')]: {
      margin: '0 20px',
    },
  },
  submitButton: {
    [theme.breakpoints.up('xs')]: {
      marginBottom: 25,
    },
    [theme.breakpoints.up('mobile')]: {
      float: 'right',
    },
  },
});

const Search = ({ classes, onNext, disableNext }) => {
  const matches = useMediaQuery('(min-width:376px)');
  const [formValues, setFormValues] = useState({
    name: '',
    city: '',
    zipcode: '',
    state: '',
  });
  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSearch = (e) => {
    e.preventDefault();
    onNext(formValues);
  };

  const validateForm = () => formValues.name.length > 0
    && formValues.city.length > 0
    && formValues.state.length === 2;

  return (
    <>
      <Typography variant="h4" align="center">
        Add a Space
      </Typography>
      <Typography variant="subtitle1" align="center">
        Add your favorite space to OurGuide. The information you enter will be
        reviewed by an administrator. Thank you for helping your community find
        and enjoy spaces.
      </Typography>
      <form onSubmit={onSearch} className={classes.form}>
        <InputLabel type="inputLabel" className={classes.inputLabel}>
          <Typography variant="h6">What&apos;s the space?</Typography>
        </InputLabel>
        <TextField
          type="input"
          label="Name of Space"
          variant="outlined"
          helperText="Required"
          className={classes.inputField}
          name="name"
          onChange={onChange}
          value={formValues.name}
          fullWidth={!matches}
          required
        />
        <InputLabel type="inputLabel" className={classes.inputLabel}>
          <Typography variant="h6">Space Location</Typography>
        </InputLabel>
        <TextField
          type="input"
          label="City"
          variant="outlined"
          helperText="Required"
          className={classes.inputField}
          name="city"
          onChange={onChange}
          value={formValues.city}
          fullWidth={!matches}
          required
        />
        <FormControl className={classes.formControl}>
          <InputLabel type="inputLabel" className={classes.stateLabel}>State</InputLabel>
          <Select
            type="input"
            label="City"
            variant="outlined"
            helperText="Required"
            className={classes.smallFormControl}
            name="state"
            onChange={onChange}
            value={formValues.state}
            required
          >
            {states.map((state) => (
              <MenuItem value={state.abbreviation}>{state.abbreviation}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            type="input"
            label="Zipcode"
            variant="outlined"
            helperText="Optional"
            className={classes.smallFormControl}
            onChange={onChange}
            value={formValues.zipcode}
            name="zipcode"
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={onSearch}
          className={cx(classes.inputField, classes.submitButton)}
          fullWidth={!matches}
          onChange={onChange}
          disabled={!validateForm() || disableNext}
          disableElevation
        >
          Next
        </Button>
      </form>
    </>
  );
};

Search.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onNext: PropTypes.func,
  disableNext: PropTypes.bool,
};

Search.defaultProps = {
  onNext: () => {},
  disableNext: false,
};

export default withStyles(styles)(Search);
