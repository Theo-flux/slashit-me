import styled from 'styled-components';
import { device } from '../../utils';

export const ToastContainer = styled.div`
  position: fixed;
  z-index: 999;
  border-radius: 0.375rem;
  padding: 1rem 2rem;
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) =>
    props.backgroundColor ? `${props.backgroundColor}` : 'var(--gray)'};
`;

export const ToastIcon = styled.i`
  color: ${(props) => (props.textColor ? `${props.textColor}` : '#ffffff')};
`;

export const ToastText = styled.p`
  color: ${(props) => (props.textColor ? `${props.textColor}` : '#ffffff')};
  margin-right: ${(props) => (props.showIcon ? '1rem' : '0rem')};
`;
