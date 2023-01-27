import React from 'react';

const PopupMenu = ({ children, asPortal = true }) => {
  return (
    <Portal active={asPortal} target="search-menu">
      <FocusContext>
        <Element
          className={classNames('rc-search-menu', className)}
          style={style}
          ref={menuRef}
          {...props}
          {...attributes}
        >
          {children}
        </Element>
      </FocusContext>
    </Portal>
  );
};

export default PopupMenu;
