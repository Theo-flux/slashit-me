import styled from 'styled-components';
import { device } from '../../../utils';

export const HeroContainer = styled.section`
  width: 100%;
  margin-top: 2rem;
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

  &:first-of-type {
    margin-bottom: 3rem;
  }

  @media ${device.md} {
    width: 45%;

    &:first-of-type {
      margin-bottom: 0rem;
    }
  }
`;

export const Text = styled.p`
  width: 100%;
  max-width: 600px;
  font-weight: 200;
  color: ${(props) => props.color || `var(--gray)`};
  opacity: ${(props) => props.color || `0.8`};
  margin-bottom: 2rem;

  @media ${device.md} {
    font-size: 1.125rem;
    line-height: 2rem;
  }

  @media ${device.lg} {
    font-size: 1.35rem;
    line-height: 2rem;
  }
`;

export const Row = styled.div`
  margin-top: 2rem;
`;
