import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import React from 'react';

import Alert from '../../source/react/library/alert/Alert';

describe('<Alert />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Alert />);

    expect(wrapper.length).to.eql(1);
  });

  it('applies provided classNames to the outer wrapper', () => {
    const className = 'foo';
    expect(shallow(<Alert className={className} />)).to.have.className(
      className,
    );
  });

  it('applies provided inline styles to the outer wrapper', () => {
    const style = { hidden: true };
    expect(shallow(<Alert style={style} />)).to.have.to.have.style(style);
  });

  it('should render the children provided', () => {
    const message = 'hello world!';
    expect(mount(<Alert>{message}</Alert>).find('Text')).to.have.text(message);
  });

  it('adds a new class for the designated type', () => {
    const success = 'success';
    const danger = 'danger';

    expect(
      shallow(<Alert type={success}>hello world!</Alert>),
    ).to.have.className(`rc-alert-${success}`);

    expect(
      shallow(<Alert type={danger}>hello world!</Alert>),
    ).to.have.className(`rc-alert-${danger}`);
  });

  it('adds a new class if elevated prop is provided', () => {
    expect(shallow(<Alert elevated>hello world!</Alert>)).to.have.className(
      `rc-alert-elevated`,
    );
  });

  it('should render a dismissal button if provided closeable prop', () => {
    const wrapper = mount(<Alert />);

    expect(wrapper.find('IconButton').exists()).to.equal(false);

    wrapper.setProps({ closeable: true });

    expect(wrapper.find('IconButton').exists()).to.equal(true);
  });

  it('should trigger onClose if dismissal button is clicked', () => {
    const onClose = sinon.spy();
    const wrapper = mount(<Alert closeable onClose={onClose} />);

    wrapper.find('IconButton').simulate('click');

    // eslint-disable-next-line
    expect(onClose).to.have.been.called;
  });
});
