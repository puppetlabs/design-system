import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Copy from '../../source/react/library/copy/Copy';
import Text from '../../source/react/library/text/Text';

describe('<Copy />', () => {
  jsdom({ skipWindowCheck: true });
  const writeToClipboard = sinon.spy();

  it('should render the child text node by default', () => {
    expect(shallow(<Copy>Copyable text</Copy>)).to.have.text('Copyable text');
  });

  it('should propagate user supplied className', () => {
    expect(shallow(<Copy className="my-class">Copy</Copy>)).to.have.className(
      'my-class',
    );
  });

  it('should render a child React element and text', () => {
    expect(
      shallow(
        <Copy>
          <Text>Child element with Text component</Text>
        </Copy>,
      ),
    ).to.contain(<Text>Child element with Text component</Text>);
  });

  it('should return null if child element does not contain a text node', () => {
    expect(
      shallow(
        <Copy>
          <Text>
            <Text>Too deeply nested</Text>
          </Text>
        </Copy>,
      ),
    ).to.be.blank();
  });

  it('should copy to clipboard on button click', async () => {
    const wrapper = mount(
      <Copy writeToClipboard={writeToClipboard}>Text to copy</Copy>,
    );

    wrapper.find('button').simulate('click');
    // FIXME? Is there a cleaner way to test an async component method?
    await new Promise((res) => setTimeout(res, 1));

    expect(writeToClipboard).to.have.been.calledWith('Text to copy');
  });

  it('should copy child React element text to clipboard', async () => {
    const wrapper = mount(
      <Copy writeToClipboard={writeToClipboard}>
        <Text>Text to copy</Text>
      </Copy>,
    );

    wrapper.find('button').simulate('click');
    await new Promise((res) => setTimeout(res, 1));

    expect(writeToClipboard).to.have.been.calledWith('Text to copy');
  });

  it('should call the provided callback on button click', async () => {
    const copyCallback = sinon.spy();
    const wrapper = mount(
      <Copy onCopy={copyCallback} writeToClipboard={writeToClipboard}>
        Text to copy
      </Copy>,
    );

    wrapper.find('button').simulate('click');
    await new Promise((res) => setTimeout(res, 1));

    expect(copyCallback).to.have.been.calledWith('Text to copy');
  });

  it('should call the provided error callback if copy click handler throws an error', async () => {
    const copyError = sinon.spy();
    const throwError = () => {
      throw new Error('click-to-copy failed');
    };

    const wrapper = mount(
      <Copy onCopyError={copyError} writeToClipboard={throwError}>
        Text to copy
      </Copy>,
    );

    wrapper.find('button').simulate('click');
    await new Promise((res) => setTimeout(res, 1));

    expect(copyError).to.have.been.calledWith('Text to copy');
  });

  it('should accept a value prop', async () => {
    const wrapper = mount(
      <Copy value="Text to copy" writeToClipboard={writeToClipboard}>
        A different value to render
      </Copy>,
    );

    wrapper.find('button').simulate('click');
    await new Promise((res) => setTimeout(res, 1));

    expect(wrapper.text()).to.equal('A different value to render');
    expect(writeToClipboard).to.have.been.calledWith('Text to copy');
  });

  it('should accept a value prop on a child React element', async () => {
    const wrapper = mount(
      <Copy writeToClipboard={writeToClipboard}>
        <Text value="Text to copy">A different value to render</Text>
      </Copy>,
    );

    wrapper.find('button').simulate('click');
    await new Promise((res) => setTimeout(res, 1));

    expect(wrapper.text()).to.equal('A different value to render');
    expect(writeToClipboard).to.have.been.calledWith('Text to copy');
  });
});
