import styled from 'styled-components';
import { device } from '../../utils';

export const Title = styled.h1`
  font-weight: 600;
  font-size: 2rem;
  margin-bottom: 1.5rem;

  @media ${device.md} {
    font-size: 3rem;
  }

  @media ${device.lg} {
    font-size: 3rem;
  }
`;

export const Text = styled.p`
  width: 100%;
  max-width: 600px;
  font-weight: 200;
  color: var(--gray);
  opacity: 0.8;
  font-size: 0.625rem;

  @media ${device.md} {
    font-size: 1.125rem;
  }

  @media ${device.lg} {
    font-size: 1.125rem;
  }
`;
