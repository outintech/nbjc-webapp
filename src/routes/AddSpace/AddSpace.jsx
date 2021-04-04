import React, {
  useState,
  useContext,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { usePromiseTracker } from 'react-promise-tracker';

import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import {
  postYelpSearch,
  postAddSpace,
  getAllIndicators,
} from '../../api';

import { UserContext } from '../../context/UserContext';
import withUser from '../AuthenticatedRoute';

import {
  AddSpaceSearch,
  AddSpaceAddress,
  AddSpaceAttributes,
  AddSpaceReview,
  AddSpaceSubmit,
  AddSpaceSuccess,
} from '../../components/AddSpacePage';

import ErrorSnackbar from '../../components/ErrorSnackbar';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      margin: '0 20px',
    },
    [theme.breakpoints.up('mobile')]: {
      margin: '0 100px',
    },
  },
  stepper: {
    justifyContent: 'center',
    paddingTop: 0,
  },
  step: {
    cursor: 'pointer',
  },
  stepLabel: {
    '& .MuiStepLabel-label.MuiStepLabel-active': {
      color: theme.palette.primary.main,
    },
    '& .MuiStepIcon-root': {
      width: 30,
      height: 30,
      [theme.breakpoints.up('mobile')]: {
        width: 50,
        height: 50,
      },
    },
  },
  successButton: {
    [theme.breakpoints.up('mobile')]: {
      width: 254,
    },
    margin: '0 auto',
  },
});

const getStepContent = (step, {
  onBack,
  onNext,
  onSubmit,
  disableNext,
}, formValues, indicators, classes) => {
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
          businessList={formValues.yelpBusinessResponses}
          onBack={onBack}
          onNext={onNext}
          addSpaceProps={formValues}
        />
      );
    case 2:
      return (
        <AddSpaceAttributes
          chips={indicators}
          onBack={onBack}
          onNext={onNext}
          addSpaceProps={formValues}
        />
      );
    case 3:
      return <AddSpaceReview onBack={onBack} onNext={onNext} addSpaceProps={formValues} />;
    case 4:
      return (
        <AddSpaceSubmit
          onBack={onBack}
          onSubmit={onSubmit}
          addSpaceProps={formValues}
        />
      );
    case 5:
      return (
        <AddSpaceSuccess
          primaryButton={(isDesktop) => (
            <Button
              variant="contained"
              align="center"
              fullWidth={!isDesktop}
              href="/spaces/new"
              color="primary"
              className={classes.successButton}
              disableElevation
            >
              Add another space
            </Button>
          )}
        />
      );
    default:
      return 'Unknown step';
  }
};

const getSteps = () => ['Add space', 'Address', 'Attributes', 'Rate and Review', 'Submit'];

const AddSpace = ({ classes }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [businessSearch, setBusinessSearch] = useState(undefined);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [indicators, setIndicators] = useState([]);
  const { promiseInProgress } = usePromiseTracker();
  const { user } = useContext(UserContext);

  const steps = getSteps();

  useEffect(() => {
    async function fetchYelpResults() {
      const results = await postYelpSearch({
        ...businessSearch,
        user,
      });
      setFormValues({
        ...formValues,
        ...businessSearch,
        yelpBusinessResponses: results.data,
      });
      setActiveStep(activeStep + 1);
    }

    if (!businessSearch) {
      return;
    }
    try {
      fetchYelpResults();
    } catch (e) {
      setSnackbarOpen(true);
    }
  }, [businessSearch]);

  useEffect(() => {
    async function fetchData() {
      const results = await getAllIndicators();
      setIndicators(results);
    }
    fetchData();
  }, []);
  const onNext = (data) => {
    if (activeStep === 0) {
      if (data && data.name === 'error') {
        setSnackbarOpen(true);
        return;
      }
      setBusinessSearch(data);
    } else {
      setFormValues({
        ...formValues,
        ...data,
      });
      setActiveStep(activeStep + 1);
    }
  };
  const [spaceSubmitStatus, setSpaceSubmitStatus] = useState();
  useEffect(() => {
    async function postSpaceData() {
      await postAddSpace({ ...formValues, user });
      setActiveStep(5);
    }
    if (spaceSubmitStatus) {
      try {
        postSpaceData();
      } catch (e) {
        setSnackbarOpen(true);
      }
    }
  }, [spaceSubmitStatus]);
  const onSubmit = () => {
    setSpaceSubmitStatus(true);
  };

  const stepProps = {
    onBack: (step) => {
      if (step > -1 && step < 6) {
        return setActiveStep(step);
      }
      return setActiveStep(activeStep - 1);
    },
    onNext,
    onSubmit,
    disableNext: snackbarOpen,
    loading: promiseInProgress
      || (businessSearch && !formValues.yelpBusinessResponses)
      || indicators.length === 0
      || (spaceSubmitStatus && activeStep !== 5),
  };

  return (
    <div className={classes.root}>
      {activeStep !== 5 && (
        <Stepper
          activeStep={activeStep}
          connector={null}
          className={classes.stepper}
        >
          {steps.map((label, index) => (
            <Step
              color="primary"
              key={label}
              onClick={() => {
                if (index < activeStep && activeStep !== 5) {
                  setActiveStep(index);
                }
              }}
              className={classes.step}
            >
              {activeStep === index && (
                <StepLabel className={classes.stepLabel}>
                  {label}
                </StepLabel>
              )}
              {activeStep !== index && (
                <StepLabel className={classes.stepLabel} />
              )}
            </Step>
          ))}
        </Stepper>
      )}
      {!stepProps.loading && (
        <div>{getStepContent(activeStep, stepProps, formValues, indicators, classes)}</div>
      )}
      {stepProps.loading && <CircularProgress color="secondary" />}
      <ErrorSnackbar
        snackbarOpen={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        body="We could not find the space. Please try again or contact Support."
      />
    </div>
  );
};

AddSpace.prototypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withUser(withStyles(styles)(AddSpace));
