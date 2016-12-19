import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Progress from '../library/Progress';
import Button from '../library/Button';

class ProgressBars extends React.Component {
  constructor(props) {
    super(props);

    this.state = { steps: 6, active: 0 };

    this.onProgress = this.onProgress.bind(this);
  }

  onProgress() {
    const { steps, active } = this.state;
    const newActive = active === steps - 1 ? 0 : active + 1;

    this.setState({ active: newActive });
  }

  render() {
    return (
      <div className="sg-progress-bars">
        <h1>Progress bars</h1>
        <StyleguideSection title="Progress bar">
          <Progress steps={ this.state.steps } active={ this.state.active } width={ 600 } />
          <Button onClick={ this.onProgress }>Progress step</Button>
        </StyleguideSection>
      </div>
    );
  }
}

export default ProgressBars;
