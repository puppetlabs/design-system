import React, { useState } from 'react';
import Checkbox from '../../library/checkbox';
import Button from '../../library/button';
import Heading from '../../library/heading';
import Icon from '../../library/icon';
import FormFieldDescription from '../../library/form/internal/FormFieldDescription';
import { sortBy, chunk, pickBy } from 'lodash';
import classNames from 'classnames';
import asMenuItem from '../../helpers/asMenuItem';

import {
  ENTER_KEY_CODE,
  SPACE_KEY_CODE
} from '../../constants';

const validCheckboxProps = Object.keys(Checkbox.propTypes)
const validFormFieldDescriptionProps = Object.keys(FormFieldDescription.propTypes)

/** Creates unique key from group or uuid and label, or just the label if no group or uuid is provided*/
export const getUniqKey = (item) => item.uuid || item.group ? `${item.uuid || item.group}-${item.label}` : item.label;
const GroupHeading = ({title, isOpen, inputRef, ...props}) => isOpen ? (<Button {...props} ref={inputRef} type='transparent' innerFocus trailingIcon={`chevron-${isOpen ? 'up' : 'down'}`} className={classNames("rc-search-menu-list-group")}>
			<h6 className={classNames('rc-heading', 'rc-heading-h6')}  >
				{title}
			</h6>
		</Button>) : null;
const GroupCheckbox = asMenuItem(Checkbox);
const MenuGroupHeading = asMenuItem(GroupHeading);

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

	return (<div className="rc-search-menu-group">
		<MenuGroupHeading 
			isOpen={!isGroupCollector} 
			title={title} 
			onClick={toggleGroup}
		/>
		{(isOpen || isGroupCollector) && <div className="rc-search-menu-group-items">
			{rows.map((row, row_i) => <div key={`rc-search-menu-group-${row_i}`} className={classNames('rc-search-menu-group-container', {
				columns: !!columns,
			})}>{row.map((props, i) => {
				const rowIndex = row_i + 1;
				const columnIndex = i + 1 + (row_i * numberOfColumns);
				const checkboxProps = pickBy(props, (value, key) => validCheckboxProps.includes(key));
				const descriptionProps = pickBy(props, (value, key) => validFormFieldDescriptionProps.includes(key));
				const isSelected = !!selectedOptions[getUniqKey(props)];
				const onChange = (checked, e) => onSelect(props, checked);
				
				return (
					<div key={`rc-search-menu-checkbox-${i}-${checkboxProps.label}`} className="rc-search-menu-list-group-checkbox">
						<GroupCheckbox
							{...checkboxProps}
							value={isSelected}
							onChange={onChange}
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