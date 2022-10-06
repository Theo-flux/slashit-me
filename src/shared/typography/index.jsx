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

