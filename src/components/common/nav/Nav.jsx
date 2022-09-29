import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import { Section, NavWrapper, Logo } from '../../../shared';
import { navItems } from './nav_items';
import {
  Nav,
  UlDesktop,
  Lidesktop,
  Ul,
  ChildLi,
  MenuIcon,
  Mobile,
  MobileContent,
  MobileBackdrop,
} from './navStyle';

function Navbar() {
  const router = useRouter();
  const [openMobileNav, setMobileNav] = useState(false);
  const [mobileNavItem, setMobileNavItem] = useState(null);
  const [dropDownId, setDropdownId] = useState(null);

  const handleDropdownId = useCallback(
    (id) => {
      if (dropDownId === id) {
        return setDropdownId(null);
      }
      setDropdownId(id);
    },
    [dropDownId],
  );

  console.log(router.pathname);

  function handleMobileNavItem(ref) {
    if (mobileNavItem === ref) {
      return setMobileNavItem(null);
    }
    setMobileNavItem(ref);
  }

  function handleMobileNav() {
    setMobileNav(!openMobileNav);
  }

  useEffect(() => {
    const ref = document.getElementById('ref');
    const outsideClicks = (e) => {
      if (dropDownId && ref && !ref.contains(e.target)) {
        handleDropdownId(null);
      }
    };
    document.addEventListener('mousedown', outsideClicks);
    document.addEventListener('scroll', outsideClicks);

    return () => {
      document.removeEventListener('mousedown', outsideClicks);
      document.addEventListener('scroll', outsideClicks);
    };
  }, [dropDownId, handleDropdownId]);

  return (
    <Section type={'fixed'}>
      <NavWrapper>
        <Nav>
          <div style={{ width: '100%' }}>
            <Logo />
          </div>
          <UlDesktop id="ref">
            {navItems.map((navItem, index) => {
              const { id, item, children, icon } = navItem;
              return (
                <Lidesktop key={index} onClick={() => handleDropdownId(id)}>
                  <div>
                    <p>{item}</p>
                  </div>

                  <Ul id={id} dropDownId={dropDownId}>
                    {children.map((child, index) => {
                      const { item, link } = child;
                      return (
                        <Link key={index} href={link}>
                          <ChildLi link={link} path={router.pathname}>
                            {item}
                          </ChildLi>
                        </Link>
                      );
                    })}
                  </Ul>
                </Lidesktop>
              );
            })}
          </UlDesktop>
          <MenuIcon onClick={() => handleMobileNav()}>
            <svg
              width="25"
              height="16"
              viewBox="0 0 25 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="25" height="2" fill="currentColor"></rect>
              <rect y="14" width="25" height="2" fill="currentColor"></rect>
            </svg>
          </MenuIcon>
        </Nav>
      </NavWrapper>
      <Mobile openMobileNav={openMobileNav}>
        <MobileContent openMobileNav={openMobileNav}>
          mobile content
        </MobileContent>
        <MobileBackdrop
          openMobileNav={openMobileNav}
          onClick={() => handleMobileNav()}
        />
      </Mobile>
    </Section>
  );
}

export default Navbar;
