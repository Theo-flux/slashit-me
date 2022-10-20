import styled from 'styled-components';
import { device, shadow } from '../../../utils';

export const GenerateLinkForm = styled.div`
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: white;
  width: 100%;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`;

export const LinkSection = styled.div`
  border-bottom: 1px solid var(--alto);
  padding-bottom: 1rem;
  &:last-of-type {
    border: none;
  }

  &:focus input:nth-child(1) {
    border: 1px solid var(--violet);
  }
`;

export const InfoBox = styled.div`
  width: 100%;
  font-size: 0.75rem;
  text-align: center;
  color: var(--gray);
  opacity: 0.8;
  margin-bottom: 2rem;

  & > p {
    margin-left: 1rem;
  }
`;

export const Icon = styled.i`
  font-size: ${(props) => props.size};
`;

export const CloseIcon = styled.i`
  font-size: 1.5rem;
  background-color: white;
  border-radius: 100px;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${shadow}
  cursor: pointer;
`;

export const CheckIcon = styled.i`
  font-size: 6rem;
  color: var(--violet);
`;

export const Row = styled.div`
  /* padding: 1rem 0px; */
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    font-size: 0.875rem;
  }
`;

export const Col = styled.div`
  padding: 1rem 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LinkMessage = styled.h3`
  font-size: 1.125rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export const LinkInfo = styled.p`
  font-size: 0.875rem;
  width: 250px;
  text-align: center;
  margin-bottom: 3rem;

  &:last-of-type {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

export const MailContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--alto);
  border-radius: 0.375rem;
`;

export const MailInput = styled.input`
  border-radius: 0.375rem;
  padding: 1rem;
  border: none;
  width: 100%;
  outline: 0px;
  height: 100%;
`;

export const ArrowIcon = styled.i`
  font-size: 2.5rem;
  margin: 0rem 0.8rem;
  color: var(--gray);
`;
