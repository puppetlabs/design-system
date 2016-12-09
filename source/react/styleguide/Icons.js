import React from 'react';
import icons from '../library/icons';
import Icon from '../library/Icon';

class Icons extends React.Component {

  render() {
    return (
      <div>
        <h1>Icons</h1>
        <div className="sg-section">
          {
            Object.keys(icons).map(icon => (
              <div className="sg-icon">
                <div className="sg-icon-wrapper">
                  <Icon type={ icon } />
                </div>
                <div className="sg-icon-title">
                  { icon }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Icons;
