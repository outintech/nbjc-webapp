import React from 'react';
import {
  Chip,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';

const styles = () => ({
  identityChip: {
    marginBottom: '8px',
    marginRight: '4px',
  },
});

export function ProfileChip({
  classes,
  onClick,
  anchorel,
  label,
  selected,
}) {
  return (
    <Chip
      className={classes.identityChip}
      key={label}
      onClick={onClick}
      color={selected ? 'secondary' : 'primary'}
      icon={selected ? <CheckIcon /> : null}
      variant={selected ? 'default' : 'outlined'}
      anchorel={anchorel}
      label={
        (
          <Typography variant="body2">
            {label}
          </Typography>
        )
      }
      aria-label={`${label} profile chip`}
    />
  );
}

export default withStyles(styles)(ProfileChip);
