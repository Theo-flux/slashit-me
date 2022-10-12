import styled from 'styled-components';
import { Title, Text } from '../../../shared';
import { device, shadow, transition } from '../../../utils';

export const RegisterContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 6rem auto;
`;

export const Wrapper = styled.div`
  background-color: white;
  padding: 1rem;

  @media ${device.md} {
    padding: 2rem;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & > div {
    margin-bottom: 2rem;
  }

  @media ${device.md} {
    flex-direction: row;
    & > div {
      width: 45%;
    }
  }
`;

export const Column = styled.div`
  & > div {
    margin-bottom: 2rem;
  }
`;

export const StyledTitle = styled(Title)`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;

  @media ${device.md} {
    font-size: 2rem;
  }
`;

export const StyledText = styled(Text)`
  text-align: center;
  font-size: 0.9375rem;
  margin-bottom: 3rem;

  @media ${device.md} {
    font-size: 1rem;
  }
`;

export const A = styled.p`
  margin-top: 1.5rem;
  color: var(--violet);
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;