import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => <button {...props}>{props.value}</button>;

Button.propTypes = {
	styleClass: PropTypes.string,
	value: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string
};

Button.defaultProps = {
	styleClass: 'btn-primary'
};

export default Button;
