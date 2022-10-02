import styled from 'styled-components';
import { Title } from '../../shared';
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

export const CareerTitle = styled(Title)``;
