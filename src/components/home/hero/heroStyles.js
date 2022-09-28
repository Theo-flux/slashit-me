import styled from 'styled-components';
import { device, transition } from '../../../utils';

export const HeroContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media ${device.md} {
    flex-direction: row;
  }
`;

export const InfoWrapper = styled.div`
  width: 100%;
  margin-top: 5rem;

  &:first-of-type {
    margin-bottom: 3rem;
  }

  @media ${device.md} {
    width: 45%;

    &:first-of-type {
      margin-bottom: 0rem;
    }

    &:last-of-type {
      width: 35%;
    }
  }
`;

export const Row = styled.div`
  margin-top: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media ${device.md} {
    margin-top: 5rem;
    max-width: 370px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  & > button {
    margin-bottom: 1rem;
  }
`;

export const Text = styled.p`
  width: 100%;
  max-width: 600px;
  font-weight: 200;
  color: var(--gray);
  opacity: 0.8;

  @media ${device.md} {
    font-size: 1.125rem;
    line-height: 2rem;
  }

  @media ${device.lg} {
    font-size: 1.35rem;
    line-height: 2rem;
  }
`;
