import styled from 'styled-components';
import { device, transition } from '../../utils';

export const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid black;
  border-radius: 0.375rem;
  padding: .25rem .5rem;
  margin-bottom: .5rem;
`;

export const Icon = styled.i`
    font-size: 1.5rem;
`;

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const P = styled.p`
    font-size: .6rem;
    font-weight: 200;
`;

export const H3 = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
`;
