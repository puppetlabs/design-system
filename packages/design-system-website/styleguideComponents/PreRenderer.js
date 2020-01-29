import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Styled from 'rsg-components/Styled';
import prismTheme from './prismTheme';

const styles = ({ space, color, fontSize, fontFamily, borderRadius }) => ({
	pre: {
		fontFamily: fontFamily.monospace,
		fontSize: fontSize.text,
		lineHeight: 1.5,
		color: color.base,
		whiteSpace: 'pre-wrap',
		wordWrap: 'normal',
		tabSize: 2,
		hyphens: 'none',
		backgroundColor: color.codeBackground,
		padding: [[space[1], space[2]]],
		borderLeft: [[8, '#e4e9ed', 'solid']],
		borderRadius,
		marginTop: 0,
		marginBottom: space[2],
		...prismTheme({ color }),
	},
});

export function PreRenderer({ classes, className, children }) {
	const classNames = cx(className, classes.pre);

	const isHighlighted = className && className.indexOf('lang-') !== -1;
	if (isHighlighted) {
		return <pre className={classNames} dangerouslySetInnerHTML={{ __html: children }} />;
	}
	return <pre className={classNames}>{children}</pre>;
}

PreRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(PreRenderer);
