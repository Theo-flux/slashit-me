import styled, { keyframes } from 'styled-components';
import { device, shadow } from '../../utils';

const fadein = keyframes`
  from {right: 0; opacity: 0;}
  to {right: 30px; opacity: 1;}
`;

const fadeout = keyframes`
  from {right: 30px; opacity: 1;}
  to {right: 0; opacity: 0;}
`;

export const ToastContainer = styled.div`
  /* visibility: hidden;
  -webkit-animation: ${fadein} 0.5s, fadeout 0.5s 2.5s;
  animation: ${fadein} 0.5s, ${fadeout} 0.5s 2.5s; */
  position: fixed;
  top: ${(props) => props.top && `${props.top}`};
  left: ${(props) => props.left && `${props.left}`};
  right: ${(props) => props.right && `${props.right}`};
  bottom: ${(props) => props.bottom && `${props.bottom}`};
  z-index: 999;
  border-radius: 0.375rem;
  padding: 0.875rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: fit-content;

  background-color: ${(props) =>
    props.backgroundColor ? `${props.backgroundColor}` : 'var(--gray)'};
  ${shadow}

  @media ${device.md} {
  }
`;

export const ToastIcon = styled.i`
  cursor: pointer;
  font-size: 1.5rem;
  color: ${(props) => (props.textColor ? `${props.textColor}` : '#ffffff')};
`;

export const ToastText = styled.p`
  color: ${(props) => (props.textColor ? `${props.textColor}` : '#ffffff')};
  margin-right: ${(props) => (props.showIcon ? '1rem' : '0rem')};
`;
