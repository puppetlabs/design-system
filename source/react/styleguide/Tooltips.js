import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Button from '../library/Button';
import { TooltipHoverArea } from '../library/tooltips/Tooltip';

class Tooltips extends React.Component {
  constructor(props) {
    super(props);

    this.state = { anchor: 'right' };

    this.toggleAnchor = this.toggleAnchor.bind(this);
  }

  toggleAnchor() {
    const newAnchor = this.state.anchor === 'right' ? 'bottom' : 'right';

    this.setState({ anchor: newAnchor });
  }

  render() {
    const tooltip = <span>I'm the tooltip body!</span>;

    return (
      <div>
        <h1>Tooltips</h1>
        <StyleguideSection title="Button inside TooltipHoverArea">
          <TooltipHoverArea tooltip={ tooltip } anchor={ this.state.anchor }>
            <Button onClick={ this.toggleAnchor }>
              Click me to toggle tooltip anchor
            </Button>
          </TooltipHoverArea>

          <br />

          <TooltipHoverArea tooltip={ tooltip } anchor={ this.state.anchor }>
            <img src="http://i.giphy.com/10kABVanhwykJW.gif"></img>
          </TooltipHoverArea>
        </StyleguideSection>
      </div>
    );
  }
}

export default Tooltips;
