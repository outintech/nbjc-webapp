import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import getYelpResultsMock from '../../__mocks__/getYelpResultMock';

import { AddSpaceSearch, AddSpaceAddress } from '../../components/AddSpacePage';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up('mobile')]: {
      margin: '0 100px',
    },
  },
  stepper: {
    justifyContent: 'center',
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
});

const getMockBusiness = (count = 10) => [...Array(count)].map((_, i) => getYelpResultsMock({ id: `${i}` }));

const getStepContent = (step, stepProps) => {
  switch (step) {
    case 0:
      return <AddSpaceSearch onNext={stepProps.onNext} />;
    case 1:
      return (
        <AddSpaceAddress
          businessList={getMockBusiness()}
          onBack={stepProps.onBack}
          onNext={stepProps.onNext}
        />
      );
    case 2:
      return 'Attributes';
    case 3:
      return 'Rate and Review';
    case 4:
      return 'Submit';
    default:
      return 'Unknown step';
  }
};

const getSteps = () => ['Add space', 'Address', 'Attributes', 'Rate and Review', 'Submit'];

const AddSpace = ({ classes }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const stepProps = {
    onBack: () => setActiveStep(activeStep - 1),
    onNext: () => setActiveStep(activeStep + 1),
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} connector={null} className={classes.stepper}>
        {steps.map((label, index) => (
          <Step color="secondary" key={label}>
            {activeStep === index && (
              <StepLabel
                className={classes.stepLabel}
                color="secondary"
              >
                {label}
              </StepLabel>
            )}
            {activeStep !== index && (
              <StepLabel className={classes.stepLabel} color="secondary" />
            )}
          </Step>
        ))}
      </Stepper>
      <div>
        {getStepContent(activeStep, stepProps)}
      </div>
    </div>
  );
};

AddSpace.prototypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(AddSpace);
