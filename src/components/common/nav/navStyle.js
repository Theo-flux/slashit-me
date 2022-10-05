import styled from 'styled-components';
import { device, transition } from '../../../utils';

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
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
    font-weight: 500;
    font-size: 0.875rem;
  }
`;

export const Ul = styled.ul`
  position: absolute;
  top: 0px;
  left: 0px;
  list-style: none;
  margin-top: 1rem;
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
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
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
  font-size: 1.5rem;
  cursor: pointer;
  /* border: 1px solid magenta; */

  @media ${device.md} {
    display: none;
  }
`;

export const CloseIcon = styled.i`
  font-size: 1.5rem;
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
  width: 100%;
  height: 100%;
  background-color: white;
  left: ${(props) => (props.openMobileNav ? '0px' : '-900px')};
  ${transition}
  transition-delay: 150ms;
  opacity: ${(props) => (props.openMobileNav ? '1' : '0')};
  z-index: 4;
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
  border: '1px solid magenta';
`;

export const InnerContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.3rem 1rem;
`;

export const ItemContainer = styled.div``;

export const MobilePod = styled.div`
  border-bottom: 0.3px dashed var(--gray);
  padding: 2rem;

  &:last-of-type {
    border: none;
  }
`;

export const Parent = styled.h4`
  color: var(--silver);
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 400;
`;

export const Children = styled.div`
  padding: 1.5rem 1rem 0rem 1rem;
`;

export const Child = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: flex-start;
  cursor: pointer;

  &:last-of-type {
    margin-bottom: 0rem;
  }
`;

export const ChildTitle = styled.h4`
  margin-bottom: 0.375rem;
`;

export const ChildText = styled.small`
  font-size: 0.75rem;
`;

export const Row = styled.div`
  width: 80%;
  margin-left: 1rem;
`;
