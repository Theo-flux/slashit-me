import styled from 'styled-components';
import { device, transition } from '../../utils';

export const AcceptContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  @media ${device.md} {
    font-size: 2rem;
  }

  @media ${device.lg} {
    font-size: 2.5rem;
  }
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

export const IconCheck = styled.i`
  font-size: 2rem;
  ${transition}
  color: ${(props) =>
    props.selectStore ? `var(--violet)` : `var(--silver)`}; ;
`;

export const SubTitle = styled(Title)`
  font-size: 1rem;
  margin: 2rem 0;

  @media ${device.md} {
    font-size: 1.5rem;
  }
`;

export const Text = styled.p`
  width: 100%;
  max-width: 600px;
  font-weight: 200;
  text-align: center;
  color: ${(props) => props.color || `var(--gray)`};
  opacity: ${(props) => props.color || `0.8`};
  margin-bottom: 2rem;

  @media ${device.md} {
    font-size: 0.875rem;
    margin-bottom: 3rem;
  }

  @media ${device.lg} {
    font-size: 1rem;
  }
`;

export const SelectStoreContainer = styled.div`
  padding: 1rem;
  margin: 3rem auto;
  width: 100%;
  background-color: white;
  max-width: 400px;
  border: ${(props) =>
    props.selectStore ? `1px solid var(--violet)` : `1px solid var(--silver)`};
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${transition}

  &:hover {
    border: 1px solid var(--violet);
  }

  &:hover > div > i {
    color: var(--violet);
  }
`;
