import styled from 'styled-components';
import { device, transition } from '../../utils';

export const CardContainer = styled.div`
  border-radius: 0.375rem;
  width: 100%;
  height: auto;
  background: ${(props) =>
    props.bg && `linear-gradient(180deg, ${props.bg} 50%, #d9d9d9 50%)`};
`;

export const CardContent = styled.div`
  padding: 2rem;
`;

export const PlanType = styled.div`
  margin-top: 2rem;
  color: white;
`;

export const Type = styled.div`
  font-weight: 400;
  font-size: 1.125rem;
`;

export const Price = styled.div`
  font-size: 1.125rem;
  font-weight: 700;

  & > sup {
    font-size: 0.875rem;
    margin-right: 0.5rem;
  }
`;

export const BenefitContainer = styled.div`
  margin-top: 2rem;
  border-radius: 0.375rem;
  padding: 2rem;
  background-color: white;
`;

export const BenefitItem = styled.div``;
