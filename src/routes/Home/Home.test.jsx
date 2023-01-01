/* eslint-disable */
import React from 'react';
import { getByTestId, getByText, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import Home from './Home';
import { Tests } from './Home';
const {
  ParentRowContainer,
  ButtonComponent,
  RowTextContent,
  QuickLocationButtons,
  QuickCategoryButtons,
  AddASpaceButton,
  ButtonRow,
} = Tests;

const itShouldRenderComponent = (Component, props) => {
  it("It should render the component and match snapshot", () => {
    const component = renderer.create(<Component {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
}

const itShouldRenderCorrectLabel = (props, label) => {
  it("It should render the button's label", () => {
    render(<ButtonComponent {...props} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });
};

const itShouldHaveCorrectHref = (props, label, path) => {
  it('It should have the correct href value', async () => {
    render(
      <ButtonComponent {...props} />
    );
    const Button = screen.getByText(label);
    expect(Button.hasAttribute('href', path));
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
    itShouldRenderCorrectLabel(buttonComponentTestProps, 'Profile');
    itShouldHaveCorrectHref(buttonComponentTestProps, 'Profile', '/profile');
  });

  describe('RowTextContent', () => {
    const rowTextContentTestProps = {
      classes: {},
      titleString: 'Diamonds, an analysis on long-term value',
      bodyString: 'Gemstones have no universally accepted grading system. Diamonds are graded using a system developed by the Gemological Institute of America (GIA) in the early 1950s',
      alignDirection: 'center',
    };
    itShouldRenderComponent(RowTextContent, rowTextContentTestProps);
    it("It should have default alignDirection", () => {
      expect(RowTextContent.defaultProps.alignDirection).toBeDefined();
    });
    it("It should have a default value of left for alignDirection", () => {
      const defaultValue = RowTextContent.defaultProps.alignDirection;
      expect(defaultValue).toBe('left');
    });
    it("It should render the correct title", () => {
      render(<RowTextContent {...rowTextContentTestProps} />)
      const titleElement = screen.getByTestId('row-title');
      expect(titleElement.textContent).toBe('Diamonds, an analysis on long-term value');
    });
    it("It should render the correct body", () => {
      render(<RowTextContent {...rowTextContentTestProps} />)
      const bodyElement = screen.getByTestId('row-body');
      expect(bodyElement.textContent).toBe('Gemstones have no universally accepted grading system. Diamonds are graded using a system developed by the Gemological Institute of America (GIA) in the early 1950s');
    });
    it("It should contain an h2 element", () => {
      render(<RowTextContent {...rowTextContentTestProps} />)
      expect(document.querySelector('h2')).toBeInTheDocument();
    })
  });

  describe('ParentRowContainer', () => {

  });

  describe('Add a Space Button', () => {
    it("It should have the correct href value", () => {
      render(<Home />);
      const button = screen.getByTestId('add-space-button');
      expect(button).toHaveAttribute('href', '/spaces/new');
    });
    it("It should have the correct label", () => {
      render(<Home />);
      const button = screen.getByTestId('add-space-button');
      expect(button.textContent).toBe("Add a Space");
    });
  });

  describe('Quick Location Buttons & Quick Category Buttons', () => {
    it('It should render an equal amount of buttons as the locationButton.length', () => {

    });
    it('It should correctly render the button label', () => {

    });
    it('It should query a search on spaces when the user clicks the button', () => {

    });
    it('It should correctly search the right query when clicked on', () => {

    });
    it('It should redirect the user to the correct path on click', () => {

    });
    it('It should render an icon with the label', () => {

    });
  });
});
