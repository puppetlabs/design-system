import React, { useState } from 'react';
import Checkbox from '../../library/checkbox';
import Heading from '../../library/heading';
import Icon from '../../library/icon';
import FormFieldDescription from '../../library/form/internal/FormFieldDescription';
import { sortBy, chunk, pickBy } from 'lodash';
import classNames from 'classnames';

const validCheckboxProps = Object.keys(Checkbox.propTypes)
const validFormFieldDescriptionProps = Object.keys(FormFieldDescription.propTypes)

/** Creates unique key from group or uuid and label, or just the label if no group or uuid is provided*/
export const getUniqKey = (item) => item.uuid || item.group ? `${item.uuid || item.group}-${item.label}` : item.label;

const SearchMenuGroup = ({
	title,
	items = [],
	isOpen = false,
	toggleGroup,
	columns,
	onSelect,
	selectedOptions = {},
}) => {
	const numberOfColumns = typeof columns === 'number' ? Math.max(2, columns) : 2;
	const sortedItems = sortBy(items, 'label');
	const rows = !!columns ? chunk(sortedItems, numberOfColumns) : [sortedItems];

	// Show fields without a group
	const isGroupCollector = title === '#collector-group';
	const keyToggle = (e) => e.key === 'Enter' ? showResourcesToggle(e) : null;

	return (<div className="rc-search-menu-group">
		{!isGroupCollector && <div className={classNames("rc-search-menu-list-group")}>
			<h6 className={classNames('rc-heading', 'rc-heading-h6')} onClick={toggleGroup} onKeyPress={keyToggle}>
				{title}
				<Icon type={`chevron-${isOpen ? 'up' : 'down'}`} />
			</h6>
		</div>}
		{(isOpen || isGroupCollector) && <div className="rc-search-menu-group-items">
			{rows.map((row, i) => <div key={`rc-search-menu-group-${i}`} className={classNames('rc-search-menu-group-container', {
				columns: !!columns,
			})}>{row.map((props, i) => {
				const checkboxProps = pickBy(props, (value, key) => validCheckboxProps.includes(key));
				const descriptionProps = pickBy(props, (value, key) => validFormFieldDescriptionProps.includes(key));
				const isSelected = !!selectedOptions[getUniqKey(props)];
				
				return (
					<div key={`rc-search-menu-checkbox-${i}-${checkboxProps.label}`} className="rc-search-menu-list-group-checkbox">
						<Checkbox
							{...checkboxProps}
							value={isSelected}
							onChange={checked => onSelect(props, checked)}
						/>
						{<FormFieldDescription {...descriptionProps} />}
					</div>
				)
			})}</div>)}
		</div>}
	</div>
	);
}

export default SearchMenuGroup;