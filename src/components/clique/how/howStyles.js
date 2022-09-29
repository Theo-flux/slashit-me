import styled from 'styled-components';
import { device } from '../../../utils';

export const HowContainer = styled.section`
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

  &:first-of-type {
    margin-bottom: 3rem;
    display: none;
  }

  @media ${device.md} {
    width: 45%;

    &:first-of-type {
      margin-bottom: 0rem;
      display: block;
    }
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
  background-color: var(--link);
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
`;

export const InfoTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const InfoDescription = styled.p`
  font-weight: 300;
`;
