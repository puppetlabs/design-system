import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import icons from '../library/icons';
import Icon from '../library/Icon';

class Icons extends React.Component {

  render() {
    return (
      <div>
        <h1>Icons</h1>
        <StyleguideSection title="Icons">
          {
            Object.keys(icons).map(icon => (
              <div className="sg-icon">
                <div className="sg-icon-wrapper">
                  <Icon type={ icon } />
                </div>
                <div className="sg-icon-title" title={ icon }>
                  { icon }
                </div>
              </div>
            ))
          }
        </StyleguideSection>
      </div>
    );
  }
}

export default Icons;
