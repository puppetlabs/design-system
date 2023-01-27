import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEqual } from 'lodash';
import Button from '../button';
import SearchMenuList from '../../internal/search-menu-list';
import Tag from './Tag';
import useMenuActions from '../../helpers/useMenuActions';

const propTypes = {
  className: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  label: PropTypes.string,
  onClick: PropTypes.func,
  onApply: PropTypes.func,
  closeOnBlur: PropTypes.bool,
  open: PropTypes.bool,
  selected: PropTypes.arrayOf(PropTypes.shape({})),
  options: PropTypes.arrayOf(PropTypes.shape({})),
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'text']),
  columns: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  renderTags: PropTypes.func,
  onBlur: PropTypes.func,
  onClose: PropTypes.func,
  onEscape: PropTypes.func,
  style: PropTypes.shape({}),
};

const defaultProps = {
  as: 'div',
  label: 'Add filter',
  open: false,
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
};

const AddTagFilter = ({
  as: Element,
  style,
  type,
  label: labelProp,
  closeOnBlur,
  onBlur: onBlurProp,
  onEscape,
  className,
  options,
  onClick: onClickProp,
  onClose: onCloseProp,
  open,
  columns,
  onApply,
  selected: selectedProp,
  renderTags,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const onClick = onClickProp || (() => setIsOpen(true));
  const onClose = onCloseProp || (() => setIsOpen(false));

  const onClickTag = name => {
    const newSelected = selected.filter(tag => tag.name !== name);
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

  const onBlur =
    onBlurProp ||
    (() => {
      if (closeOnBlur) {
        onClose();
      }
    });

  // set refs and common menu handlers
  const { triggerRef, menuRef, styles, menuId } = useMenuActions({
    onBlur,
    onEscape,
    className: 'rc-tag-filter',
  });

  const tags =
    renderTags ||
    (({ label, name }) => (
      <Tag
        type="neutral"
        emphasis="subtle"
        label={label}
        onClick={() => onClickTag(name)}
      />
    ));

  return (
    <Element className={classNames('rc-tag-filter', className)}>
      {selected.map(tags)}
      <Button icon="plus" type={type} ref={triggerRef} onClick={onClick}>
        {labelProp}
      </Button>
      {isOpen && (
        <SearchMenuList
          id={menuId}
          style={{ ...style, ...styles.popper }}
          menuRef={menuRef}
          attributes={styles.attributes}
          selected={selected}
          onClose={onClose}
          columns={columns}
          onApply={setSelected}
          items={options}
        />
      )}
    </Element>
  );
};

AddTagFilter.propTypes = propTypes;
AddTagFilter.defaultProps = defaultProps;
export default AddTagFilter;
