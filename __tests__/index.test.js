import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import App from '../pages/index';
import { Page } from '../pages/index';

describe('With Enzyme', () => {
  it('App shows "Calculadora CDB"', () => {
    const app = shallow(<App />);
    expect(app.text()).toEqual('<Header /><Page />');

    const page = shallow(<Page />);
    expect(page.find('h1').text()).toEqual('Calculadora CDB');
  })
})

describe('With Snapshot Testing', () => {
  it('App shows "Calculadora CDB"', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})