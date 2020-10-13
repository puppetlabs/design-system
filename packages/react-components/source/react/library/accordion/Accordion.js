import React, { useState, useEffect, Children } from 'react';
import Button from '../button';
import { bool, string, element } from 'prop-types';

const propTypes = {
  /** Control whether the body content is open or closed with the open boolean prop. */
  open: bool,
  /** Button text used when the accordion is toggled open. */
  buttonTextOpen: string,
  /** Button text used when the accordion is toggled closed. */
  buttonTextClosed: string,
  /** Content that is displayed within the accordion header and is always visible */
  headerContent: element,
};

const defaultProps = {
  open: undefined,
  buttonTextOpen: 'Hide details',
  buttonTextClosed: 'Show details',
};

function Accordion({
  open,
  buttonTextOpen,
  buttonTextClosed,
  headerContent,
  children,
}) {
  const [isOpen, setIsOpen] = useState(open);

  // checks if parent component is controlling open state
  const shouldSetIsOpen = () => {
    {
      open === undefined ? setIsOpen(!isOpen) : setIsOpen(open);
    }
  };

  // Similar to componentDidMount and componentDidUpdate:  useEffect(() => {    // Update the document title using the browser API    document.title = `You clicked ${count} times`;  });
  return (
    <div className="rc-accordion-container">
      <div className="rc-accordion-header">
        {headerContent}
        <Button
          className="rc-accordion-toggle-button"
          type="text"
          trailingIcon={isOpen ? 'chevron-up' : 'chevron-down'}
          onClick={() => shouldSetIsOpen()}
        >
          {isOpen ? buttonTextOpen : buttonTextClosed}
        </Button>
      </div>

      {isOpen && <div className="rc-accordion-body">{children}</div>}
    </div>
  );
}

Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;

export default Accordion;
