import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Tag from '../library/Tag';

class TagsPage extends React.Component {

  render() {
    return (
      <div>
        <h1>Tabs</h1>
        <StyleguideSection title="Standard Tags">
          <Tag>I&apos;m a tag</Tag>
        </StyleguideSection>
        <StyleguideSection title="Tags with Tooltips">
          <Tag block tooltip>I&apos;m a really really really long tag we can use for testing tag responsiveness!</Tag>
        </StyleguideSection>

      </div>
    );
  }
}

export default TagsPage;
