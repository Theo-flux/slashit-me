import React from 'react';
import { SectionContainer } from './section';

function Section({ children, bg }) {
  return <SectionContainer bg={bg}>{children}</SectionContainer>;
}

export default Section;
