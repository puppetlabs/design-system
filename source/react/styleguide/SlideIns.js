import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import SlideIn from '../library/SlideIn';
import Button from '../library/Button';
import SplitButton from '../library/SplitButton';
import ButtonGroup from '../library/ButtonGroup';

class SlideIns extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: null
    };
  }

  onBottomClick() {
    this.setState({ position: 'bottom' });
  }

  onTopClick() {
    this.setState({ position: 'top' });
  }

  onLeftClick() {
    this.setState({ position: 'left' });
  }

  onRightClick() {
    this.setState({ position: 'right' });
  }

  onRemove() {
    this.setState({position: null});
  }

  renderSlideIn() {
    if (!this.state.position) {
      return;
    }

    return (
      <SlideIn
        position={this.state.position}
        onRemove={this.onRemove.bind(this)}
        removeable
        onClose={this.onRemove.bind(this)}
        onSubmit={() => console.log('ok clicked')}
        title="I'm a slide in!"
        >
        Look at my go!
      </SlideIn>
    );
  }

  render() {
    return (
      <div>
        <h1>SlideIns</h1>
        <StyleguideSection title="SlideIns">
          <Button label="Bottom" onClick={this.onBottomClick.bind(this)} />
          <Button label="Top" onClick={this.onTopClick.bind(this)} />
          <Button label="Left" onClick={this.onLeftClick.bind(this)} />
          <Button label="Right" onClick={this.onRightClick.bind(this)} />
        </StyleguideSection>
        {this.renderSlideIn()}
      </div>
    );
  }
}

export default SlideIns;
