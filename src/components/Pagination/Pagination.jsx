import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import useQuery from '../../hooks/useQuery';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 142,
  },
  prompt: {
    display: 'block',
    flexGrow: 2,
    width: '100%',
    marginTop: '30px',
    color: '#666666',
    fontSize: '16px',
  },
  button: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      marginTop: 40,
    },
    [theme.breakpoints.up('mobile')]: {
      width: 250,
      marginRight: 20,
      marginBottom: 50,
    },
  },
});

const Pagination = ({
  totalCount,
  page,
  perPage,
  classes,
}) => {
  const matches = useMediaQuery('(min-width:376px)');
  const query = useQuery();
  const history = useHistory();
  const totalPages = Math.ceil(totalCount / perPage);
  let backButton;
  let backExists;
  let nextExists;
  let nextButton;
  if (totalPages > 1 && page > 1) {
    const backLink = history.location.pathname;
    backExists = true;
    query.set('page', page - 1);
    query.set('perPage', perPage);
    backButton = (
      <Button
        variant="outlined"
        color="primary"
        align="center"
        fullWidth={!matches}
        href={`${backLink}?${query.toString()}`}
        className={classes.button}
        disableElevation
      >
        Previous
      </Button>
    );
  }
  if (totalPages > 1 && page < totalPages) {
    const nextLink = history.location.pathname;
    nextExists = true;
    query.set('page', page + 1);
    query.set('perPage', perPage);
    nextButton = (
      <Button
        variant="contained"
        color="primary"
        align="center"
        fullWidth={!matches}
        href={`${nextLink}?${query.toString()}`}
        className={classes.button}
        disableElevation
      >
        Next
      </Button>
    );
  }

  return (
    <div className={classes.root}>
      {(backExists || nextExists)
        && (
          <Typography variant="h5" align="center" className={classes.prompt}>
            {`Showing ${perPage} of ${totalCount} results`}
          </Typography>
        )}
      {backButton}
      {nextButton}
    </div>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};

Pagination.defaultProps = {};

export default withStyles(styles)(Pagination);
