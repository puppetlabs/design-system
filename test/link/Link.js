import jsdom from 'mocha-jsdom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Link from '../../source/react/library/link/Link';

describe('<Link />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render without blowing up', () => {
    shallow(<Link href="/">Link</Link>);
  });

  it('should render an anchor by default', () => {
    expect(shallow(<Link href="/">Link</Link>)).to.have.descendants('a');
  });

  it('should render as the element specified by the "as" prop', () => {
    expect(shallow(<Link as="button">Link</Link>)).to.have.descendants(
      'button',
    );

    const MyComponent = ({ ...props }) => <div {...props} />;

    expect(shallow(<Link as={MyComponent}>Link</Link>)).to.have.descendants(
      MyComponent,
    );
  });

  it('should propagate user supplied className', () => {
    expect(
      shallow(
        <Link href="/" className="my-class">
          Link
        </Link>,
      ),
    ).to.have.className('my-class');
  });

  it('should propagate all unrelated props', () => {
    const extraProps = {
      data: 'hi',
      method() {},
    };
    expect(shallow(<Link {...extraProps}>Link</Link>)).to.have.props(
      extraProps,
    );
  });
});
