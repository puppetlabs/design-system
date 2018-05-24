import React from 'react';
import colors from '!raw-loader!../../../../../src/styles/colors.css'; // eslint-disable-line
import StyleguideContent from '../../StyleguideContent';
import typography from '../../../../../src/styles/typography.css';
import styles from './colors.css';

const parseVariables = data => {
  const re = /--(.*): (.*);/g;
  let loop = true;
  const variables = {};

  while (loop) {
    const match = re.exec(data);
    if (match) {
      const key = match[1];
      const value = match[2];
      variables[key] = value;
    } else {
      loop = false;
    }
  }

  return variables;
};

const colorVariables = parseVariables(colors);

const Colors = () => (
  <StyleguideContent>
    <div>
      <div className={typography.heading1}>Colors</div>
      <p>
        The products color palette is subdivided into themes. To ensure
        accessibility for the greatest number of users, minimum contrast ratios
        and other factors have been considered in the creation of this palette.
      </p>
      <div className={typography.heading3}>Brand palette</div>
      <p>
        The brand palette is limited to applications of Puppet&apos;s primary
        brand color, gold. This particular color should only be used in the
        context of Puppet logos, when applicable, and not used in any other
        aspect of the product.
      </p>
      <div className={typography.heading3}>UI palette</div>
      <p>
        The UI palette is used for product &quot;chrome&quot;: backgrounds,
        containers, content zones, and other foundational aspects of a product
        design.
      </p>
      <div className={typography.heading3}>Primary actions palette</div>
      <p>
        The primary actions palette is used solely for the most important
        actions a user can take on a page (most commonly represented as
        buttons).
      </p>
      <div className={typography.heading3}>Visualizations palette</div>
      <p>
        This spectrum of colors is exclusively intended for use in data
        visualizations, and should not be applied to any other aspects of the
        product. In most instances, color sets should not be combined (e.g. do
        not use salmon and aqua in the same donut chart); instead,
        visualizations should limit themselves to a single color or single
        family of colors (e.g. a donut may use each of the salmon family colors
        to represent segments of the data).
      </p>
      <div className={typography.heading3}>Status palette</div>
      <p>
        This set of colors may only be used when the UI serves up opinionated
        information to a user in the form of statuses, notifications, warnings,
        or errors. These colors should not be applied in other aspects of the
        product UI.
      </p>

      <ul className={styles.colors}>
        {Object.keys(colorVariables).map(name => (
          <li key={name}>
            <div
              className={styles.swatch}
              style={{ backgroundColor: colorVariables[name] }}
            >
              &nbsp;
            </div>
            <p>{name}</p>
            <p>{colorVariables[name]}</p>
          </li>
        ))}
      </ul>
    </div>
  </StyleguideContent>
);

export default Colors;
