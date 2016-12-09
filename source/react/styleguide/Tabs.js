import React from 'react';
import Tabs from '../library/tabs/Tabs';
import TabPanel from '../library/tabs/TabPanel';

class TabsPage extends React.Component {

  render() {
    return (
      <div>
        <h1>Tabs</h1>
        <div className="sg-section">
          <Tabs>
            <TabPanel title="Tab 1">
              I'm a happy panel
            </TabPanel>
            <TabPanel title="Tab 2">
              I'm another happy panel
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default TabsPage;
