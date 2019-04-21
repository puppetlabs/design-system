import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import ResetPassword from './ResetPassword';

export default withTranslation('reset-password')(withRouter(ResetPassword));
