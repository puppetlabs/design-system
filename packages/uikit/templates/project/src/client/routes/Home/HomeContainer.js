import { withNamespaces } from 'react-i18next';

import Home from './Home';

/**
 * HomeContainer is connected version of presentational Home component
 * This is where you would also add redux store connection / internal
 * state management
 */
const HomeContainer = withNamespaces('home')(Home);

export default HomeContainer;
