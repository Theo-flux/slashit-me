import styled from 'styled-components';
import { device, transition } from '../../../utils';

export const Cmpt = styled.section`
  position: relative;
  top: 0px;
  left: 0px;
  width: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  /* height: 100vh; */

  @media ${device.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
