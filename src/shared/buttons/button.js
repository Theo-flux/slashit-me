import styled from 'styled-components';
import { device, transition } from '../../utils';

export const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid black;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.5rem;
`;

export const Icon = styled.i`
  font-size: 2rem;
  margin-right: 0.3rem;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const P = styled.p`
  font-size: 0.6rem;
  font-weight: 200;
`;

export const H3 = styled.h3`
  font-size: 1rem;
  font-weight: 600;
`;

export const AnchorButton = styled.button`
  background-color: ${(props) =>
    props.type === 'outlined' ? 'white' : props.bg || 'var(--gray)'};
  border: 1px solid ${(props) => props.bg || 'var(--gray)'};
  padding: 1rem 3rem;
  border-radius: 0.375rem;
  color: ${(props) => (props.type === 'outlined' ? 'var(--gray)' : 'white')};
  font-size: 1.125rem;
  font-weight: 600;
  outline: 0;
`;
