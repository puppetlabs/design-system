import React from 'react';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 'Buttons',
    };
  }

  render() {
    const page = this.state.page;

    return (
      <div className="sidebar">
        <ul>
          <li>Buttons</li>
          <li>Cards</li>
          <li>Icons</li>
        </ul>
      </div>
    );
  }

}

export default Sidebar;
