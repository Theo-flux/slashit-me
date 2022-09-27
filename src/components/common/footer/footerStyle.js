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
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

export const UnorderList = styled.ul`
  list-style: none;
  padding: none;
`;

export const List = styled.li`
  color: var(--gray);
  margin-bottom: 1rem;
  ${transition}

  &:hover {
    transform: translateX(1rem);
  }
`;

export const StyledLink = styled.a`
  color: var(--gray);
  font-size: 1rem;
  font-weight: 300;
  text-decoration: none;
  ${transition}

  &:hover {
    width: fit-content;
    text-decoration: underline;
    color: var(--violet);
  }
`;

export const FooterAboutContainer = styled.div`
  margin: 2rem 0;

  & > p {
    font-size: .9rem;
    line-height: 1.75rem;
    font-weight: 300;
    margin-bottom: 0.8rem;
  }

  & > p:last-of-type {
    margin-bottom: 0px;
  }
`;
