import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Card from '../../source/react/library/card/Card';

describe('<Card />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render a div by default', () => {
    expect(shallow(<Card>Card</Card>)).to.have.descendants('div');
  });

  it('should render as the element specified by the "as" prop', () => {
    expect(shallow(<Card as="span">Card</Card>)).to.have.descendants('span');

    const MyComponent = ({ ...props }) => <div {...props} />;

    expect(shallow(<Card as={MyComponent}>Card</Card>)).to.have.descendants(
      MyComponent,
    );
  });

  it('should propagate user supplied className', () => {
    expect(shallow(<Card className="my-class">Card</Card>)).to.have.className(
      'my-class',
    );
  });

  it('should respond to click events if onClick provided', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Card onClick={onClick} />);

    wrapper.simulate('click');

    // eslint-disable-next-line
    expect(onClick).to.have.been.called;
  });

  it('should accept a selectable prop', () => {
    const wrapper = shallow(<Card selectable />);

    expect(wrapper).to.have.className('rc-card-selectable');
  });

  it('should accept a selected prop', () => {
    const wrapper = shallow(<Card selectable selected />);

    expect(wrapper).to.have.className('rc-card-selected');
  });

  it('should render primary type by default', () => {
    const wrapper = shallow(<Card />);

    expect(wrapper).to.have.className('rc-card-primary');
  });

  it('should render secondary type if specified', () => {
    const wrapper = shallow(<Card type="secondary" />);

    expect(wrapper).to.have.className('rc-card-secondary');
  });

  it('should properly render provided children', () => {
    const wrapper = shallow(
      <Card>
        <span className="test-child">hello!</span>
      </Card>,
    );

    expect(wrapper.find('.test-child').length).to.eql(1);
  });

  it('should render elevation class for each allowed element elevation', () => {
    const elevations = [0, 50, 100, 150, 200, 400, 800];

    elevations.forEach((elevation) => {
      const wrapper = shallow(<Card elevation={elevation} />);

      expect(wrapper).to.have.className(`rc-card-elevation-${elevation}`);
    });
  });
});
