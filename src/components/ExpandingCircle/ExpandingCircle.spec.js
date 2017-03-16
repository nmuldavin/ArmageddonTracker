import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ExpandingCircle from './ExpandingCircle';
import styles from './ExpandingCircle.scss';

describe('(Component) Expanding Circle', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ExpandingCircle />);
  });

  it('Should exist and render html', () => {
    expect(wrapper).to.exist;
    expect(wrapper.exists()).to.be.true;
  });

  it('Should have three main content areas', () => {
    expect(wrapper.children().length).to.eql(3);
  });

  it('Should have a top content area with class .topContent', () => {
    expect(wrapper.find(`.${styles.topContent}`)).to.exist;
  });

  it('Should have a mid content are with class .midContent', () => {
    expect(wrapper.find(`.${styles.midContent}`)).to.exist;
  });

  it('Should have a bottom content are with class .bottomContent', () => {
    expect(wrapper.find(`.${styles.bottomContent}`)).to.exist;
  });
});
