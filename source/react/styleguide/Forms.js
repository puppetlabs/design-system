import React from 'react';
import Input from '../library/Input';
import Filter from '../library/Filter';
import StyleguideSection from './partials/StyleguideSection';

const InputSmall = <Input size="small" placeholder="It was the best of times, it was the worst of times..." />;
const InputLarge = <Input size="large" placeholder="It was the best of times, it was the worst of times..." />;
const InputCheckbox = <Input type="checkbox" />;

const fields = [
  { value: 'Total Sales', label: 'Total Sales', id: 0 },
  { value: 'Average Price', label: 'Average Price', id: 1 },
];
const onDelete = () => { console.log('Filter deleted'); };
const onDuplicate = () => { console.log('Filter duplicated'); };

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
        <StyleguideSection title="Filter Form">
          <Filter
            fields={ fields }
            onDelete={ onDelete }
            onDuplicate={ onDuplicate }
          />
        </StyleguideSection>

      </div>
    );
  }
}

export default Forms;
