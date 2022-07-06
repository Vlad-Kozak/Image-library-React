import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

import React from 'react';

function Loader() {
  return (
    <div className={s.loader}>
      <ThreeDots height="60" width="100" color="#3f51b5" ariaLabel="loading" />
    </div>
  );
}

export default Loader;
