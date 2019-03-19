import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import Sidebar from './Sidebar';

const SidebarContainer = withTranslation('navigation')(withRouter(Sidebar));

export default SidebarContainer;
