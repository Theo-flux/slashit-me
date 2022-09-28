import styled from 'styled-components';
import { device, transition } from '../../../utils';

export const HeroContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  @media ${device.md} {
    flex-direction: column;
  }
`;

export const InfoWrapper = styled.div`
  width: 100%;

  @media ${device.md} {
    width: 40%;
  }
`;

export const Row = styled.div`
  margin-top: 3rem;
  width: 100%;
  /* max-width: 200px; */
  display: flex;
  flex-direction: column;

  @media ${device.md} {
    margin-top: 5rem;
    max-width: 350px;
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
