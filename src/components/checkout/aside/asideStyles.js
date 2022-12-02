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

  @media ${device.lg} {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 0px;
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

  ${(props) => props.activeTab === props.tab && `background-color: #ffffff40;`}

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
  font-weight: 600;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SmallText = styled.p`
  color: var(--gray);
  font-weight: 700;
`;

export const Terms = styled.p`
  margin-top: 2rem;
  color: #00000050;
  font-size: 0.875rem;
  font-weight: 500;
`;
