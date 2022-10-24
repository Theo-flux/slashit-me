import styled from 'styled-components';
import { device, transition } from '../../../utils';

export const Cmpt = styled.section`
  display: flex;
  flex-direction: column;

  @media ${device.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
