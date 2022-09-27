import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Section, Div, Logo } from '../../../shared';
import { Nav, UlDesktop, Lidesktop, Ul, ChildLi } from './navStyle';
import { navItems } from './nav_items';

function Navbar() {
  const ref = useRef();
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
    const outsideClicks = (e) => {
      if (dropDownId && ref.current && !ref.current.contains(e.target)) {
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
    <Section ref={ref}>
      <Div>
        <Nav>
          <div style={{ width: '100%' }}>
            <Logo />
          </div>
          <UlDesktop>
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
                      return <ChildLi key={index}>{item}</ChildLi>;
                    })}
                  </Ul>
                </Lidesktop>
              );
            })}
          </UlDesktop>

          
        </Nav>
      </Div>
    </Section>
  );
}

export default Navbar;
