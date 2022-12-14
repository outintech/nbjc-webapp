import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Input from '@material-ui/core/Input';

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
    marginTop: '40px',
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
    fontSize: '16px',
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
  pageInputNavigation: {
    border: '1px solid #666666',
    width: '40px',
    borderRadius: '4px',
    height: '28px',
    marginLeft: '8px',
    backgroundColor: '#FFFFFF',
  },
  pageInputContainer: {
    backgroundColor: '#F2F2F2',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '4px',
    width: '153px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
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
  } else {
    backButton = (
      <div className={classes.inactiveButton}>
        {'<'}
      </div>
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
  } else {
    nextButton = (
      <div className={classes.inactiveButton}>
        {'>'}
      </div>
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

  const calculatePageRange = () => {
    const startingRange = (page - 1) * perPage + 1;
    const endingRange = (page) * perPage < totalCount ? (page) * perPage : totalCount;
    return [startingRange, endingRange];
  };

  const calculatePaginationMenu = () => {
    const menu = [page];
    const nextPage = page + 1;
    const prevPage = page - 1;

    if ((totalPages > 1 && page > 1)) {
      menu.unshift(prevPage);
    }

    if ((totalPages > 1 && page < totalPages) === false) {
      return menu;
    }

    if (page + 2 <= totalPages) {
      // This should have the ... between those two
      return menu.concat([nextPage, totalPages]);
    }
    if (page + 2 > totalPages) {
      return menu.concat([nextPage]);
    }
    return menu.concat([nextPage, nextPage + 1]);
  };

  return (
    <div className={classes.root}>
      <div className={classes.prompt}>

        {(totalCount > 0)
          && (
            <Typography variant="h5" align="center" className={classes.showingText}>
              {`Showing ${calculatePageRange()[0]} - ${calculatePageRange()[1]} of ${totalCount} results`}
            </Typography>
          )}
        {(backExists || nextExists)
          && (
            <div className={classes.navigationContainer}>
              <div className={classes.paginationContainer}>
                <div className={classes.navigationButtonContainers}>
                  {backButton}
                </div>
                <div className={classes.paginationLinkContainers}>
                  {calculatePaginationMenu().map((pages) => (
                    paginationButton('/', pages, true)
                  ))}
                </div>
                <div className={classes.navigationContainer}>
                  {nextButton}
                </div>
              </div>
              <div className={classes.pageInputContainer}>
                <span>Go to page</span>
                <Input
                  inputProps={{ min: 1, max: totalPages, style: { textAlign: 'center' } }}
                  defaultValue={totalPages}
                  className={classes.pageInputNavigation}
                />
              </div>
            </div>
          )}
      </div>
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
