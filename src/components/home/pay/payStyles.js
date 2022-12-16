import styled from 'styled-components';
import { device } from '../../../utils';

export const PayForm = styled.div`
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: var(--link);
  width: 100%;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));

  overflow-y: scroll;
  height: 650px;
`;

export const PaySection = styled.div`
  border-bottom: 1px solid var(--alto);
  padding-bottom: 1rem;
  &:last-of-type {
    border: none;
  }

  &:nth-of-type(2) > div:first-child {
    cursor: pointer;
  }
`;

export const InfoBox = styled.p`
  width: 100%;
  font-size: 0.75rem;
  text-align: center;
  color: var(--gray);
  opacity: 0.8;
  margin-bottom: 2rem;
`;

export const InfoBoxRow = styled.div`
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

export const InfoText = styled.p`
  margin-right: 1rem;
`;

export const InfoMailText = styled.p`
  margin-bottom: 1rem;
  color: #00000070;
  font-weight: 500;
  font-size: 1.125rem;
`;

export const SmallBtn = styled.p`
  cursor: pointer;
  color: var(--violet);
  font-weight: 600;
`;

export const Icon = styled.i`
  margin-right: 1rem;
`;

export const Row = styled.div`
  padding: 1rem 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    font-size: 0.875rem;
  }

  & > div:nth-of-type(2) {
    font-weight: 600;
  }
`;

export const Col = styled.div`
  padding: 1rem 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const IntsallmentsContainer = styled.div``;

export const CardContainer = styled.div`
  border: 1px solid #d9d9d950;
  border-radius: 0.375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

export const Aligner = styled.div`
  margin-top: -0.8rem;
  width: 100%;
  height: 50%;
  /* border: 1px solid magenta; */
`;

export const ProgressText = styled.p`
  font-weight: 600;
  color: var(--gray);
  /* border: 1px solid magenta; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Date = styled.p`
  margin-bottom: 0.5rem;
  color: var() (--gray);
  font-weight: 600;
`;

export const Amount = styled.p`
  color: var(--silver);
`;

export const Intsallment4 = styled.div``;

export const ChargedToRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & div:nth-of-type(1) {
    margin: 0 0.35rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: 100%; */
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const IconCancel = styled(Icon)`
  margin: 0rem;
  margin-bottom: 1rem;
  align-self: flex-end;
  background-color: white;
  color: var(--silver);
  font-size: 2rem;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`;

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid magenta; */

  & > div {
    margin-bottom: 0rem;
  }

  @media ${device.md} {
    flex-direction: row;
    & > div {
      width: 45%;
    }
  }
`;

export const ProfileContainer = styled.div`
  margin: 2.5rem 0;
  display: flex;
  width: fit-content;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileImageContainer = styled.div`
  /* border: 1px solid magenta; */
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;
`;

export const ProfileName = styled.p`
  margin-left: 1rem;
  font-weight: 600;
`;
