import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Tabs from '../library/tabs/Tabs';
import TabPanel from '../library/tabs/TabPanel';

class TabsPage extends React.Component {

  render() {
    return (
      <div>
        <h1>Tabs</h1>
        <StyleguideSection title="Standard Tabs">
          <Tabs>
            <TabPanel title="Tab 1">
              I'm a happy panel
            </TabPanel>
            <TabPanel title="Tab 2">
              I'm another happy panel
            </TabPanel>
          </Tabs>
        </StyleguideSection>
        <StyleguideSection title="Vertical Tabs">
          <Tabs vertical>
            <TabPanel title="Tab 1">
              I'm a happy panel
            </TabPanel>
            <TabPanel title="Tab 2">
              I'm another happy panel
            </TabPanel>
          </Tabs>
        </StyleguideSection>
      </div>
    );
  }
}

export default TabsPage;
