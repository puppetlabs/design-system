import React from 'react';
import Input from '../library/Input';
import StyleguideSection from './partials/StyleguideSection';

const InputSmall = <Input size="small" placeholder="It was the best of times, it was the worst of times..." />;
const InputLarge = <Input size="large" placeholder="It was the best of times, it was the worst of times..." />;
const InputCheckbox = <Input type="checkbox" />;

class Forms extends React.Component {

  render() {
    return (
      <div>

        <StyleguideSection title="Input Small">
          { InputSmall }
        </StyleguideSection>
        <StyleguideSection title="Input Large">
          { InputLarge }
        </StyleguideSection>
        <StyleguideSection title="Input Checkbox">
          { InputCheckbox }
        </StyleguideSection>

      </div>
    );
  }
}

export default Forms;
