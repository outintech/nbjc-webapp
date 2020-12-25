import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const styles = {
  stepperWrapper: {
    width: '100%',
    margin: '0 auto',
  },
};

// const getStepContent = (step) => {
//   switch (step) {
//     case 0:
//       return 'Add space';
//     case 1:
//       return 'Address';
//     case 2:
//       return 'Attributes';
//     case 3:
//       return 'Rate and Review';
//     case 4:
//       return 'Submit';
//     default:
//       return 'Unknown step';
//   }
// };

const getSteps = () => ['Add space', 'Address', 'Attributes', 'Rate and Review', 'Submit'];

const AddSpace = ({ classes }) => {
  const [activeStep] = useState(0);
  const steps = getSteps();
  return (
    <div className={classes.stepperWrapper}>
      <Stepper activeStep={activeStep} connector={null}>
        {steps.map((label, index) => (
          <Step>
            {activeStep === index && (
              <StepLabel className={classes.stepLabel}>{label}</StepLabel>
            )}
            {activeStep !== index && <StepLabel className={classes.stepLabel} />}
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

AddSpace.prototypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(AddSpace);
