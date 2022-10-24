import Image from 'next/image';
import styled from 'styled-components';
import { Title, Text } from '../../shared';
import { device, shadow, transition } from '../../utils';

export const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 500px;
  margin: 0rem auto;
`;

export const Wrapper = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.375rem;

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

export const Content = styled.div`
  width: 100%;
  margin: 4rem auto;
  max-width: fit-content;
  /* border: 1px solid magenta; */

  & input:last-of-type {
    margin: 0rem;
  }
`;

export const StyledTitle = styled(Title)`
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;

  @media ${device.lg} {
    font-size: 1.5rem;
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

export const CardBox = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

export const CardDetails = styled.p`
  font-size: 0.875rem;
  margin-bottom: 0.7rem;
`;

export const InnerBoxRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--alto);
  border-radius: 0.375rem;
  padding: 0 1rem;

  & > div {
    border-radius: 0rem;
    border: 0rem;
  }
`;

export const StyledImage = styled.div`
  @media ${device.md} {
    padding-top: 0.35rem;
  }
`;
export const CardNumber = styled.p`
  /* width: 70%; */
  font-size: 0.75rem;
  font-weight: 600;

  @media ${device.xl} {
    font-size: 0.9375rem;
  }

  @media ${device.base} {
    font-size: 1rem;
  }

  @media ${device.md} {
    font-size: 1.25rem;
  }
`;

export const CardExpiry = styled.p`
  /* width: 30%; */
  font-size: 0.75rem;
  font-weight: 600;

  @media ${device.xl} {
    font-size: 0.9375rem;
  }

  @media ${device.base} {
    font-size: 1rem;
  }

  @media ${device.md} {
    font-size: 1.25rem;
  }
`;