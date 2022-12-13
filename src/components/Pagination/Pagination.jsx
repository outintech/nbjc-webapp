import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import useQuery from '../../hooks/useQuery';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 142,
    marginBottom: 40,
  },
  prompt: {
    display: 'flex',
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
  showingText: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  navigationContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  paginationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    whiteSpace: 'no wrap',
  },
  paginationLinkContainers: {
    display: 'flex',
    alignItems: 'center',
    height: '30px',
    justifyContent: 'center',
    minWidth: '20px',
  },
  paginationLink: {
    padding: '0.6px',
  },
  paginationButton: {
    backgroundColor: '#633AA3',
    height: '28px',
    width: '28px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 2px',
  },
  activeButton: {
    backgroundColor: '#633AA3',
    color: '#FFFFFF',
  },
  inactiveButton: {
    color: '#666666',
  },
});

const Pagination = ({
  totalCount,
  page,
  perPage,
  classes,
}) => {
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
      <a href={`${backLink}?${query.toString()}`}>
        {'<'}
      </a>
    );
  }
  if (totalPages > 1 && page < totalPages) {
    const nextLink = history.location.pathname;
    nextExists = true;
    query.set('page', page + 1);
    query.set('perPage', perPage);
    nextButton = (
      <a href={`${nextLink}?${query.toString()}`}>
        {'>'}
      </a>
    );
  }

  const paginationButton = (link, pageNumber, isActive) => (
    <a href={link} className={classes.paginationLinkContainers}>
      <div>
        <span className={[
          classes.paginationButton,
          isActive ? classes.inactiveButton : classes.activeButton]}
        >
          {pageNumber}
        </span>
      </div>
    </a>
  );

  return (
    <div className={classes.root}>
      {(backExists || nextExists)
        && (
          <div className={classes.prompt}>
            <Typography variant="h5" align="center" className={classes.showingText}>
              {`Showing ${perPage} of ${totalCount} results`}
            </Typography>
            <div className={classes.navigationContainer}>
              <div className={classes.paginationContainer}>
                <div className={classes.navigationButtonContainers}>
                  {backButton}
                </div>
                <div className={classes.paginationLinkContainers}>
                  {paginationButton('/', 1, true)}
                  {paginationButton('/', 2, false)}
                </div>
                <div className={classes.navigationContainer}>
                  {nextButton}
                </div>
              </div>
              <div>
                Go to X page here
              </div>
            </div>
          </div>
        )}
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
