import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
    <section className="container">
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  </Fragment>
  </section>
);

export default Spinner;