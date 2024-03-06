import jsdom from 'mocha-jsdom';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';
import Menu from '../../source/react/library/menu';
import Button from '../../source/react/library/button';
import MenuContext from '../../source/react/internal/popup-menus/menu-context';
import { RovingFocusContext } from '../../source/react/helpers/useRovingFocus';

const MenuItem = Menu.Item(({ inputRef, ...props }) => (
  <Button ref={inputRef} {...props} />
));
const menuItemProps = {
  closeMenu: () => {},
  openMenu: () => {},
  setFocus: () => {},
  addTarget: () => {},
  removeTarget: () => {},
  selectItem: () => {},
  currentFocus: 0,
  size: 3,
  indexes: {},
  closeOnSelect: true,
};
const renderMenuItem = (
  {
    closeMenu,
    openMenu,
    setFocus,
    addTarget,
    removeTarget,
    currentFocus,
    size,
    indexes,
    closeOnSelect,
    selectItem,
  } = menuItemProps,
  render = mount,
) =>
  render(
    <MenuContext.Provider value={{ closeMenu, openMenu, closeOnSelect }}>
      <RovingFocusContext.Provider
        value={{
          setFocus,
          addTarget,
          removeTarget,
          currentFocus,
          size,
          indexes,
        }}
      >
        <MenuItem id="test-1" onClick={selectItem}>
          Item 1
        </MenuItem>
        <MenuItem id="test-2" onClick={selectItem}>
          Item 2
        </MenuItem>
        <MenuItem id="test-3" onClick={selectItem}>
          Item 2
        </MenuItem>
      </RovingFocusContext.Provider>
    </MenuContext.Provider>,
  );

const defaultProps = {
  open: false,
  close: () => {},
  openMenu: () => {},
  onClickItem: () => {},
  arrow: false,
};

const defaultRender = (
  { close, open, openMenu, onClickItem, arrow } = defaultProps,
  render = shallow,
) =>
  render(
    <Menu>
      <Menu.Trigger onClick={openMenu}>Open Menu</Menu.Trigger>
      <Menu.Container arrow={arrow} onBlur={close} onEscape={close} open={open}>
        <MenuItem onClick={onClickItem}>Item 1</MenuItem>
        <MenuItem onClick={onClickItem}>Item 2</MenuItem>
        <Button onClick={onClickItem}>Button</Button>
      </Menu.Container>
    </Menu>,
  );

describe('<Menu />', () => {
  jsdom({ skipWindowCheck: true });

  it('should render without blowing up', () => {
    // Render closed
    const closed = defaultRender();
    expect(closed.find('Trigger').exists()).to.equal(true);
  });

  it('should not show menu content when closed', () => {
    const closed = defaultRender(defaultProps, mount);
    const trigger = closed.find('.rc-button');

    expect(trigger.length).to.equal(1);
    expect(trigger.text()).to.equal('Open Menu');
  });

  it('should show menu content when opened', () => {
    const opened = defaultRender({ ...defaultProps, open: true }, mount);
    const buttons = opened.find('.rc-button');

    expect(buttons.length).to.equal(4);
    expect(buttons.last().text()).to.equal('Button');
  });

  it('should show menu arrow if arrow prop is true', () => {
    const withArrowProps = { ...defaultProps, open: true, arrow: true };
    const opened = defaultRender(withArrowProps, mount);
    const arrow = opened.find('Arrow');
    expect(arrow.exists()).to.equal(true);

    const withoutArrowProps = { ...defaultProps, open: true, arrow: false };
    const opened2 = defaultRender(withoutArrowProps, mount);
    const arrow2 = opened2.find('Arrow');
    expect(arrow2.exists()).to.equal(false);
  });

  it('should call openMenu when trigger is clicked', () => {
    const openMenu = sinon.spy();
    const closed = defaultRender({ ...defaultProps, openMenu }, mount);
    const trigger = closed.find('.rc-button');

    trigger.simulate('click');
    expect(openMenu.called).to.equal(true);
  });

  it('should call onClickItem when item is clicked', () => {
    const onClickItem = sinon.spy();
    const opened = defaultRender(
      { ...defaultProps, open: true, onClickItem },
      mount,
    );

    const firstMeuButton = opened
      .find('.rc-popup-menu')
      .find('.rc-button')
      .first();

    firstMeuButton.last().simulate('click');
    expect(onClickItem.called).to.equal(true);
  });
  describe('Menu.Item()', () => {
    jsdom({ skipWindowCheck: true });

    it('should add all focus targets on mount', () => {
      const addTarget = sinon.spy();
      const props = {
        ...menuItemProps,
        addTarget,
      };

      renderMenuItem(props);
      expect(addTarget.calledThrice).to.equal(true);
    });

    it('should add the "focus" className to correct target when currentFocus changes', () => {
      const indexes = {
        'test-1': 0,
        'test-2': 1,
        'test-3': 2,
      };

      Object.keys(indexes).forEach((id, currentFocus) => {
        const props = {
          ...menuItemProps,
          currentFocus,
          indexes,
        };

        const menuItems = renderMenuItem(props);
        const firstItem = menuItems.find('Button#test-1');
        const secondItem = menuItems.find('Button#test-2');
        const thirdItem = menuItems.find('Button#test-3');

        expect(firstItem.hasClass('focus')).to.equal(
          currentFocus === indexes['test-1'],
        );
        expect(secondItem.hasClass('focus')).to.equal(
          currentFocus === indexes['test-2'],
        );
        expect(thirdItem.hasClass('focus')).to.equal(
          currentFocus === indexes['test-3'],
        );
      });
    });

    it('should set tabindex to 0 when focused & -1 when unfocused', () => {
      const indexes = {
        'test-1': 0,
        'test-2': 1,
        'test-3': 2,
      };

      Object.keys(indexes).forEach((id, currentFocus) => {
        const props = {
          ...menuItemProps,
          currentFocus,
          indexes,
        };

        const menuItems = renderMenuItem(props);
        const firstItem = menuItems.find('Button#test-1');
        const secondItem = menuItems.find('Button#test-2');
        const thirdItem = menuItems.find('Button#test-3');

        expect(firstItem.prop('tabIndex')).to.equal(
          currentFocus === indexes['test-1'] ? 0 : -1,
        );
        expect(secondItem.prop('tabIndex')).to.equal(
          currentFocus === indexes['test-2'] ? 0 : -1,
        );
        expect(thirdItem.prop('tabIndex')).to.equal(
          currentFocus === indexes['test-3'] ? 0 : -1,
        );
      });
    });

    it('should close menu on item select', () => {
      const closeMenu = sinon.spy();
      const props = {
        ...menuItemProps,
        closeMenu,
      };

      const menuItems = renderMenuItem(props);
      const firstButton = menuItems.find('FocusItem').first();
      firstButton.simulate('click');
      expect(closeMenu.called).to.equal(true);
    });

    it('should fire onClick function on Enter', () => {
      const selectItem = sinon.spy();
      const props = {
        ...menuItemProps,
        selectItem,
      };

      const menuItems = renderMenuItem(props);
      const secondButton = menuItems.find('Button#test-2');
      secondButton.simulate('keydown', { keyCode: 13 });
      expect(selectItem.called).to.equal(true);
    });

    it('should focus item on Enter', () => {
      const indexes = {
        'test-1': 0,
        'test-2': 1,
        'test-3': 2,
      };
      const selectItem = sinon.spy();
      const setFocus = sinon.spy();
      const props = {
        ...menuItemProps,
        setFocus,
        selectItem,
        indexes,
      };

      const menuItems = renderMenuItem(props);
      const secondButton = menuItems.find('Button#test-2');
      secondButton.simulate('keydown', { keyCode: 13 });
      expect(setFocus.called).to.equal(true);
      expect(setFocus).calledOnceWith(indexes['test-2']);
    });

    it('should focus item on Click', () => {
      const indexes = {
        'test-1': 0,
        'test-2': 1,
        'test-3': 2,
      };
      const selectItem = sinon.spy();
      const setFocus = sinon.spy();
      const props = {
        ...menuItemProps,
        setFocus,
        selectItem,
        indexes,
      };

      const menuItems = renderMenuItem(props);
      const secondButton = menuItems.find('Button#test-2');
      secondButton.simulate('click');
      expect(setFocus.called).to.equal(true);
      expect(setFocus).calledOnceWith(indexes['test-2']);
    });

    it('should not close menu on item select if `closeOnSelect` is false', () => {
      const closeMenu = sinon.spy();
      const props = {
        ...menuItemProps,
        closeMenu,
        closeOnSelect: false,
      };

      const menuItems = renderMenuItem(props);
      const firstButton = menuItems.find('FocusItem').first();
      firstButton.simulate('click');
      expect(closeMenu.called).to.equal(false);
    });
  });
});
