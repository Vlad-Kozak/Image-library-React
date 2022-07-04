import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

function Button({ onClick }) {
  return (
    <button className={s.button} onClick={onClick}>
      Загрузить больше...
    </button>
  );
}

Button.propTypes = { onClick: PropTypes.func.isRequired };

export default Button;
