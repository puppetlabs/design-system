import { shallow } from 'enzyme';
import React from 'react';

import Input from '.';
import styles from './Input.css';

test('Applies the provided className to the outer label element', () => {
  shallow(<Input className="classy" id="id" label="label" />)
    .find('label')
    .should.have.className('classy');
});

test('Applies the provided inline styles to the outer label element', () => {
  shallow(<Input style={{ margin: 10 }} id="id" label="label" />)
    .find('label')
    .should.have.style('margin', '10px');
});

test('Passes through additional props to the inner input element', () => {
  const extraProps = {
    onChange() {},
    onInput() {},
  };

  shallow(<Input {...extraProps} id="id" label="label" />)
    .find('input')
    .should.have.props(extraProps);
});

test('Renders an error message for each entry in the errors prop', () => {
  const errors = ['error1', 'error2'];
  shallow(<Input errors={errors} id="id" label="label" />)
    .find(`.${styles.errorMessage}`)
    .forEach((errorMessage, index) =>
      errorMessage.should.have.text(errors[index]),
    );
});
