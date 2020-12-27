import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Typography, withStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

// todo: change to use api.
import getYelpResultsMock from '../../__mocks__/getYelpResultMock';
import chips from '../../api/chips';

import {
  AddSpaceSearch, AddSpaceAddress, AddSpaceAttributes, AddSpaceReview,
} from '../../components/AddSpacePage';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up('mobile')]: {
      margin: '0 100px',
    },
  },
  stepper: {
    justifyContent: 'center',
  },
  step: {
    cursor: 'pointer',
  },
  stepLabel: {
    '& .MuiStepIcon-root': {
      width: 30,
      height: 30,
      [theme.breakpoints.up('mobile')]: {
        width: 50,
        height: 50,
      },
    },
  },
  alert: {
    backgroundColor: theme.palette.error.main,
    color: 'white',
  },
  alertMessage: {
    display: 'flex',
    width: 344,
  },
  alertText: {
    display: 'inline-block',
  },
  supportButton: {
    display: 'inline-block',
    float: 'right',
    color: 'white',
    '&:hover': {
      backgroundColor: 'unset',
    },
  },
});

const getMockBusiness = (count = 10) => [...Array(count)].map((_, i) => getYelpResultsMock({ id: `${i}` }));

const getStepContent = (step, { onBack, onNext, disableNext }, formValues) => {
  switch (step) {
    case 0:
      return (
        <AddSpaceSearch
          onNext={onNext}
          disableNext={disableNext}
          addSpaceProps={formValues}
        />
      );
    case 1:
      return (
        <AddSpaceAddress
          businessList={getMockBusiness()}
          onBack={onBack}
          onNext={onNext}
          addSpaceProps={formValues}
        />
      );
    case 2:
      return (
        <AddSpaceAttributes
          chips={chips}
          onBack={onBack}
          onNext={onNext}
          addSpaceProps={formValues}
        />
      );
    case 3:
      return <AddSpaceReview onBack={onBack} onNext={onNext} addSpaceProps={formValues} />;
    case 4:
      return 'Submit';
    default:
      return 'Unknown step';
  }
};

const getSteps = () => ['Add space', 'Address', 'Attributes', 'Rate and Review', 'Submit'];

const AddSpace = ({ classes }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const steps = getSteps();
  const onNext = (data) => {
    if (activeStep === 0) {
      // todo: call yelp api
      if (data && data.name === 'error') {
        setSnackbarOpen(true);
        return;
      }
    }
    setFormValues({
      ...formValues,
      ...data,
    });
    setActiveStep(activeStep + 1);
  };
  const stepProps = {
    onBack: (step) => {
      if (step && Number.isNaN(step)) {
        return setActiveStep(step);
      }
      return setActiveStep(activeStep - 1);
    },
    onNext,
    disableNext: snackbarOpen,
  };

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        connector={null}
        className={classes.stepper}
      >
        {steps.map((label, index) => (
          <Step
            color="secondary"
            key={label}
            onClick={() => {
              if (index < activeStep) {
                setActiveStep(index);
              }
            }}
            className={classes.step}
          >
            {activeStep === index && (
              <StepLabel className={classes.stepLabel} color="secondary">
                {label}
              </StepLabel>
            )}
            {activeStep !== index && (
              <StepLabel className={classes.stepLabel} color="secondary" />
            )}
          </Step>
        ))}
      </Stepper>
      <div>{getStepContent(activeStep, stepProps, formValues)}</div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          className={classes.alert}
          icon={false}
          classes={{ message: classes.alertMessage }}
        >
          <Typography variant="body2">
            We could not find the space. Please try again or contact support.
          </Typography>
          {/* todo: link to what? */}
          <Button
            className={classes.supportButton}
            disableElevation
            disableRipple
          >
            Support
          </Button>
        </Alert>
      </Snackbar>
    </div>
  );
};

AddSpace.prototypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(AddSpace);
