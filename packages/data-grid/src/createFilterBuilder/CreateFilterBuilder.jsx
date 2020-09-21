import React, { Component } from 'react';
import { Button, Form, Card, Icon } from '@puppet/react-components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './CreateFilterBuilder.scss';

const propTypes = {
  /**
   * This prop is automatically passed from the withID HOC
   * @ignore
   */
  id: PropTypes.string.isRequired,
  /** An Array of action objects */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      /** Unique action id */
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      /** Action text */
      label: PropTypes.node.isRequired,
      /** Optional icon rendered to the left of action text */
      icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
      /** Optional custom icon rendered to the left of action text */
      svg: PropTypes.element,
      /** Action click handler. Not needed if the action is a link */
      onClick: PropTypes.func,
      /** Custom action element. Useful for creating navigation actions with as: 'a' or as: Link. Additionally, extra props not listed here are passed through to the action element. This allows custom props such as `href` or `to` to be passed to the inner action element. */
      as: PropTypes.elementType,
    }),
  ),
  buttonLabel: PropTypes.string,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  /** Main visual variant */
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'transparent',
    'text',
  ]),
  /** If true, a focused button will use an inner instead of outer outline */
  innerFocus: PropTypes.bool,
  /** Additional property used for connotative variants (such as danger) to choose between a strong and soft version */
  weight: PropTypes.oneOf(['bold', 'subtle']),
  /** Optional icon to be rendered instead of / in addition to button text. If both an icon and text are present, the icon will be rendered before the text */
  icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
  /** Is the button disabled?  */
  disabled: PropTypes.bool,
  /** If true, button will render with a loading spinner */
  loading: PropTypes.bool,
  /** Optional additional className passed to the outer element */
  className: PropTypes.string,
  /** Optional inline width passed to the button element */
  width: PropTypes.string,
  /** Optional inline style passed to the outer element */
  style: PropTypes.shape({}),
};

const defaultProps = {
  actions: [],
  buttonLabel: 'Create filter',
  submitLabel: 'Apply',
  cancelLabel: 'Cancel',
  type: 'primary',
  innerFocus: false,
  weight: 'bold',
  icon: null,
  loading: false,
  disabled: false,
  className: '',
  width: null,
  style: {},
};

class CreateFilterBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, menuStyle: {} };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.focusButton = this.focusButton.bind(this);
    this.focusMenu = this.focusMenu.bind(this);
    this.closeAndFocusButton = this.closeAndFocusButton.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onClickButton(e) {
    e.stopPropagation();
    const { open } = this.state;

    if (open) {
      this.close();
    } else {
      this.open();
    }
  }

  onBlur(e) {
    if (!this.container.contains(e.relatedTarget)) {
      this.close();
    }
  }

  closeAndFocusButton() {
    this.close();
    this.focusButton();
  }

  open() {
    // const { anchor } = this.props;

    this.setState({ open: true }, this.focusMenu);
  }

  close() {
    this.setState({ open: false });
  }

  focusMenu() {
    focus(this.menu);
  }

  focusButton() {
    if (this.button) {
      focus(this.button);
    }
  }

  render() {
    const { open } = this.state;
    const {
      id,
      buttonLabel,
      submitLabel,
      cancelLabel,
      type,
      innerFocus,
      icon,
      disabled,
      loading,
      weight,
      className,
      width,
      style,
    } = this.props;

    const movieOptions = [
      { value: 'american-treasure', label: 'American Treasure' },
      { value: 'ghost-rider', label: 'Ghost Rider' },
      { value: 'point_break', label: 'Point Break' },
    ];

    return (
      <div>
        <Button
          type={type}
          innerFocus={innerFocus}
          weight={weight}
          icon={icon}
          trailingIcon={icon ? null : 'chevron-down'}
          style={(width ? { width, textAlign: 'left' } : null, style)}
          disabled={disabled}
          loading={loading}
          aria-haspopup="true"
          aria-controls={`${id}-menu`}
          aria-expanded={open}
          onClick={this.onClickButton}
          ref={button => {
            this.button = button;
          }}
        >
          {buttonLabel}
        </Button>
        {/* <FilterTemplate className="dg-filter-template" /> */}
        <Card
          className={classNames(
            'dg-filter-template-container',
            {
              'dg-filter-template-closed': !open,
            },
            className,
          )}
        >
          <Form
            submittable
            cancellable
            // initialValues={values}
            // submitting={submitting}
            onSubmit={this.onSubmit}
            labelType="secondary"
            actionsPosition="right"
            // inlineLabelWidth={180} // default
            submitLabel={submitLabel}
            cancelLabel={cancelLabel}
          >
            <Form.Field
              type="select"
              name="field"
              autoComplete="Name"
              label="FIELD"
              placeholder="Name"
              options={movieOptions}
            />
            <Form.Field
              type="select"
              name="lName"
              autoComplete="lastname"
              label="OPERATOR"
              placeholder="Contains"
            />
            <Form.Field
              type="text"
              name="value"
              label="VALUE"
              placeholder="Enter a string or number"
              //   options={movieOptions}
            />
          </Form>
        </Card>
      </div>
    );
  }
}

CreateFilterBuilder.propTypes = propTypes;
CreateFilterBuilder.defaultProps = defaultProps;

export default CreateFilterBuilder;
