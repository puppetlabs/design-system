import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import Login from './Login';

export default withTranslation('login')(withRouter(Login));
