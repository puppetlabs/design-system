import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import SlideIn from '../library/SlideIn';
import Accordion from '../library/accordion/Accordion';
import AccordionItem from '../library/accordion/AccordionItem';
import Button from '../library/Button';
import ButtonGroup from '../library/ButtonGroup';

class SlideIns extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: null,
    };

    this.onRemove = this.onRemove.bind(this);
    this.onDisplay = this.onDisplay.bind(this);
  }

  onDisplay(active) {
    return () => this.setState({ active });
  }

  onRemove() {
    this.setState({ active: null });
  }

  renderMainSlideIn() {
    if (!this.state.active || this.state.active === 'accordion') {
      return null;
    }

    return (
      <SlideIn
        position={ this.state.active }
        onRemove={ this.onRemove }
        removeable
        onClose={ this.onRemove }
        onSubmit={ () => console.log('ok clicked') }
        title="I'm a slide in!"
      >
        Look at me go!
      </SlideIn>
    );
  }

  renderAccordionSlideIn() {
    let jsx;

    if (this.state.active === 'accordion') {
      jsx = (
        <SlideIn
          position="right"
          onRemove={ this.onRemove }
          removeable
          onClose={ this.onRemove }
          onSubmit={ () => console.log('ok clicked') }
          title="I'm a slide in!"
        >
          <Accordion autoOpen>
            <AccordionItem title="Section 1">
              I'm a happy section!
            </AccordionItem>
            <AccordionItem title="Section 2">
              I'm also happy, boi!
            </AccordionItem>
            <AccordionItem title="Section 3">
              <Button>also happy</Button>
            </AccordionItem>
          </Accordion>
        </SlideIn>
      );
    }

    return jsx;
  }

  render() {
    const mainSlideIn = this.renderMainSlideIn();
    const accordionSlideIn = this.renderAccordionSlideIn();

    return (
      <div>
        <h1>SlideIns</h1>
        <StyleguideSection title="SlideIns">
          <ButtonGroup>
            <Button label="Bottom" onClick={ this.onDisplay('bottom') } />
            <Button label="Top" onClick={ this.onDisplay('top') } />
            <Button label="Left" onClick={ this.onDisplay('left') } />
            <Button label="Right" onClick={ this.onDisplay('right') } />
            <Button label="With accordion" onClick={ this.onDisplay('accordion') } />
          </ButtonGroup>
        </StyleguideSection>
        { accordionSlideIn }
        { mainSlideIn }
      </div>
    );
  }
}

export default SlideIns;
