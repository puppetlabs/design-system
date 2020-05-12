import React, { memo } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
// eslint-disable-next-line no-unused-vars
import brace from 'brace';
import classNames from 'classnames';

import 'brace/mode/yaml';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';

// See full list of available props at
// https://github.com/securingsincity/react-ace/blob/master/docs/Ace.md
const propTypes = {
  className: PropTypes.string,
  mode: PropTypes.string,
  theme: PropTypes.string,
  darkMode: PropTypes.bool,
  border: PropTypes.bool,
  padding: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  minLines: PropTypes.number,
  maxLines: PropTypes.number,
  wrapEnabled: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  showGutter: PropTypes.bool,
  showPrintMargin: PropTypes.bool,
  highlightActiveLine: PropTypes.bool,
  focus: PropTypes.bool,
  fontSize: PropTypes.number,
  tabSize: PropTypes.number,
  onChange: PropTypes.func,
  blockScrolling: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  editorProps: PropTypes.shape({}),
  ariaLabel: PropTypes.string,
  style: PropTypes.shape({}),
};

const defaultProps = {
  className: '',
  mode: 'yaml',
  theme: undefined,
  darkMode: true,
  border: true,
  padding: 24,
  name: '',
  value: '',
  placeholder: '',
  readOnly: false,
  minLines: undefined,
  maxLines: undefined,
  wrapEnabled: true,
  height: '100%',
  width: '100%',
  showGutter: true,
  showPrintMargin: false,
  highlightActiveLine: true,
  focus: false,
  fontSize: 14,
  tabSize: 2,
  onChange: null,
  blockScrolling: Infinity,
  editorProps: {},
  ariaLabel: 'editor input',
  style: {
    fontFamily: 'Inconsolata, monospace', // TODO: This still causes wacky loading behavior; Refresh the page while on the "Graph" tab and toggle to "Code and data"
  },
};

/**
 * `CodeEditor` is a styled wrapper around react-ace, i.e. Ace Editor and Brace
 */
const CodeEditor = ({
  className,
  theme,
  darkMode,
  border,
  padding,
  showGutter,
  blockScrolling,
  editorProps,
  ariaLabel,
  readOnly,
  ...props
}) => {
  const defaultTheme = darkMode ? 'monokai' : 'tomorrow';
  const finalTheme = theme || defaultTheme;

  const onLoad = readOnly
    ? editor => {
        editor.renderer.setPadding(padding); // Horizontal padding
        editor.renderer.setScrollMargin(16, 16); // Vertical padding
        editor.container.firstChild.setAttribute('aria-label', ariaLabel);
        editor.container.firstChild.setAttribute('readonly', '');
      }
    : editor => {
        editor.renderer.setPadding(padding); // Horizontal padding
        editor.renderer.setScrollMargin(16, 16); // Vertical padding
        editor.container.firstChild.setAttribute('aria-label', ariaLabel);
      };

  return (
    <AceEditor
      className={classNames('react-code-editor', {
        'react-code-editor-light': !darkMode,
        'react-code-editor-show-gutter': showGutter,
        'react-code-editor-border': border,
      })}
      theme={finalTheme}
      editorProps={{
        $blockScrolling: blockScrolling,
        ...editorProps,
      }}
      showGutter={showGutter}
      onLoad={onLoad}
      // TODO: delete this when bug gets fixed upstream https://github.com/securingsincity/react-ace/issues/804
      commands={[
        {
          name: 'overwriteSearch',
          bindKey: { win: 'Ctrl-F', mac: 'Command-F' },
          exec: () => {},
        },
      ]}
      {...props}
    />
  );
};

CodeEditor.propTypes = propTypes;
CodeEditor.defaultProps = defaultProps;

export default memo(CodeEditor);
