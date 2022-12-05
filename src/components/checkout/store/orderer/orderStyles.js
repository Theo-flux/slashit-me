import styled from 'styled-components';
import Image from 'next/image';
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

export const InfoBox = styled.div`
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

export const InfoMailText = styled.p`
  margin-bottom: 1rem;
  color: #00000070;
  font-weight: 500;
  font-size: 1.125rem;
`;

export const Orders = styled.div``;

export const OrderItems = styled.div`
  /* border: 1px solid magenta; */
  /* background-color: var(--alto); */
  padding-top: 1.5rem;
  height: 127px;
  overflow-y: scroll;
`;

export const OrderedItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.85rem;
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

export const SubTotalContainer = styled.div`
  border-top: 1px solid #d9d9d950;
  border-bottom: 1px solid #d9d9d950;
  margin-top: 1rem;
  padding: 1rem 0rem;
`;

export const SubTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
`;

export const Shipping = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: centers;
`;
export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: centers;
  padding: 1rem 0rem;
  border-bottom: 1px solid #d9d9d950;
`;

export const SubtotalText = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;
export const ShippingText = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;
export const TotalText = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;
export const SubtotalPrice = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;
export const ShippingPrice = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;
export const TotalPrice = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

export const SmallBtn = styled.p`
  color: var(--violet);
  font-weight: 600;
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  margin-bottom: 1rem;
`;

export const UserInitials = styled.span`
  width: 50px;
  height: 50px;
  background-color: #e4d8fd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 1.125rem;
  font-weight: 600;
`;

export const StyledAvatarImage = styled(Image)`
  border-radius: 50%;
`;

export const UserName = styled.p`
  margin-left: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
`;
