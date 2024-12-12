import React from 'react';
import { sortBy, chunk, pickBy } from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Checkbox from '../../../library/checkbox';
import FormFieldDescription from '../../../library/form/internal/FormFieldDescription';
import asFocusItem from '../../../helpers/asFocusItem';
import GroupDetail from './SearchGroupDetail';

const validCheckboxProps = Object.keys(Checkbox.propTypes);
const validFormFieldDescriptionProps = Object.keys(
  FormFieldDescription.propTypes,
);

/** Creates unique key from group or uuid and label, or just the label if no group or uuid is provided */
export const getUniqKey = (item) =>
  item.uuid || item.group
    ? `${item.uuid || item.group}-${item.label}`
    : item.label;

const GroupCheckbox = asFocusItem(Checkbox);

const SearchMenuGroupPropTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  isOpen: PropTypes.bool,
  toggleGroup: PropTypes.func.isRequired,
  columns: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  onSelect: PropTypes.func.isRequired,
  selectedOptions: PropTypes.shape({}),
  isGroupCollector: PropTypes.bool,
  id: PropTypes.string,
};

const defaultProps = {
  columns: false,
  id: '',
  isOpen: false,
  items: [],
  selectedOptions: {},
  title: '',
  isGroupCollector: false,
};

const SearchMenuGroup = ({
  title,
  items = [],
  isOpen = false,
  columns,
  onSelect,
  selectedOptions = {},
  isGroupCollector,
  id,
}) => {
  const numberOfColumns =
    typeof columns === 'number' ? Math.max(2, columns) : 2;
  const sortedItems = sortBy(items, 'label');
  const rows = columns ? chunk(sortedItems, numberOfColumns) : [sortedItems];
  // Show fields without a group
  const joinIds = (row) =>
    row.reduce((acc, item) => `${acc}-${getUniqKey(item)}`, '');
  return (
    <GroupDetail
      open={isOpen}
      show={!isGroupCollector}
      title={title}
      id={`${id}-group-${title}`}
    >
      <div
        className={classNames('rc-search-menu-group-items', {
          collector: isGroupCollector,
        })}
      >
        {rows.map((row) => (
          <div
            key={`rc-search-menu-group-${title}-row-${joinIds(row)}`}
            className={classNames('rc-search-menu-group-container', {
              columns: !!columns,
            })}
          >
            {row.map((props) => {
              const checkboxProps = pickBy(props, (value, key) =>
                validCheckboxProps.includes(key),
              );
              const descriptionProps = pickBy(props, (value, key) =>
                validFormFieldDescriptionProps.includes(key),
              );
              const isSelected = !!selectedOptions[getUniqKey(props)];
              const onChange = (checked) => onSelect(props, checked);
              const onClick = () => onSelect(props, !isSelected);
              return (
                <div
                  key={`rc-search-menu-checkbox-${title}-${checkboxProps.label}`}
                  className="rc-search-menu-list-group-checkbox"
                >
                  <GroupCheckbox
                    {...checkboxProps}
                    value={isSelected}
                    onChange={onChange}
                    onClick={onClick}
                  />
                  <FormFieldDescription {...descriptionProps} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </GroupDetail>
  );
};

SearchMenuGroup.propTypes = SearchMenuGroupPropTypes;
SearchMenuGroup.defaultProps = defaultProps;
export default SearchMenuGroup;
