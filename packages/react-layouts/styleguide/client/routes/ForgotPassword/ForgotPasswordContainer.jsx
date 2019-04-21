import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import ForgotPassword from './ForgotPassword';

export default withTranslation('forgot-password')(withRouter(ForgotPassword));
