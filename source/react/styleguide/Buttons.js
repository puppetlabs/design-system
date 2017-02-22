import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Button from '../library/Button';
import SplitButton from '../library/SplitButton';
import ButtonGroup from '../library/ButtonGroup';

class Buttons extends React.Component {
  constructor(props) {
    super(props);

    this.onSplitButtonClick = this.onSplitButtonClick.bind(this);
  }

  onSplitButtonClick(item) {
    console.log(item);
  }

  render() {
    const splitButtonOptions = [
      { value: 'I\'m a test value!', id: 0 },
      { value: 'Me too!', id: 1 },
      { value: 'Me three...', id: 2 },
    ];

    return (
      <div>
        <h1>Buttons</h1>
        <StyleguideSection title="Default Buttons">
          <Button label="default" />
          <Button disabled label="disabled" />
          <Button disabled processing label="processing" />
        </StyleguideSection>
        <StyleguideSection title="Secondary Buttons">
          <Button secondary label="default" />
          <Button secondary disabled label="disabled" />
          <Button secondary disabled processing label="processing" />
        </StyleguideSection>
        <StyleguideSection title="Transparent Buttons">
          <Button transparent label="default" />
          <Button transparent disabled label="disabled" />
          <Button transparent disabled processing label="processing" />
        </StyleguideSection>
        <StyleguideSection title="Buttons With Badge">
          <Button badge label="default" />
          <Button badge disabled label="disabled" />
          <Button badge disabled processing label="processing" />
        </StyleguideSection>
        <StyleguideSection title="Button Groups">
          <ButtonGroup>
            <Button label="default" />
            <Button secondary label="secondary" />
          </ButtonGroup>
        </StyleguideSection>
        <StyleguideSection title="Floating Action Buttons">
          <Button floating />
          <Button floating disabled />
        </StyleguideSection>
        <StyleguideSection title="Split button">
          <SplitButton
            onOptionClick={ this.onSplitButtonClick }
            onClick={ this.onSplitButtonClick }
            options={ splitButtonOptions }
            label="I'm a split button!"
          />
          <SplitButton
            disabled
            disabledMenu
            onOptionClick={ this.onSplitButtonClick }
            onClick={ this.onSplitButtonClick }
            options={ splitButtonOptions }
            label="I'm a split button!"
          />
        </StyleguideSection>
        <StyleguideSection title="Split button (no portal)">
          <SplitButton
            onOptionClick={ this.onSplitButtonClick }
            onClick={ this.onSplitButtonClick }
            options={ splitButtonOptions }
            disablePortal
            label="I'm a split button!"
          />
          <SplitButton
            disabled
            disabledMenu
            disablePortal
            onOptionClick={ this.onSplitButtonClick }
            onClick={ this.onSplitButtonClick }
            options={ splitButtonOptions }
            label="I'm a split button!"
          />
        </StyleguideSection>
        <StyleguideSection title="Split button sizes">
          <SplitButton
            size="small"
            onOptionClick={ this.onSplitButtonClick }
            onClick={ this.onSplitButtonClick }
            options={ splitButtonOptions }
            label="I'm a split button!"
          />
          <br />
          <SplitButton
            size="tiny"
            onOptionClick={ this.onSplitButtonClick }
            onClick={ this.onSplitButtonClick }
            options={ splitButtonOptions }
            label="I'm a split button!"
          />
        </StyleguideSection>
      </div>
    );
  }
}

export default Buttons;
