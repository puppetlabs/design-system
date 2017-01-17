import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Button from '../library/Button';
import { TooltipHoverArea } from '../library/tooltip/Tooltip';

const Tooltips = () => {
  const tooltip = <span>I'm the tooltip body!</span>

  return (
    <div>
      <h1>Tooltips</h1>
      <StyleguideSection title="Button inside TooltipHoverArea">
        <TooltipHoverArea tooltip={ tooltip }>
          <Button>I'm just a silly target button!</Button>
        </TooltipHoverArea>
      </StyleguideSection>
    </div>
  );
};

export default Tooltips;
