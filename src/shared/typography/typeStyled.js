import styled from 'styled-components';
import { device } from '../../utils';

export const Titlecontainer = styled.h1`
  font-weight: 600;
  font-size: 2rem;
  line-height: 1;
  margin-bottom: 1.5rem;

  @media ${device.md} {
    font-size: 3rem;
  }

  @media ${device.lg} {
    font-size: 4rem;
  }
`;

export const H2 = styled.h2``;

export const H3 = styled.h3``;

export const H4 = styled.h4``;

export const H5 = styled.h5``;

export const H6 = styled.h6``;

export const P = styled.p``;

export const Small = styled.small``;
