import styled from 'styled-components';
import { Row } from '../storeStyle';
import { device } from '../../../../utils';

export const OrderContent = styled.div`
  /* background-color: white; */
`;

export const OrderDetails = styled.div`
  padding: 1rem 1rem 0rem 1rem;
  border-bottom: 1px solid #d9d9d950;
`;

export const Details = styled.div``;

export const OrderSummary = styled.div`
  padding: 1rem;
`;

export const InfoBox = styled.p`
  width: 100%;
  font-size: 0.75rem;
  color: var(--gray);
  opacity: 0.8;
  display: flex;
  align-items: start;
  margin-bottom: 2rem;

  & > i {
    margin-right: 0.5rem;
    font-size: 0.875rem;
  }
`;

export const InfoText = styled.p``;

export const Orders = styled.div``;

export const OrderItems = styled.div`
  /* border: 1px solid magenta; */
  /* background-color: var(--alto); */
  padding-top: 1.5rem;
  height: 200px;
  overflow-y: scroll;
`;

export const OrderedItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
export const ItemName = styled.p`
  font-size: 0.9375rem;
  color: var(--gray);
  font-weight: 500;
  /* border: 1px solid magenta; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50px;

  @media ${device.md} {
    width: 100px;
  }
`;
export const ItemQty = styled.p`
  font-size: 0.9375rem;
  color: var(--gray);
  font-weight: 500;
  text-align: right;
  /* border: 1px solid magenta; */
`;
export const ItemPrice = styled.p`
  font-size: 0.9375rem;
  color: var(--gray);
  font-weight: 500;
  text-align: right;
  /* border: 1px solid magenta; */
`;
