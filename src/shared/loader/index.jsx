import React from 'react';
import { LoaderContainer, LoadRing } from './loaderStyles';

const Loader = () => {
  return (
    <LoadRing>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoadRing>
  );
};

export { Loader, LoaderContainer };
