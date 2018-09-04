import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Text from '../../source/react/library/text/Text';

describe('<Text />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render without blowing up', () => {
    shallow(<Text>Text</Text>);
  });

  it('should render a div by default', () => {
    expect(shallow(<Text>Text</Text>)).to.have.descendants('div');
  });

  it('should render as the element specified by the "as" prop', () => {
    expect(shallow(<Text as="span">Text</Text>)).to.have.descendants('span');

    const MyComponent = ({ ...props }) => <div {...props} />;

    expect(shallow(<Text as={MyComponent}>Text</Text>)).to.have.descendants(
      MyComponent,
    );
  });

  it('should propagate user supplied className', () => {
    expect(shallow(<Text className="my-class">Text</Text>)).to.have.className(
      'my-class',
    );
  });

  it('should propagate all unrelated props', () => {
    const extraProps = {
      data: 'hi',
      method() {},
    };
    expect(shallow(<Text {...extraProps}>Text</Text>)).to.have.props(
      extraProps,
    );
  });
});
