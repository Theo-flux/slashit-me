import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import { Section, NavWrapper, Logo } from '../../../shared';
import { navItems, mobileNavItems } from './nav_items';
import {
  Nav,
  UlDesktop,
  Lidesktop,
  Ul,
  ChildLi,
  MenuIcon,
  CloseIcon,
  Mobile,
  MobileContent,
  MobileBackdrop,
  InnerContent,
  Column,
  MobilePod,
  Parent,
  Children,
  Child,
  ChildTitle,
  ChildText,
  ItemContainer,
  Row,
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
          <MenuIcon
            onClick={() => handleMobileNav()}
            className="ri-menu-fill"
          ></MenuIcon>
        </Nav>
      </NavWrapper>
      <Mobile openMobileNav={openMobileNav}>
        <MobileContent openMobileNav={openMobileNav}>
          <Column>
            <InnerContent>
              <Logo />
              <CloseIcon
                onClick={() => handleMobileNav()}
                className="ri-close-fill"
              />
            </InnerContent>

            <ItemContainer>
              {mobileNavItems.map((navItem, index) => {
                const { item, children } = navItem;
                return (
                  <MobilePod key={index}>
                    <Parent>{item}</Parent>
                    <Children>
                      {children.map((child, index) => {
                        const { title, text, icon, link } = child;
                        return (
                          <Link href={link} key={index}>
                            <Child>
                              <Image
                                src={icon}
                                width={20}
                                height={20}
                                alt={'icon'}
                              />
                              <Row>
                                <ChildTitle>{title}</ChildTitle>
                                <ChildText>{text}</ChildText>
                              </Row>
                            </Child>
                          </Link>
                        );
                      })}
                    </Children>
                  </MobilePod>
                );
              })}
            </ItemContainer>
          </Column>
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
