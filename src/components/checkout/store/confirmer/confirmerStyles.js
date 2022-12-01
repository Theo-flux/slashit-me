import styled from 'styled-components';
import { Title, Text } from '../../../../shared';
import { device, transition } from '../../../../utils';

export const Wrapper = styled.div`
  /* border: 1px solid magenta; */
`;

export const ContentBox = styled.div`
  border-bottom: 1px solid var(--border);
  padding: 1rem 1rem 2rem 1rem;
`;

export const InnerContent = styled.div``;

export const StyledTitle = styled(Title)`
  font-size: 1rem;
  margin: 1rem 0rem;
`;

export const PayTitle = styled(StyledTitle)`
  margin: 0rem;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
`;

export const AmountContainer = styled.div`
  border: 1px solid var(--border);
  padding: 1rem;
  color: var(--silver);
  font-size: 1.25rem;
  font-weight: 700;
  border-radius: 0.375rem;
`;

export const PaymentMethodContainer = styled.div`
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  overflow: hidden;
`;

export const PaymentMethodInner = styled.div`
  padding: 1rem;

  &:first-of-type {
    border-bottom: 1px solid var(--border);
  }
`;

export const PaymentMethod = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PaymentIcon = styled.i`
  font-size: 2rem;
  margin-right: 1rem;
  ${(props) => props.color && `color: ${props.color};`}
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Column = styled.div`
  /* border: 1px solid magenta; */
`;

export const ChangeBtn = styled.button`
  padding: 0.5rem;
  border: 1px solid var(--gray);
  border-radius: 0.375rem;
  color: var(--gray);
  background-color: white;
  ${transition}

  &:hover {
    background-color: var(--gray);
    color: white;
  }
`;

export const NewTag = styled(ChangeBtn)`
  padding: 0.375rem;
  background-color: #1dbd4a;
  color: white;
  border: none;

  &:hover {
    background-color: #1dbd4a;
    color: white;
  }
`;

export const ExtraText = styled.p`
  color: var(--silver);
  font-weight: 700;
`;

export const Bottom = styled.div`
  height: 150px;
  overflow-y: scroll;
`;

export const BottomRow = styled(Row)`
  justify-content: start;
  cursor: pointer;
`;
