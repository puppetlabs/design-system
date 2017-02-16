import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import ColumnHeader from '../../source/react/library/table/ColumnHeader';

const key = 'uniqueKey';
const column = { displayName: 'foo', column: 'foo' };
const onClick = () => {};

describe('<ColumnHeader />', () => {
  jsdom();

  it('should render without blowing up', () => {
    const wrapper = shallow(<ColumnHeader
      key={ key }
      column={ column }
      onClick={ onClick }
    />);

    expect(wrapper.length).to.eql(1);
  });

  it('should repond to click events with onClick prop', () => {
    const onClickSpy = sinon.spy();

    const wrapper = shallow(<ColumnHeader
      key={ key }
      column={ column }
      onClick={ onClickSpy }
    />);

    wrapper.simulate('click', { preventDefault: () => { } });

    expect(onClickSpy.calledOnce).to.eql(true);
  });
});
