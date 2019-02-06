/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Examples from 'react-styleguidist/lib/rsg-components/Examples';
import SectionHeading from 'react-styleguidist/lib/rsg-components/SectionHeading';
import JsDoc from 'react-styleguidist/lib/rsg-components/JsDoc';
import Markdown from 'react-styleguidist/lib/rsg-components/Markdown';
import Slot from 'react-styleguidist/lib/rsg-components/Slot';
import ReactComponentRenderer from './ReactComponentRenderer';
import { DOCS_TAB_USAGE } from 'react-styleguidist/lib/rsg-components/slots';
import { DisplayModes, UsageModes } from 'react-styleguidist/lib/consts';

const ExamplePlaceholder =
  process.env.STYLEGUIDIST_ENV !== 'production'
    ? require('react-styleguidist/lib/rsg-components/ExamplePlaceholder')
        .default
    : () => <div />;

const propTypes = {
  component: PropTypes.shape({}).isRequired,
  depth: PropTypes.number.isRequired,
  exampleMode: PropTypes.string.isRequired,
  usageMode: PropTypes.string.isRequired,
};

const contextTypes = {
  config: PropTypes.shape({}).isRequired,
  displayMode: PropTypes.string,
};

class ReactComponent extends Component {
  constructor(props, context) {
    super(props, context);
    const { usageMode } = props;

    this.handleTabChange = this.handleTabChange.bind(this);

    this.state = {
      activeTab: usageMode === UsageModes.expand ? DOCS_TAB_USAGE : undefined,
    };
  }

  handleTabChange(name) {
    this.setState(state => ({
      activeTab: state.activeTab !== name ? name : undefined,
    }));
  }

  render() {
    const { activeTab } = this.state;
    const {
      displayMode,
      config: { pagePerSection },
    } = this.context;
    const { component, depth, usageMode, exampleMode } = this.props;
    const { name, visibleName, slug, filepath, pathLine, metadata } = component;
    const { description, examples = [], tags = {} } = component.props;
    if (!name) {
      return null;
    }
    const showUsage = usageMode !== UsageModes.hide;
    return (
      <ReactComponentRenderer
        name={name}
        slug={slug}
        filepath={filepath}
        pathLine={pathLine}
        docs={<JsDoc {...tags} />}
        metadata={metadata}
        description={description && <Markdown text={description} />}
        heading={
          <SectionHeading
            id={slug}
            pagePerSection={pagePerSection}
            deprecated={!!tags.deprecated}
            slotName="componentToolbar"
            slotProps={{
              ...component,
              isolated: displayMode !== DisplayModes.all,
            }}
            depth={depth}
          >
            {visibleName}
          </SectionHeading>
        }
        examples={
          examples.length > 0 ? (
            <Examples
              examples={examples}
              name={name}
              exampleMode={exampleMode}
            />
          ) : (
            <ExamplePlaceholder name={name} />
          )
        }
        tabButtons={
          showUsage && (
            <Slot
              name="docsTabButtons"
              active={activeTab}
              props={{ ...component, onClick: this.handleTabChange }}
            />
          )
        }
        tabBody={
          <Slot
            name="docsTabs"
            active={activeTab}
            onlyActive
            props={component}
          />
        }
      />
    );
  }
}

ReactComponent.propTypes = propTypes;
ReactComponent.contextTypes = contextTypes;

export default ReactComponent;
/* eslint-enable */
