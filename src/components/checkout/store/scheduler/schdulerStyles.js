import styled from 'styled-components';
import { Text } from '../storeStyle';
import { device } from '../../../../utils';

export const Wrapper = styled.div`
  padding: 1rem;
`;

export const CardContainer = styled.div`
  border: 1px solid #d9d9d950;
  border-radius: 0.375rem;
  padding: 1rem;
  width: 47%;
  margin-bottom: 1rem;

  @media ${device.md} {
    ${(props) => props.width && `width: ${props.width};`}
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Choice = styled.span`
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  color: var(--gray);
`;

export const ChoiceText = styled(Text)`
  font-size: 1rem;
  margin-left: 0.35rem;
`;

export const ChoiceIcon = styled.i`
  font-size: 2rem;
`;

export const RowWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const Amount = styled.p`
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var() (--gray);
  font-weight: 600;
`;

export const Date = styled.p`
  text-align: center;
  color: var(--gray);
  font-weight: 600;
  font-size: 0.75rem;
`;

export const ProgressText = styled.p`
  font-weight: 600;
  color: var(--gray);
`;
