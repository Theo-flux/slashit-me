import styled from 'styled-components';
import { StyledButton } from '../../../shared/buttons/button';
import { device, transition } from '../../../utils';

export const CardContainer = styled.div`
  border-radius: 0.875rem;
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
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
`;

export const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 700;

  & > sup {
    font-size: 0.675rem;
    margin-right: 0.5rem;
  }

  @media ${device.md} {
    font-size: 1.75rem;
  }

  @media ${device.lg} {
    font-size: 2rem;
  }
`;

export const Small = styled.small`
  font-weight: 300;
  font-size: 0.875rem;
  margin-right: 0.5rem;
`;

export const BenefitContainer = styled.div`
  margin-top: 2rem;
  border-radius: 0.375rem;
  padding: 2rem;
  background-color: white;
  ${transition}

  &:hover {
    filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
  }
`;

export const BenefitItem = styled.div`
  margin-bottom: 1rem;
  font-size: 0.9375rem;
  display: flex;
  align-items: center;
`;

export const Icon = styled.i`
  margin-right: 0.5rem;
`;

export const Button = styled(StyledButton)`
  margin-top: 1.5rem;
  padding: 1rem;
  width: 100%;
  font-size: 0.675rem;

  @media ${device.md} {
    font-size: 0.875rem;
  }

  @media ${device.md} {
    font-size: 1rem;
  }
`;

export const InfoContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
`;

export const InfoItem = styled.p`
  margin-bottom: 1rem;
  font-size: 0.675rem;
`;
