import React from 'react';
import { SectionContainer } from './section';

function Section({ children, bg, type }) {
  return (
    <SectionContainer type={type} bg={bg}>
      {children}
    </SectionContainer>
  );
}

export default Section;
