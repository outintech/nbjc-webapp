import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Input from '@material-ui/core/Input';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography, Link } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

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
    height: '100%',

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
    marginTop: 8,
  },
  paginationListContainer: {
    display: 'flex',
  },
  mobilePaginationListContainer: {
    display: 'flex',
    marginTop: 0,
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
    width: '28px',
    textAlign: 'center',
  },
  currentPageButton: {
    color: '#FFFFFF',
    backgroundColor: '#633AA3',
    borderRadius: '2px',
    fontWeight: 500,
  },
  hideDisplay: {
    display: 'none',
  },
  buttonOpenGoToPage: {
    maxWidth: 28,
    maxHeight: 28,
    minWidth: 28,
    minHeight: 28,
    display: 'flex',
    justifyContent: 'center',
    margin: '0 2px',
  },
  goToPageLabel: {
    fontSize: 30,
    fontWeight: 700,
  },
  centerText: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const getPageLink = (history, query, perPage, page) => {
  const base = history.location.pathname;
  query.set('page', page);
  query.set('perPage', perPage);
  return `${base}?${query.toString()}`;
};

const NextButton = ({ pageLink, classes }) => {
  const color = pageLink === undefined ? classes.inactiveColor : classes.activeColor;
  const removeUnderline = classes.paginationLabel;
  const nextClasses = `${color} ${removeUnderline} ${classes.expandNavigationButtons}`;
  return (
    <Link href={pageLink} aria-label="Go next page" className={nextClasses} underline="none" data-testid="next-button-icon">
      <NavigateNextIcon className={classes.centerText} />
    </Link>
  );
};

const BackButton = ({ pageLink, classes }) => {
  const color = pageLink === undefined ? classes.inactiveColor : classes.activeColor;
  const removeUnderline = classes.paginationLabel;
  const backClasses = `${color} ${removeUnderline} ${classes.expandNavigationButtons}`;
  return (
    <Link href={pageLink} aria-label="Go previous page" className={backClasses} underline="none">
      <NavigateBeforeIcon className={classes.centerText} />
    </Link>
  );
};

const CheckValidPageNumber = (totalPages, input) => {
  if (typeof input !== 'string' && typeof input !== 'number') {
    return false;
  }
  const pageNum = Number(input);
  const checkValidType = Number.isInteger(pageNum);
  const checkValidRange = pageNum >= 1 && pageNum <= totalPages;
  if (checkValidType && checkValidRange) {
    return true;
  }
  return false;
};

const GoToPage = ({
  classes,
  totalPages,
  showButton,
  navigationObject,
}) => {
  const [input, setInput] = useState('');
  const label = 'Go to page';
  const ShowContent = showButton ? undefined : classes.hideDisplay;
  const GoToPageClasses = `${classes.goToPageContainer} ${ShowContent}`;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (CheckValidPageNumber(totalPages, input) === false) {
      return;
    }
    navigationObject.history.push(getPageLink(...Object.values(navigationObject), input));
    navigationObject.history.go(
      navigationObject.history.location.pathname + navigationObject.history.location.search,
    );
  };
  return (
    <div className={GoToPageClasses}>
      <form onSubmit={handleSubmit}>
        <span>{label}</span>
        <Input
          type="number"
          inputProps={{ min: 1, max: totalPages, style: { textAlign: 'center' } }}
          defaultValue={input}
          className={classes.pageInputNavigation}
          onChange={(event) => setInput(event.target.value)}
        />
      </form>
    </div>
  );
};

const RangeOfResults = (
  {
    classes, totalCount, calculateRange, desktopDimensions,
  },
) => {
  if (desktopDimensions === false) {
    return null;
  }
  return (
    (totalCount > 0) && (desktopDimensions)
    && (
      <Typography variant="h5" align="center" className={classes.showingText}>
        <span className={classes.centerText}>
          {calculateRange}
        </span>
      </Typography>
    )
  );
};

const OpenGoToPageButton = ({ goToPageLabel, setShowButton, classes }) => {
  const [toggle, setToggle] = useState(true);
  const GoToClasses = `${classes.activeColor} ${classes.buttonOpenGoToPage}`;
  return (
    <Button
      className={GoToClasses}
      onClick={() => {
        setToggle(!toggle);
        setShowButton(toggle);
      }}
    >
      <span className={classes.goToPageLabel}>
        {goToPageLabel}
      </span>
    </Button>
  );
};

const PaginationButton = ({
  pageNumber,
  classes,
  goToPageLabel,
  currPage,
  link,
  setShowButton,
}) => {
  if (pageNumber === goToPageLabel) {
    return (
      <OpenGoToPageButton
        goToPageLabel={goToPageLabel}
        setShowButton={setShowButton}
        classes={classes}
      />
    );
  }
  const isCurrentPage = currPage === pageNumber ? classes.currentPageButton : '';
  const PaginationButtonClasses = `${classes.paginationLabel} ${classes.activeColor} ${isCurrentPage}`;
  const PageNumberBox = (
    <div className={classes.paginationButton}>
      <span className={classes.centerText}>{pageNumber}</span>
    </div>
  );
  if (currPage === pageNumber) {
    return (
      <div className={PaginationButtonClasses} underline="none">
        {PageNumberBox}
      </div>
    );
  }
  return (
    <Link href={link} aria-label={`Go to page ${pageNumber}`} className={PaginationButtonClasses} underline="none">
      {PageNumberBox}
    </Link>
  );
};

const RenderPaginationButtons = (
  {
    pagesToRender,
    classes,
    goToPageLabel,
    currPage,
    setShowButton,
  },
) => (
  pagesToRender.map((page) => (
    <PaginationButton
      pageNumber={page.pageNumber}
      classes={classes}
      goToPageLabel={goToPageLabel}
      currPage={currPage}
      link={page.link}
      setShowButton={setShowButton}
      key={page.pageNumber}
    />
  ))
);

const calculatePaginationMenu = (totalPages, page, labelForGoToPage, history, query, perPage) => {
  let pagesToRender = {
    prevPage: ((totalPages > 1 && page > 1) ? page - 1 : null),
    currPage: page,
    nextPage: ((page + 1 < totalPages) ? page + 1 : null),
    nextNextPage: ((page + 2 < totalPages) ? page + 2 : null),
    ellipsis: ((page + 2 <= totalPages) ? labelForGoToPage : null),
    lastPage: ((totalPages !== page) ? totalPages : null),
  };
  pagesToRender = Object.values(pagesToRender).filter((pgNum) => pgNum !== null);
  const pagesWithLinks = pagesToRender.map((pg) => (
    { pageNumber: pg, link: getPageLink(history, query, perPage, pg) }
  ));
  return pagesWithLinks;
};

const CalculatePageRange = (page, perPage, totalCount) => {
  const startingRange = (page - 1) * perPage + 1;
  const endingRange = (page) * perPage < totalCount ? (page) * perPage : totalCount;
  const resultString = endingRange <= 1 ? 'Result' : 'Results';
  return `Showing ${startingRange} - ${endingRange} of ${totalCount} ${resultString}`;
};

const Pagination = ({
  totalCount,
  page,
  perPage,
  classes,
}) => {
  const useDesktop = useMediaQuery('(min-width:838px)');
  const [showButton, setShowButton] = useState(false);
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

  const navigationObject = {
    history, query, perPage,
  };

  return (
    <div className={classes.root}>
      <div className={promptClasses}>
        <div className={classes.alignLabelAbsoluteCenter} />
        <div>
          <RangeOfResults
            totalCount={totalPages}
            classes={classes}
            calculateRange={CalculatePageRange(page, perPage, totalCount)}
            desktopDimensions={useDesktop}
          />
        </div>
        <div className={navigationContainerClasses}>
          {(backExists || nextExists) && (
            <>
              <div className={paginationListClasses}>
                <BackButton pageLink={backButton} classes={classes} />
                <RenderPaginationButtons
                  pagesToRender={
                    calculatePaginationMenu(totalPages, page,
                      labelForGoToPage, history, query, perPage)
                  }
                  classes={classes}
                  goToPageLabel={labelForGoToPage}
                  currPage={page}
                  setShowButton={setShowButton}
                />
                <NextButton pageLink={nextButton} classes={classes} />
              </div>
              <GoToPage
                totalPages={totalPages}
                classes={classes}
                showButton={showButton}
                navigationObject={navigationObject}
              />
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

// eslint-disable-next-line import/no-mutable-exports
export let Tests = {
  getPageLink,
  NextButton,
  BackButton,
  CheckValidPageNumber,
  GoToPage,
  RangeOfResults,
  OpenGoToPageButton,
  PaginationButton,
  RenderPaginationButtons,
  calculatePaginationMenu,
  CalculatePageRange,
};

if (process.env.NODE_ENV !== 'test') {
  Tests = undefined;
}
