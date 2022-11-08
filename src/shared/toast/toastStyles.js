import styled, { css, keyframes } from 'styled-components';
import { device, shadow } from '../../utils';

const fadein = keyframes`
  from {right: 0; opacity: 0;}
  to {right: 30px; opacity: 1;}
`;

const fadeout = keyframes`
  from {right: 30px; opacity: 1;}
  to {right: 0; opacity: 0;}
`;

const fadeinMobile = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;

const fadeoutMobile = keyframes`
  from {opacity: 1;}
  to {opacity: 0;}
`;

export const ToastContainer = styled.div`
  visibility: ${(props) => (props.showToast ? 'visible' : 'hidden')};
  ${(props) =>
    props.showToast &&
    css`
      -webkit-animation: ${fadeinMobile} 0.5s, ${fadeoutMobile} 0.5s 4.5s;
      animation: ${fadeinMobile} 0.5s, ${fadeoutMobile} 0.5s 4.5s;
    `};
  left: 0px;
  right: 0px;
  position: fixed;
  z-index: 1;
  border-radius: 0.375rem;
  padding: 0.875rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  max-width: 400px;
  margin: 0 auto;

  background-color: ${(props) =>
    props.backgroundColor ? `${props.backgroundColor}` : 'var(--gray)'};
  ${shadow}

  @media ${device.md} {
    ${(props) =>
      props.showToast &&
      css`
        -webkit-animation: ${fadein} 0.5s, ${fadeout} 0.5s 4.5s ease-out;
        animation: ${fadein} 0.5s, ${fadeout} 0.5s 4.5s ease-out;
      `};
    top: ${(props) => props.top && `${props.top}`};
    left: ${(props) => props.left && `${props.left}`};
    right: ${(props) => props.right && `${props.right}`};
    bottom: ${(props) => props.bottom && `${props.bottom}`};
  }
`;

export const ToastIcon = styled.i`
  cursor: pointer;
  font-size: 1.5rem;
  color: ${(props) => (props.textColor ? `${props.textColor}` : '#ffffff')};
`;

export const ToastText = styled.p`
  font-size: 0.675rem;
  color: ${(props) => (props.textColor ? `${props.textColor}` : '#ffffff')};
  margin-right: ${(props) => (props.showIcon ? '1rem' : '0rem')};

  @media ${device.md} {
    font-size: 0.875rem;
  }
`;
