import styled from 'styled-components';
import { device, transition } from '../../../utils';

export const FaqCardContainer = styled.div`
  background-color: white;
  filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))
    drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
  border-radius: 0.375rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 1.5rem;

  &:last-of-type {
    margin-bottom: 0rem;
  }
`;

export const FaqQuestionBox = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${transition}
  margin-bottom: ${(props) => (props.id === props.target ? '1rem' : '0rem')};
`;

export const FaqQuestion = styled.h3`
  width: 80%;
  font-size: 1.125rem;
  font-weight: 500;
`;

export const Icon = styled.i`
  font-size: 1.5rem;
  ${transition}
  transform: ${(props) =>
    props.id === props.target ? `rotate(180deg)` : `rotate(0deg)`};
`;
export const FaqAnswer = styled.div``;
