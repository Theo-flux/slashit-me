import styled from 'styled-components';
import { device } from '../../utils';

export const CareerContainer = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--violet);

  @media ${device.md} {
    height: 80vh;
  }

  @media ${device.lg} {
    height: 100vh;
  }
`;

export const CareerTitle = styled.h1`
  font-weight: 600;
  font-size: 2rem;
  margin-bottom: 1.5rem;

  @media ${device.md} {
    font-size: 3rem;
  }

  @media ${device.lg} {
    font-size: 3rem;
  }
  background: linear-gradient(
    140.43deg,
    #1914ff 43.26%,
    rgba(211, 33, 255, 0.86) 76.56%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
