import styled from 'styled-components';
import { InputContainer } from '../../../shared';

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
`;

export const InfoBox = styled.p`
  width: 100%;
  font-size: 0.75rem;
  text-align: center;
  color: var(--gray);
  opacity: 0.8;
  margin-bottom: 2rem;
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
`;

export const Col = styled.div`
  padding: 1rem 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
