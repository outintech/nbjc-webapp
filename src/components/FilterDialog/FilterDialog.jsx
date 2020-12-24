import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Dialog,
  Divider,
  IconButton,
  Slider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import StarRating from '../StarRating';
import PriceFilter from './PriceFilter';
import useFilters from './hooks/useFilters';

const styles = {
  toolbar: {
    justifyContent: 'flex-end',
  },
  dialogBody: {
    padding: '0 24px',
    marginBottom: 15,
  },
  section: {
    marginTop: 50,
  },
  distanceHeader: {
    display: 'inline',
    marginRight: 20,
  },
  slider: {
    marginTop: 40,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerButtons: {
    marginRight: 20,
  },
  // Desktop filters
  filterHeaderContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  filterHeaderItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '100%',
    textAlign: 'center',
  },
  filterContainer: {
    display: 'block',
  },
  filterItemsWrapper: {
    width: '100%',
    display: 'flex',
  },
  filterItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '100%',
    textAlign: 'center',
  },
};

const FilterDialog = ({
  open,
  onClose,
  classes,
  setFilters,
  defaultFilters,
  type,
}) => {
  const { state: { stars, price, distance }, dispatch } = useFilters(defaultFilters);
  const ratingText = `${stars} and above`;
  const priceFilters = [{
    label: '$',
    active: price === 1,
    value: 1,
  }, {
    label: '$$',
    active: price === 2,
    value: 2,
  }, {
    label: '$$$',
    active: price === 3,
    value: 3,
  }, {
    label: '$$$$',
    active: price === 4,
    value: 4,
  }];
  return (
    <>
      { type === 'desktop' && (
        <Accordion color="primary">
          <AccordionSummary className={classes.filterHeaderContainer}>
            <div className={classes.filterHeaderItem}>
              <Typography variant="allCaps">Distance</Typography>
              <Divider variant="vertical" flexItem />
            </div>
            <div className={classes.filterHeaderItem}>
              <Typography variant="allCaps">Price</Typography>
              <Divider variant="vertical" flexItem />
            </div>
            <div className={classes.filterHeaderItem}>
              <Typography variant="allCaps">Rating</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.filterContainer}>
            <div className={classes.filterItemsWrapper}>
              <div className={classes.filterItem}>
                <Slider
                  value={distance}
                  valueLabelDisplay="on"
                  className={classes.slider}
                  marks={[
                    { value: 0, label: '0' },
                    { value: 100, label: '100' },
                  ]}
                  onChangeCommitted={(_, value) => dispatch({ type: 'distance', payload: { distance: value } })}
                />
              </div>
              <div className={classes.filterItem}>
                <PriceFilter
                  filters={priceFilters}
                  onFilterClick={(i) => dispatch({ type: 'price', payload: { price: i } })}
                />
              </div>
              <div className={classes.filterItem}>
                <StarRating numberFilled={stars} onRatingChanged={(value) => dispatch({ type: 'stars', payload: { stars: value } })} />
              </div>
            </div>
            <div className={classes.footer}>
              <Button
                color="default"
                variant="outlined"
                disableElevation
                className={classes.footerButtons}
                onClick={() => {
                  dispatch({ type: 'reset' });
                  onClose();
                }}
              >
                <Typography variant="button" color="primary">Cancel</Typography>
              </Button>
              <Button
                color="secondary"
                variant="contained"
                disableElevation
                className={classes.footerButtons}
                onClick={() => {
                  setFilters({ stars, distance, price });
                  onClose();
                }}
              >
                <Typography variant="button" color="inherit">Apply</Typography>
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      )}
      { type === 'mobile' && (
        <Dialog fullScreen open={open} onClose={onClose}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <div className={classes.dialogBody}>
            <Typography variant="h5">Filter by</Typography>
            <div className={classes.section}>
              <Typography variant="h6">Average Rating</Typography>
              <StarRating numberFilled={stars} onRatingChanged={(value) => dispatch({ type: 'stars', payload: { stars: value } })} />
              <Typography variant="caption">{ratingText}</Typography>
            </div>
            <div className={classes.section}>
              <Typography variant="h6">Price</Typography>
              {/* make price list */}
              <PriceFilter
                filters={priceFilters}
                onFilterClick={(i) => dispatch({ type: 'price', payload: { price: i } })}
              />
            </div>
            <div className={classes.section}>
              <Typography variant="h6" className={classes.distanceHeader}>Distance</Typography>
              <Typography variant="caption">Number of miles away</Typography>
              <Slider
                value={distance}
                valueLabelDisplay="on"
                className={classes.slider}
                marks={[
                  { value: 0, label: '0' },
                  { value: 100, label: '100' },
                ]}
                onChangeCommitted={(_, value) => dispatch({ type: 'distance', payload: { distance: value } })}
              />
            </div>
          </div>
          <div className={classes.footer}>
            <Button
              color="default"
              variant="outlined"
              disableElevation
              className={classes.footerButtons}
              onClick={() => {
                dispatch({ type: 'reset' });
                onClose();
              }}
            >
              <Typography variant="button" color="primary">Cancel</Typography>
            </Button>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              className={classes.footerButtons}
              onClick={() => {
                setFilters({ stars, distance, price });
                onClose();
              }}
            >
              <Typography variant="button" color="inherit">Apply</Typography>
            </Button>
          </div>
        </Dialog>
      )}
    </>
  );
};

FilterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  setFilters: PropTypes.func,
  type: PropTypes.oneOf('desktop', 'mobile'),
  defaultFilters: PropTypes.shape({
    star: PropTypes.number,
    distance: PropTypes.number,
    price: PropTypes.number,
  }),
};

FilterDialog.defaultProps = {
  setFilters: () => {},
  defaultFilters: {},
  type: 'mobile',
};

export default withStyles(styles)(FilterDialog);
