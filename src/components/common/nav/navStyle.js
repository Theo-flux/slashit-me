import styled from 'styled-components';
import { device, transition } from '../../../utils';

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

export const UlDesktop = styled.ul`
  display: none;

  @media ${device.md} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: auto;
    list-style-type: none;
  }
`;

export const Lidesktop = styled.li`
  position: relative;
  cursor: pointer;
  margin-right: 4rem;

  &:last-child {
    margin-right: 0px;
  }

  & > div {
    display: flex;
    align-items: center;
  }

  & > div > p {
    font-weight: 600;
  }
`;

export const Ul = styled.ul`
  position: absolute;
  top: 0px;
  left: 0px;
  list-style: none;
  margin-top: 0.5rem;
  padding: 0.75rem 0.5rem;
  background-color: white;
  width: 145px;
  opacity: ${(props) => (props.dropDownId === props.id ? '1' : '0')};
  transform: ${(props) =>
    props.dropDownId === props.id ? 'translateY(2rem)' : 'translateY(0)'};
  border-radius: 0.5rem;
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
    drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  &::after {
    position: absolute;
    content: '';
    background-color: white;
    height: 13px;
    width: 13px;
    top: -7px;
    left: 20px;
    transform-origin: center;
    transform: rotate(45deg);
  }
`;

export const ChildLi = styled.li`
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  background-color: var(--link);
  transition: all 0.3ms ease-in-out;
  background-color: ${(props) => props.path === props.link && `var(--violet)`};
  color: ${(props) => props.path === props.link && `white`};

  &:last-child {
    margin-bottom: 0px;
  }

  &:hover {
    color: white;
    background-color: var(--violet);
    ${transition}
  }
`;

export const MenuIcon = styled.i`
  font-size: 2rem;
  cursor: pointer;
  /* border: 1px solid magenta; */

  @media ${device.md} {
    display: none;
  }
`;

export const Mobile = styled.div`
  position: fixed;
  top: 0px;
  left: ${(props) => (props.openMobileNav ? '0px' : '-900px')};
  opacity: ${(props) => (props.openMobileNav ? '1' : '0')};
  ${transition}
  height: 100vh;
  width: 100%;

  @media ${device.md} {
    display: none;
  }
`;

export const MobileContent = styled.div`
  position: absolute;
  top: 0px;
  width: 80%;
  height: 100%;
  background-color: white;
  left: ${(props) => (props.openMobileNav ? '0px' : '-900px')};
  ${transition}
  transition-delay: 150ms;
  opacity: ${(props) => (props.openMobileNav ? '1' : '0')};
  z-index: 4;

  @media ${device.base} {
    width: 50%;
  }
`;

export const MobileBackdrop = styled.div`
  transform: ${(props) => (props.openMobileNav ? 'scaleX(1)' : 'scaleX(0)')};
  ${transition}
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: var(--gray);
  opacity: 0.8;
  z-index: 3;
`;

export const Column = styled.div`
  padding: 2rem;
`;

export const InnerContent = styled.div`
  margin-top: 4rem;
  padding: 1rem;
`;

export const MobilePod = styled.div``;

export const Parent = styled.h4``;

export const Children = styled.div`
  padding: 1rem;
`;

export const Child = styled.div`
  margin-bottom: 1rem;

  /* &:last-of-type {
    margin-bottom: 0rem;
  } */
`;
