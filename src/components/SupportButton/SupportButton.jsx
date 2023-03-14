import React, { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles,
} from '@material-ui/core/';

const styles = (theme) => ({
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchButton: {
    [theme.breakpoints.up('lg')]: {
      minWidth: 122.4,
      minHeight: 40.8,
    },
    backgroundColor: '#FCFBFE',
    textTransform: 'none',
    border: '1px solid #EBE5F6',
    fontWeight: 600,
    marginBottom: 4,
  },
});

const SupportButton = ({ classes }) => {
  const [showSupportDialog, setShowSupportDialog] = useState(false);

  return (
    <Box>
      <Box className={classes.centerContent} style={{ marginTop: '1rem' }}>
        <Button
          variant="outlined"
          className={classes.searchButton}
          onClick={() => {
            setShowSupportDialog(true);
          }}
        >
          Report a Problem
        </Button>
      </Box>
      <Dialog
        open={showSupportDialog}
        onClose={() => setShowSupportDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Leave The Lavender Book?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to leave The Lavender Book? You will be taken
            to Google Forms to contact Support.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSupportDialog(false)} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => {
              window.open('https://forms.gle/mLDNTMGxMojuiKKLA', '_blank');
              setShowSupportDialog(false);
            }}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

SupportButton.propTypes = {};

SupportButton.defaultProps = {};

export default withStyles(styles)(SupportButton);
