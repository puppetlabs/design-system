import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import Confirmation from './Confirmation';

export default withTranslation('confirmation')(withRouter(Confirmation));
