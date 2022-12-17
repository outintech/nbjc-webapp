import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Input from '@material-ui/core/Input';

import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import useQuery from '../../hooks/useQuery';

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 100,
  },
  prompt: {
    display: 'flex',
    flexGrow: 2,
    width: '100%',
    marginTop: '40px',
    color: '#666666',
    fontSize: '16px',
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
  paginationButton: {
    height: '28px',
    width: '28px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 2px',
  },
  activeColor: {
    color: '#666666',
  },
  inactiveColor: {
    color: '#E5E5E5',
  },
  pageInputNavigation: {
    border: '1px solid #666666',
    width: '40px',
    borderRadius: '4px',
    height: '28px',
    marginLeft: '8px',
    backgroundColor: '#FFFFFF',
  },
  goToPageContainer: {
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
  paginationListContainer: {
    display: 'flex',
  },
});

const NextButton = ({ pageLink, classes }) => {
  const color = pageLink === '' ? classes.inactiveColor : classes.activeColor;
  return (
    <a href={pageLink} className={color}>
      {'>'}
    </a>
  );
};

const BackButton = ({ pageLink, classes }) => {
  const color = pageLink === '' ? [classes.inactiveColor] : [classes.activeColor];
  return (
    <a href={pageLink} className={color}>
      {'<'}
    </a>
  );
};

const GoToPage = ({ classes, totalPages }) => {
  const label = 'Go to page';
  return (
    <div className={classes.goToPageContainer}>
      <span>{label}</span>
      <Input
        inputProps={{ min: 1, max: totalPages, style: { textAlign: 'center' } }}
        defaultValue={totalPages}
        className={classes.pageInputNavigation}
      />
    </div>
  );
};

const RangeOfResults = ({ classes, totalCount, calculateRange }) => (
  (totalCount > 0)
  && (
    <Typography variant="h5" align="center" className={classes.showingText}>
      {calculateRange}
    </Typography>
  )
);

const PaginationButton = ({ pageNumber, classes, goToPageLabel }) => {
  if (pageNumber === goToPageLabel) {
    return <div>...</div>;
  }
  const calculateLink = '/';
  return (
    <>
      <a href={calculateLink} aria-label={`Go to page ${pageNumber}`}>
        <div className={classes.paginationButton}>
          <span>{pageNumber}</span>
        </div>
      </a>
    </>
  );
};

const RenderPaginationButtons = ({ pagesToRender, classes, goToPageLabel }) => (
  pagesToRender.filter((page) => page !== null).map((page) => (
    <PaginationButton pageNumber={page} classes={classes} goToPageLabel={goToPageLabel} />
  ))
);

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
  const labelForGoToPage = '...';
  if (totalPages > 1 && page > 1) {
    const backLink = history.location.pathname;
    backExists = true;
    query.set('page', page - 1);
    query.set('perPage', perPage);
    backButton = `${backLink}?${query.toString()}`;
  }
  if (totalPages > 1 && page < totalPages) {
    const nextLink = history.location.pathname;
    nextExists = true;
    query.set('page', page + 1);
    query.set('perPage', perPage);
    nextButton = `${nextLink}?${query.toString()}`;
  }

  const CalculatePageRange = () => {
    const startingRange = (page - 1) * perPage + 1;
    const endingRange = (page) * perPage < totalCount ? (page) * perPage : totalCount;
    return `Showing ${startingRange} - ${endingRange} of ${totalCount} results`;
  };

  const calculatePaginationMenu = () => {
    const pagesToRender = {
      prevPage: ((totalPages > 1 && page > 1) ? page - 1 : null),
      nextPage: ((page + 1 >= totalPages) ? page + 1 : null),
      nextNextPage: ((page + 2 === totalPages) ? page + 2 : null),
      ellipsis: ((page + 3 <= totalPages) ? labelForGoToPage : null),
      lastPage: ((totalPages !== page) ? totalPages : null),
    };
    return Object.values(pagesToRender);
  };

  return (
    <div className={classes.root}>
      <div className={classes.prompt}>
        <RangeOfResults
          totalCount={totalPages}
          classes={classes}
          calculateRange={CalculatePageRange()}
        />
        {(backExists || nextExists) && (
          <div className={classes.navigationContainer}>
            <div className={classes.paginationListContainer}>
              <BackButton pageLink={backButton} classes={classes} />
              <RenderPaginationButtons
                pagesToRender={calculatePaginationMenu()}
                classes={classes}
                goToPageLabel={labelForGoToPage}
              />
              <NextButton pageLink={nextButton} classes={classes} />
            </div>
            <GoToPage totalPages={totalPages} classes={classes} />
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
