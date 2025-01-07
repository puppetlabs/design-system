import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEqual } from 'lodash';
import Menu from '../menu';

const propTypes = {
  className: PropTypes.string,
  /** React component / element for rendering the container. */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /** Button label */
  label: PropTypes.string,
  /** Button onClick method */
  onClick: PropTypes.func,
  /** Method called when selections are applied */
  onApply: PropTypes.func,
  /** Boolean value for closing the menu on blur. Defaults to true. */
  closeOnBlur: PropTypes.bool,
  /** Controls the open / closed state of the menu. */
  open: PropTypes.bool,
  /** Array of selected options */
  selected: PropTypes.arrayOf(PropTypes.shape({})),
  /** Array of available options */
  options: PropTypes.arrayOf(PropTypes.shape({})),
  /** Button type */
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'text']),
  /** Number of columns to render in the menu. If true, it will render two columns. A number can be provided if more columns are needed. Defaults to false (0 columns) */
  columns: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  /** Render prop for changing how the selected tags appear. Can be used to display elements other than Tags. */
  renderTags: PropTypes.func,
  /** Method called when the menu is loses focus */
  onBlur: PropTypes.func,
  /** Method called when the menu is closed */
  onClose: PropTypes.func,
  /** Method called when the escape key is pressed */
  onEscape: PropTypes.func,
  /** Additional styles applied to selected tag container */
  style: PropTypes.shape({}),
  /** Label displayed onApply button */
  applyButtonLabel: PropTypes.string,
  /** Type of apply button */
  applyButtonType: PropTypes.string,
  /** Label displayed on cancel button */
  cancelButtonLabel: PropTypes.string,
  /** Type of cancel button */
  cancelButtonType: PropTypes.string,
  /** Label displayed in clear badge */
  clearLabel: PropTypes.string,
  /** Label displayed on search input */
  searchLabel: PropTypes.string,
  /** Placeholder displayed on search input */
  searchPlaceholder: PropTypes.string,
};

const defaultProps = {
  as: 'div',
  label: 'Add',
  open: null,
  type: 'secondary',
  closeOnBlur: true,
  options: [],
  columns: false,
  selected: [],
  style: {},
  onApply: () => null,
  onClick: undefined,
  onBlur: undefined,
  onClose: undefined,
  onEscape: undefined,
  renderTags: null,
  className: '',
  applyButtonLabel: undefined,
  applyButtonType: undefined,
  cancelButtonLabel: undefined,
  cancelButtonType: undefined,
  clearLabel: undefined,
  searchLabel: undefined,
  searchPlaceholder: undefined,
};

const TagSearch = ({
  as: Element,
  type,
  label: labelProp,
  closeOnBlur,
  onBlur: onBlurProp,
  onEscape: onEscapeProp,
  className,
  options,
  onClick: onClickProp,
  onClose: onCloseProp,
  open,
  columns,
  onApply,
  selected: selectedProp,
  style,
  renderTags,
  ...searchMenuProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const onClick = onClickProp || (() => setIsOpen(true));
  const onClose = onCloseProp || (() => setIsOpen(false));

  const onRemoveItem = (name) => {
    const newSelected = selected.filter((tag) => tag.name !== name);
    setSelected(newSelected);
  };

  useEffect(() => {
    if (open !== isOpen) {
      setIsOpen(open);
    }
  }, [open]);

  useEffect(() => {
    if (onApply && !isEqual(selected, selectedProp)) {
      onApply(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (!isEqual(selected, selectedProp)) {
      setSelected(selectedProp);
    }
  }, [selectedProp]);

  const onBlur = () => {
    if (closeOnBlur) {
      if (onBlurProp) onBlurProp();
      onClose();
    }
  };

  const onEscape = () => {
    if (onEscapeProp) onEscapeProp();
    onClose();
  };

  const tags = (props) =>
    // eslint-disable-next-line react/prop-types
    renderTags({ ...props, removeItem: () => onRemoveItem(props.name) });

  return (
    <Element style={style} className={classNames('rc-tag-filter', className)}>
      {selected.map(tags)}
      <Menu>
        <Menu.Trigger icon="plus" type={type} onClick={onClick}>
          {labelProp}
        </Menu.Trigger>
        {isOpen && (
          <Menu.SearchMenu
            {...searchMenuProps}
            open
            columns={columns}
            options={options}
            onApply={setSelected}
            onBlur={onBlur}
            onClose={onClose}
            onEscape={onEscape}
            selected={selected}
          />
        )}
      </Menu>
    </Element>
  );
};

TagSearch.propTypes = propTypes;
TagSearch.defaultProps = defaultProps;
export default TagSearch;
