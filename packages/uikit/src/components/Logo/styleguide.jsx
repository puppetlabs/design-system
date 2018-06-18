import { bool } from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import styles from './Styleguide.css';
import DiscoveryLogo from '../../logos/Discovery';
import EnterpriseLogo from '../../logos/Enterprise';
import PipelinesLogo from '../../logos/Pipelines';
import InsightsLogo from '../../logos/Insights';
import ContainerRegistryLogo from '../../logos/ContainerRegistry';
import { withControls } from '../../../styleguide/client/higherOrderComponents';
import { boolean } from '../../../styleguide/client/knobs';

const knobs = {
  reversed: boolean('Reversed', false),
};

const LogoStyleguide = ({ reversed }) => (
  <div>
    <h1>Logo</h1>
    <div
      className={classNames(styles.container, { [styles.reversed]: reversed })}
    >
      <DiscoveryLogo reversed={reversed} />
      <EnterpriseLogo reversed={reversed} />
      <PipelinesLogo reversed={reversed} />
      <InsightsLogo reversed={reversed} />
      <ContainerRegistryLogo reversed={reversed} />
    </div>
  </div>
);

LogoStyleguide.propTypes = {
  reversed: bool,
};

LogoStyleguide.defaultProps = {
  reversed: false,
};

export default withControls({ knobs })(LogoStyleguide);
