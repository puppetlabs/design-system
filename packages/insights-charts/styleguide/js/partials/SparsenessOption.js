import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setOption } from '../store/actions';

const propTypes = {
  sparseness: PropTypes.number.isRequired,
  onBlur: PropTypes.func.isRequired,
};

class SparsenessOption extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.sparseness,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.sparseness,
    });
  }

  onChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const { onBlur } = this.props;
    const { value } = this.state;

    return (
      <input type="text" value={ value } onChange={ this.onChange } onBlur={ onBlur } />
    );
  }
}

SparsenessOption.propTypes = propTypes;

const mapStateToProps = state => ({
  sparseness: state.options.sparseness,
});

const mapDispatchToProps = dispatch => ({
  onBlur: event => {
    dispatch(setOption('sparseness', parseInt(event.target.value, 10)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SparsenessOption);
