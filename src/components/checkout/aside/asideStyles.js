import styled from 'styled-components';
import { device, transition } from '../../../utils';

export const AsideContainer = styled.aside`
  display: none;
  height: 100vh;
  padding-top: 3rem;
  background: linear-gradient(
    115.34deg,
    rgba(108, 33, 255, 0.3) 54.39%,
    rgba(255, 0, 214, 0.3) 72.64%
  );

  @media ${device.md} {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const AsideWrapper = styled.div`
  width: 90%;
  
  max-width: 400px;
`;

export const ItemPod = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1.5rem 1rem;
  margin-bottom: 1rem;
  border-radius: 0.375rem;
  cursor: pointer;

  &:first-of-type {
    background-color: #ffffff40;
  }

  &:hover {
    background-color: #ffffff40;
  }
`;

export const Icon = styled.i`
  margin-right: 1rem;
  font-size: 1.5rem;
`;

export const ItemText = styled.p`
  font-size: 1rem;
`;
