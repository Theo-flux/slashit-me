import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  cursor: pointer;
`;

function Logo() {
  return (
    <StyledLink href={'/'}>
      <Image src="/images/slashit.svg" width={100} height={20} alt="logo" />
    </StyledLink>
  );
}

export default Logo;
