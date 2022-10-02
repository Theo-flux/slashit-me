import styled from 'styled-components';
import { device } from '../../../utils';

export const CreditContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media ${device.md} {
    flex-direction: row;
  }
`;

export const InfoWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${device.md} {
    width: 45%;

    &:first-of-type {
      margin-bottom: 0rem;
      display: block;
    }
  }
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;

  @media ${device.md} {
    font-size: 3rem;
    text-align: left;
  }

  @media ${device.lg} {
    font-size: 3rem;
  }
`;

export const Text = styled.p`
  width: 100%;
  max-width: 600px;
  text-align: center;
  font-weight: 200;
  color: ${(props) => props.color || `var(--gray)`};
  opacity: ${(props) => props.color || `0.8`};

  @media ${device.md} {
    font-size: 1.125rem;
    line-height: 2rem;
  }

  @media ${device.lg} {
    font-size: 1.35rem;
    line-height: 2rem;
    text-align: left;
  }
`;

export const Bottom = styled.div`
  width: 90%;
  margin-top: 2rem;
  height: auto;

  @media ${device.md} {
    width: fit-content;
  }
`;

export const Step = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  top: 0px;
  left: 0px;
  height: 100%;
  display: flex;
`;

export const Line = styled.div`
  border-left: 1px dotted black;
  height: 300px;
`;

export const Innner = styled.div`
  margin-left: -40px;
  z-index: 1;
`;

export const StepCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 4rem;
  &:last-of-type {
    margin-bottom: 0px;
  }
`;

export const NumDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

export const Num = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(108, 33, 255, 0.2) 0%,
    rgba(237, 33, 255, 0.108) 100%
  );
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--violet);
  font-size: 1.25rem;
  font-weight: 600;
`;

export const Info = styled.div`
  width: 220px;

  @media ${device.lg} {
    width: 300px;
  }
`;

export const InfoTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const InfoDescription = styled.p`
  font-weight: 300;
`;
