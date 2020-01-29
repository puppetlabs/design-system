import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import stripHtmlComments from 'strip-html-comments';
import PreBase from './PreRenderer';
import { Content } from '@puppet/react-components';

const Pre = props => {
  if (isValidElement(props.children)) {
    // Avoid rendering <Code> inside <Pre>
    return <PreBase {...props.children.props} />;
  }
  return <PreBase {...props} />;
};
Pre.propTypes = {
  children: PropTypes.node,
};

export const overrides = {
  pre: {
    component: Pre,
  },
};

function Markdown({ text, inline }) {
  return (
    <Content as="span">
      {compiler(stripHtmlComments(text), { overrides, forceBlock: true })}
    </Content>
  );
}

Markdown.propTypes = {
  text: PropTypes.string.isRequired,
  inline: PropTypes.bool,
};

export default Markdown;
