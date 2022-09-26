import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { device } from '../utils';

const Img = styled.img`
  height: 20px;

  @media ${device.md} {
    height: 30px;
  }
`;

function Logo() {
  return (
    <Link href={'/'}>
      <Img src="/images/slashit.svg" />
    </Link>
  );
}

export default Logo;
