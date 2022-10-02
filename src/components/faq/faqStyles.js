import styled from 'styled-components';
import { device, transition } from '../../utils';

export const FaqWrapper = styled.div`
  margin-top: 3rem;
`;

export const FaqCol = styled.div`
  margin-bottom: 4rem;

  &:last-of-type {
    margin-bottom: 0rem;
  }
`;

export const FaqRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;

  @media ${device.sm} {
    max-width: 300px;
  }

  @media ${device.md} {
    max-width: 350px;
  }
`;

export const FaqTitle = styled.h1`
  font-weight: 600;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;

  @media ${device.md} {
    font-size: 3rem;
  }

  @media ${device.lg} {
    font-size: 3rem;
  }
`;

export const FaqPod = styled.span`
  cursor: pointer;
  padding: 0.5rem 0.5rem;
  border: 1px solid var(--violet);
  border-radius: 0.375rem;
  color: ${(props) =>
    props.active === props.type ? `white` : `var(--violet)`};
  background-color: ${(props) =>
    props.active === props.type ? 'var(--violet)' : 'white'};
  ${transition}

  &:hover {
    color: white;
    background-color: var(--violet);
  }

  @media ${device.sm} {
    padding: 0.5rem 0.8rem;
  }

  @media ${device.md} {
    padding: 0.8rem 1.5rem;
  }
`;
