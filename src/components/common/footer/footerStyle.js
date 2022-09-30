import Image from 'next/image';
import styled from 'styled-components';
import { device, transition } from '../../../utils';

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  border-bottom: 0.2px solid gray;
`;

export const FooterItem = styled.div`
  width: 100%;
  margin-bottom: 2rem;

  @media ${device.md} {
    width: 16.66%;
  }
`;

export const H6 = styled.h6`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

export const UnorderList = styled.ul`
  list-style: none;
`;

export const List = styled.li`
  color: var(--gray);
  margin-bottom: 1rem;
`;

export const StyledLink = styled.a`
  color: var(--gray);
  font-size: 0.875rem;
  font-weight: 300;
  text-decoration: none;
  ${transition}

  &:hover {
    text-decoration: underline;
    color: var(--violet);
    transform: translateX(1rem);
  }
`;

export const FooterAboutContainer = styled.div`
  margin: 2rem 0;

  & > p {
    font-size: 0.9rem;
    line-height: 1.75rem;
    font-weight: 300;
    margin-bottom: 0.8rem;
  }

  & > p:last-of-type {
    margin-bottom: 0px;
  }
`;

export const Wrapper = styled.div`
  width: fit-content;
  justify-items: end;

  & > div {
    margin-bottom: 1.5rem;
  }
`;

export const Row = styled.div`
  margin-top: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100px;
`;

export const Img = styled(Image)`
  transform: scale(0.7);
  ${transition}

  &:hover {
    transform: scale(0.8);
  }
`;
