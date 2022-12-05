import styled from 'styled-components';
import { transition } from '../../utils';

export const Progress = styled.div`
  width: 100%;
  height: 3px;
  background-color: var(--brown);
`;

export const Bar = styled.div`
  width: ${(props) => (props.meter ? `${props.meter}` : `0%`)};
  height: 100%;
  background-color: ${(props) =>
    props.bgColor ? `${props.bgColor}` : `var(--violet)`};
  ${transition}
`;
