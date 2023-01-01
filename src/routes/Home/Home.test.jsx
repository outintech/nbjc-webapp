import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import BlurLinearIcon from '@material-ui/icons/BlurLinearRounded';

import { Tests } from './Home';

const {
  ParentRowContainer,
  ButtonComponent,
  RowTextContent,
  AddASpaceButton,
  ButtonRow,
} = Tests;

const itShouldRenderComponent = (Component, props) => {
  it('It should render the component and match snapshot', () => {
    const component = renderer.create(<Component {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
};

describe('Home Route', () => {
  describe('ButtonComponent', () => {
    const buttonComponentTestProps = {
      classes: {},
      hrefString: '/profile',
      buttonLabel: 'Profile',
    };
    itShouldRenderComponent(ButtonComponent, buttonComponentTestProps);
    it("It should render the button's label", () => {
      render(<ButtonComponent {...buttonComponentTestProps} />);
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });
    it('It should have the correct href value', async () => {
      render(
        <ButtonComponent {...buttonComponentTestProps} />,
      );
      const Button = screen.getByText('Profile');
      expect(Button.hasAttribute('href', '/profile'));
    });
  });

  describe('RowTextContent', () => {
    const rowTextContentTestProps = {
      classes: {},
      titleString: 'Diamonds, an analysis on long-term value',
      bodyString: 'Gemstones have no universally accepted grading system. Diamonds are graded using a system developed by the Gemological Institute of America (GIA) in the early 1950s',
      alignDirection: 'center',
    };
    itShouldRenderComponent(RowTextContent, rowTextContentTestProps);
    it('It should have default alignDirection', () => {
      expect(RowTextContent.defaultProps.alignDirection).toBeDefined();
    });
    it('It should have a default value of left for alignDirection', () => {
      const defaultValue = RowTextContent.defaultProps.alignDirection;
      expect(defaultValue).toBe('left');
    });
    it('It should render the correct title', () => {
      render(<RowTextContent {...rowTextContentTestProps} />);
      const titleElement = screen.getByTestId('row-title');
      expect(titleElement.textContent).toBe('Diamonds, an analysis on long-term value');
    });
    it('It should render the correct body', () => {
      render(<RowTextContent {...rowTextContentTestProps} />);
      const bodyElement = screen.getByTestId('row-body');
      expect(bodyElement.textContent).toBe('Gemstones have no universally accepted grading system. Diamonds are graded using a system developed by the Gemological Institute of America (GIA) in the early 1950s');
    });
    it('It should contain an h2 element', () => {
      render(<RowTextContent {...rowTextContentTestProps} />);
      expect(document.querySelector('h2')).toBeInTheDocument();
    });
  });

  describe('Add a Space Button', () => {
    itShouldRenderComponent(AddASpaceButton);
    it('It should have the correct href value', () => {
      render(<AddASpaceButton />);
      const button = screen.getByTestId('add-space-button');
      expect(button).toHaveAttribute('href', '/spaces/new');
    });
    it('It should have the correct label', () => {
      render(<AddASpaceButton />);
      const button = screen.getByTestId('add-space-button');
      expect(button.textContent).toBe('Add a Space');
    });
  });

  describe('Button Row', () => {
    const history = createMemoryHistory();
    const handleClick = (event, param) => {
      history.push({
        pathname: '/search/results',
        search: `?searchTerm=&category=&location=${param}`,
      });
    };
    const buttonRowTestProps = {
      classes: {},
      buttonSet: [
        { name: 'NYC', icon: <BlurLinearIcon />, search: 'New York City, NY' },
        { name: 'Atlanta', icon: <BlurLinearIcon />, search: 'Atlanta, GA' },
      ],
      handleClick,
    };
    itShouldRenderComponent(ButtonRow, buttonRowTestProps);
    it('It should render the same # of buttons as the length of array of button objects passed in', async () => {
      render(<ButtonRow {...buttonRowTestProps} />);
      const buttons = await screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });
    it('It should render the different # of buttons with more button props', async () => {
      const moreButtonsProps = {
        classes: {},
        buttonSet: [
          { name: 'NYC', icon: <BlurLinearIcon />, search: 'New York City, NY' },
          { name: 'San Diego', icon: <BlurLinearIcon />, search: 'San Diego, CA' },
          { name: 'Phoenix', icon: <BlurLinearIcon />, search: 'Phoenix, AZ' },
        ],
        handleClick,
      };
      render(<ButtonRow {...moreButtonsProps} />);
      const buttons = await screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });
    it('It should navigate to the correct path on click', () => {
      render(
        <Router history={history}>
          <ButtonRow {...buttonRowTestProps} />
        </Router>,
      );
      const button = screen.getByText('Atlanta');
      expect(button).toBeInTheDocument();
      expect(history.location.pathname).toBe('/');

      userEvent.click(button);
      expect(history.length).toBe(2);
      expect(history.location.pathname).toBe('/search/results');
    });
    it('It should have the correct label', () => {
      render(<ButtonRow {...buttonRowTestProps} />);
      expect(screen.getByText('NYC')).toBeInTheDocument();
    });
    it('It should have the correct label for the other button as well', () => {
      render(<ButtonRow {...buttonRowTestProps} />);
      expect(screen.getByText('Atlanta')).toBeInTheDocument();
    });
  });

  describe('ParentRowContainer', () => {
    const placeHolderImage = 'http://placekitten.com/200/300';
    const emptyProps = {
      classes: {},
      rowObject: {
        title: 'The most common way of measuring wind force is with the Beaufort scale',
        imageUrl: placeHolderImage,
        imageAltText: 'beaufort-image',
      },
    };
    it('It should not render any buttons with an empty buttonRowSet props passed in', async () => {
      render(<ParentRowContainer {...emptyProps} />);
      const buttons = await screen.queryAllByRole('button');
      expect(buttons).toHaveLength(0);
    });
    it('It should render buttons with buttonRowSet props passed in', () => {
      const locationButtons = [
        { name: 'NYC', icon: <BlurLinearIcon />, search: 'New York City, NY' },
        { name: 'Atlanta', icon: <BlurLinearIcon />, search: 'Atlanta, GA' },
      ];
      const buttonFunction = () => (
        <ButtonRow classes={{}} handleClick={null} buttonSet={locationButtons} />
      );
      const emptyPropsWithButtons = {
        classes: {},
        rowObject: { ...emptyProps.rowObject, buttonRowFunction: buttonFunction },
      };
      render(<ParentRowContainer {...emptyPropsWithButtons} />);

      const buttons = screen.getAllByRole('button');

      expect(buttons).toHaveLength(2);
    });
    it('It should not render any body text with no body props passed in', async () => {
      render(<ParentRowContainer {...emptyProps} />);
      const body = await screen.queryByText(
        'The formula for calculating wind on the Beaufort wind force scale is the following: v = 0.836 B3/2 m/s.',
      );
      expect(body).not.toBeInTheDocument();
    });
    it('It should render body text with body props passed in', () => {
      const emptyPropsWithBody = { classes: {}, rowObject: { ...emptyProps.rowObject, body: 'The formula for calculating wind on the Beaufort wind force scale is the following: v = 0.836 B3/2 m/s.' } };
      render(<ParentRowContainer {...emptyPropsWithBody} />);
      const body = screen.getByText(
        'The formula for calculating wind on the Beaufort wind force scale is the following: v = 0.836 B3/2 m/s.',
      );
      expect(body).toBeInTheDocument();
    });
    it('It should render the correct image', () => {
      render(<ParentRowContainer {...emptyProps} />);
      const image = screen.getByAltText('beaufort-image');
      expect(image.src).toContain(placeHolderImage);
    });
    it('It should have the correct alt text for the rendered image', () => {
      render(<ParentRowContainer {...emptyProps} />);
      const image = screen.getByAltText('beaufort-image');
      expect(image).toBeInTheDocument();
    });
    it('It should render the correct title', () => {
      render(<ParentRowContainer {...emptyProps} />);
      const title = screen.getByText('The most common way of measuring wind force is with the Beaufort scale');
      expect(title).toBeInTheDocument();
    });
  });
});
