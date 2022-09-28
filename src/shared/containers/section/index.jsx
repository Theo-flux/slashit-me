import React from 'react';
import { SectionContainer } from './section';

function Section({ children, bg, type, ref }) {
  return (
    <SectionContainer ref={ref} type={type} bg={bg}>
      {children}
    </SectionContainer>
  );
}

export default Section;
