import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/yaml';
import 'brace/theme/monokai';

const propTypes = {
  /** CSS class name applied to the root element */
  className: PropTypes.string,
  mode: PropTypes.string,
  theme: PropTypes.string,
  /** Unique ID to be used for the editor */
  name: PropTypes.string,
  /** Value you want to populate in the code highlighter */
  value: PropTypes.string,
  /** Placeholder text to be displayed when editor is empty */
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  /** Minimum number of lines to be displayed  */
  wrapEnabled: PropTypes.bool,
  minLines: PropTypes.number,
  /** Maximum number of lines to be displayed  */
  maxLines: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string,
  showGutter: PropTypes.bool,
  showPrintMargin: PropTypes.bool,
  highlightActiveLine: PropTypes.bool,
  focus: PropTypes.bool,
  fontSize: PropTypes.number,
  tabSize: PropTypes.number,
  /** Occurs on document change it has 2 arguments the value and the event. */
  onChange: PropTypes.func,
  blockScrolling: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

const defaultProps = {
  className: 'rc-code-editor',
  mode: 'yaml',
  theme: 'monokai',
  name: '',
  value: '',
  placeholder: '',
  readOnly: false,
  wrapEnabled: false,
  minLines: 20,
  maxLines: 20,
  height: '500px',
  width: '100%',
  showGutter: true,
  showPrintMargin: false,
  highlightActiveLine: true,
  focus: false,
  fontSize: 12,
  tabSize: 2,
  onChange: null,
  blockScrolling: Infinity,
};

/**
 * `CodeEditor` is a styled wrapper around an react-ace AceEditor.
 */
const CodeEditor = ({ blockScrolling, ...props }) => (
  <AceEditor
    editorProps={{ $blockScrolling: blockScrolling }}
    {...props}
  />
);

CodeEditor.propTypes = propTypes;
CodeEditor.defaultProps = defaultProps;

export default CodeEditor;
