import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  TextField,
  Typography,
} from '@material-ui/core';

const styles = () => ({
  textInput: {
    width: '100%',
    margin: '10px 0 20px 0',
  },
  label: {
    paddingLeft: '10px',
    color: 'black',
  },
});

export function TextInput({
  inputName,
  profileInfo,
  classes,
  handleChange,
  handleClick,
}) {
  return (
    <>
      <InputLabel type="inputLabel">
        <Typography className={classes.label}>
          {inputName}
        </Typography>
      </InputLabel>
      <TextField
        onChange={handleChange}
        onClick={handleClick}
        value={profileInfo}
        autoComplete="off"
        type="input"
        variant="outlined"
        placeholder={profileInfo}
        name={inputName}
        autoFocus
        className={classes.textInput}
        data-testid={`text-field-${inputName}`}
        required
      />
    </>
  );
}

export default withStyles(styles)(TextInput);
