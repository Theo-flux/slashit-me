import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import { Section, NavWrapper, Logo } from '../../../shared';
import { Nav, UlDesktop, Lidesktop, Ul, ChildLi } from './navStyle';
import { navItems } from './nav_items';

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
    const scrollY = document.body.style.top;
    if (openMobileNav) {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * 1);
    }
  }, [openMobileNav]);

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
        </Nav>
      </NavWrapper>
    </Section>
  );
}

export default Navbar;
