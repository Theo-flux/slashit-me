import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <Link href={'/'}>
      <Image src="/images/slashit.svg" width={100} height={20} alt="logo" />
    </Link>
  );
}

export default Logo;
