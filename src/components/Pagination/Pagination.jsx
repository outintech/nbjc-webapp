/* eslint-disable no-unused-vars */

import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Input from '@material-ui/core/Input';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
  mobilePrompt: {
    display: 'flex',
    flexGrow: 2,
    width: '100%',
    marginTop: '40px',
    color: '#666666',
    fontSize: '16px',
    flexDirection: 'column',
  },
  showingText: {
    flexGrow: 1,
    justifyContent: 'center',
    fontSize: '16px',
  },
  navigationContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    flex: 1,
  },
  mobileNavigationContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  paginationButton: {
    height: '28px',
    width: '28px',
    display: 'flex',
    justifyContent: 'center',
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
  mobilePaginationListContainer: {
    display: 'flex',
    marginTop: 44,
    justifyContent: 'center',
  },
  paginationLabel: {
    textDecoration: 'none',
    margin: '0 2px',
  },
  alignLabelAbsoluteCenter: {
    flex: 1,
  },
  expandNavigationButtons: {
    width: '32px',
    textAlign: 'center',
  },
  currentPageButton: {
    color: '#FFFFFF',
    backgroundColor: '#633AA3',
    borderRadius: '2px',
  },
});

const NextButton = ({ pageLink, classes }) => {
  const color = pageLink === undefined ? classes.inactiveColor : classes.activeColor;
  const removeUnderline = classes.paginationLabel;
  const nextClasses = `${color} ${removeUnderline} ${classes.expandNavigationButtons}`;
  return (
    <a href={pageLink} aria-label="Go next page" className={nextClasses}>
      {'>'}
    </a>
  );
};

const BackButton = ({ pageLink, classes }) => {
  const color = pageLink === undefined ? classes.inactiveColor : classes.activeColor;
  const removeUnderline = classes.paginationLabel;
  const backClasses = `${color} ${removeUnderline} ${classes.expandNavigationButtons}`;
  return (
    <a href={pageLink} aria-label="Go previous page" className={backClasses}>
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

const GoToPageButton = ({ goToPageLabel }) => {
  const onClick = null;
  return (
    <div>{goToPageLabel}</div>
  );
};

const PaginationButton = ({
  pageNumber,
  classes,
  goToPageLabel,
  currPage,
}) => {
  if (pageNumber === goToPageLabel) {
    return <GoToPageButton goToPageLabel={goToPageLabel} />;
  }
  const calculateLink = '/';
  const isCurrentPage = currPage === pageNumber ? classes.currentPageButton : '';
  const PaginationButtonClasses = `${classes.paginationLabel} ${isCurrentPage}`;
  return (
    <>
      <a href={calculateLink} aria-label={`Go to page ${pageNumber}`} className={PaginationButtonClasses}>
        <div className={classes.paginationButton}>
          <span>{pageNumber}</span>
        </div>
      </a>
    </>
  );
};

const RenderPaginationButtons = (
  {
    pagesToRender,
    classes,
    goToPageLabel,
    currPage,
  },
) => (
  pagesToRender.filter((page) => page !== null).map((page) => (
    <PaginationButton
      pageNumber={page}
      classes={classes}
      goToPageLabel={goToPageLabel}
      currPage={currPage}
    />
  ))
);

const Pagination = ({
  totalCount,
  page,
  perPage,
  classes,
}) => {
  const useDesktop = useMediaQuery('(min-width:838px)');
  const query = useQuery();
  const history = useHistory();
  const totalPages = Math.ceil(totalCount / perPage);
  let backButton;
  let backExists;
  let nextExists;
  let nextButton;

  const paginationListClasses = useDesktop
    ? classes.paginationListContainer : classes.mobilePaginationListContainer;
  const navigationContainerClasses = useDesktop
    ? classes.navigationContainer : classes.mobileNavigationContainer;
  const promptClasses = useDesktop ? classes.prompt : classes.mobilePrompt;

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
    const resultString = endingRange <= 1 ? 'Result' : 'Results';
    return `Showing ${startingRange} - ${endingRange} of ${totalCount} ${resultString}`;
  };

  const calculatePaginationMenu = () => {
    const pagesToRender = {
      prevPage: ((totalPages > 1 && page > 1) ? page - 1 : null),
      currPage: page,
      nextPage: ((page + 1 < totalPages) ? page + 1 : null),
      nextNextPage: ((page + 2 < totalPages) ? page + 2 : null),
      ellipsis: ((page + 3 <= totalPages) ? labelForGoToPage : null),
      lastPage: ((totalPages !== page) ? totalPages : null),
    };
    return Object.values(pagesToRender);
  };

  return (
    <div className={classes.root}>
      <div className={promptClasses}>
        <div className={classes.alignLabelAbsoluteCenter} />
        <div>
          <RangeOfResults
            totalCount={totalPages}
            classes={classes}
            calculateRange={CalculatePageRange()}
          />
        </div>
        <div className={navigationContainerClasses}>
          {(backExists || nextExists) && (
            <>
              <div className={paginationListClasses}>
                <BackButton pageLink={backButton} classes={classes} />
                <RenderPaginationButtons
                  pagesToRender={calculatePaginationMenu()}
                  classes={classes}
                  goToPageLabel={labelForGoToPage}
                  currPage={page}
                />
                <NextButton pageLink={nextButton} classes={classes} />
              </div>
              <GoToPage totalPages={totalPages} classes={classes} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

Pagination.defaultProps = {};

export default withStyles(styles)(Pagination);
