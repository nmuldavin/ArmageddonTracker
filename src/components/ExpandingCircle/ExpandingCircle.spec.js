import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ExpandingCircle from './ExpandingCircle';

describe('(Component) Expanding Circle', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ExpandingCircle />);
  });

  it('Should exist and render html', () => {
    expect(wrapper).to.exist;
    expect(wrapper.exists()).to.be.true;
  });
});
