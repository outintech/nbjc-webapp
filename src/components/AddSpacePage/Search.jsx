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
import { addSpaceProps as addSpacePropTypes } from '../../types';

const styles = (theme) => ({
  pageTitle: {
    marginBottom: 10,
  },
  pageSubtitle: {
    [theme.breakpoints.up('mobile')]: {
      marginBottom: 60,
    },
    [theme.breakpoints.up('xs')]: {
      marginBottom: 40,
    },
  },
  form: {
    [theme.breakpoints.up('mobile')]: {
      margin: 0,
    },
    [theme.breakpoints.up('xs')]: {
      margin: '0 20px',
    },
  },
  inputLabel: {
    marginBottom: '10px',
    color: '#000',
  },
  inputField: {
    display: 'block',
    '& input': {
      [theme.breakpoints.up('mobile')]: {
        minWidth: '326px',
      },
    },
  },
  section: {
    [theme.breakpoints.up('mobile')]: {
      marginTop: 30,
    },
    [theme.breakpoints.up('xs')]: {
      marginTop: 15,
    },
  },
  stateLabel: {
    padding: '0px 12px',
  },
  smallFormControl: {
    width: 150,
  },
  formControl: {
    marginTop: '15px',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
    [theme.breakpoints.up('mobile')]: {
      display: 'inline-block',
      marginRight: 22,
    },
  },
  footer: {
    display: 'block',
  },
  submitButton: {
    [theme.breakpoints.up('xs')]: {
      marginBottom: 25,
    },
    [theme.breakpoints.up('mobile')]: {
      float: 'right',
    },
    marginTop: 20,
  },
});

const Search = ({
  classes,
  onNext,
  disableNext,
  addSpaceProps,
}) => {
  const matches = useMediaQuery('(min-width:376px)');
  const [formValues, setFormValues] = useState({
    name: addSpaceProps.name || '',
    city: addSpaceProps.city || '',
    zipcode: addSpaceProps.zipcode || '',
    state: addSpaceProps.state || '',
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
      <Typography
        variant={matches ? 'h2' : 'h4'}
        align="center"
        className={classes.pageTitle}
      >
        Add a Space
      </Typography>
      <Typography
        variant={matches ? 'h4' : 'subtitle1'}
        align="center"
        className={classes.pageSubtitle}
      >
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
          data-testid="addspace-name"
          required
        />
        <InputLabel
          type="inputLabel"
          className={cx(classes.inputLabel, classes.section)}
        >
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
          data-testid="addspace-city"
          required
        />
        <FormControl className={classes.formControl}>
          <InputLabel type="inputLabel" className={classes.stateLabel} required>
            State
          </InputLabel>
          <Select
            type="input"
            label="City"
            variant="outlined"
            className={classes.smallFormControl}
            name="state"
            onChange={onChange}
            value={formValues.state}
            data-testid="addspace-state"
            required
          >
            {states.map((state) => (
              <MenuItem value={state.abbreviation} key={state.abbreviation}>
                {state.abbreviation}
              </MenuItem>
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
            data-testid="addspace-zipcode"
          />
        </FormControl>
        <div className={classes.footer}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onSearch}
            className={cx(classes.inputField, classes.submitButton)}
            fullWidth={!matches}
            onChange={onChange}
            disabled={!validateForm() || disableNext}
            data-testid="addspace-search-next"
            disableElevation
          >
            Next
          </Button>
        </div>
      </form>
    </>
  );
};

Search.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onNext: PropTypes.func,
  disableNext: PropTypes.bool,
  addSpaceProps: PropTypes.shape(addSpacePropTypes),
};

Search.defaultProps = {
  onNext: () => { },
  disableNext: false,
  addSpaceProps: {},
};

export default withStyles(styles)(Search);
