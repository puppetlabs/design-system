import React, { useEffect, useRef, useState } from 'react';
import { func, string, oneOf, bool, node } from 'prop-types';
import classNames from 'classnames';
import Button from '../button';
import Card from '../card';
import SearchMenuList from '../../internal/search-menu-list';
import PropTypes from 'prop-types';
import Tag from './Tag';
import { isEqual } from 'lodash';
import useMenuActions from '../../internal/useMenuActions';

const propTypes = {
	className: PropTypes.string,
	as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	label: PropTypes.string,
	onClick: PropTypes.func,
	onApply: PropTypes.func,
	open: PropTypes.bool,
	hideRemoveButton: PropTypes.bool,
	options: PropTypes.arrayOf(PropTypes.shape({})),
	type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'text']),
	columns: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
	renderTags: PropTypes.func,
};

const defaultProps = {
	as: 'div',
	label: 'Add filter',
	open: false,
	hideRemoveButton: true,
	type: 'secondary',
	closeOnBlur: true,
	options: [],
	columns: false,
	selected: [],
	style: {}
};

const AddTagFilter = ({ as: Element, style, type, label, closeOnBlur, className, options, onClick: onClickProp, onClose: onCloseProp, open, hideRemoveButton, columns, onApply, selected: selectedProp, renderTags }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState([]);
	const onClick = onClickProp ? onClickProp : (() => setIsOpen(true));
	const onClose = onCloseProp ? onCloseProp : (() => setIsOpen(false));

	const onClickTag = (name) => {
		const newSelected = selected.filter((tag) => tag.name !== name);
		setSelected(newSelected);
	}

	useEffect(() => {
		if (open !== isOpen) {
			setIsOpen(open);
		}
	}, [open])

	useEffect(() => {
		if (onApply && !isEqual(selected, selectedProp)) {
			onApply(selected);
		}
	}, [selected])

	useEffect(() => {
		if (!isEqual(selected, selectedProp)) {
			setSelected(selectedProp);
		}
	}, [selectedProp])

	const onBlur = () => {
		if (closeOnBlur) {
			onClose();
		}
	}

	// set refs and common menu handlers
	const {
		triggerRef,
		menuRef,
		setFocus,
		focus,
		styles,
		menuId
	} = useMenuActions({ onBlur, className: 'rc-tag-filter' });

	const tags = renderTags ? renderTags : ({ label, name }) => (<Tag
		type="neutral"
		emphasis="subtle"
		label={label}
		onClick={() => onClickTag(name)}
	/>);

	return (<Element className={classNames("rc-tag-filter", className)}>
		{selected.map(tags)}
		<Button
			icon="plus"
			type={type}
			hideRemoveButton={hideRemoveButton}
			ref={triggerRef}
			onClick={onClick} >
			{label}
		</Button>
		{isOpen && <SearchMenuList
			id={menuId}
			style={{ ...style, ...styles.popper }}
			ref={menuRef}
			focus={focus}
			setFocus={setFocus}
			attributes={styles.attributes}
			selected={selected}
			onClose={onClose}
			columns={columns}
			onApply={setSelected}
			items={options} />}
	</Element>);
}

AddTagFilter.propTypes = propTypes;
AddTagFilter.defaultProps = defaultProps;
export default AddTagFilter;