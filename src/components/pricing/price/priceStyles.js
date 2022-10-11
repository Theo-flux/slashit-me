import styled from 'styled-components';
import { Title, Text } from '../../../shared';
import { device, transition } from '../../../utils';

export const PriceContainer = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 7rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  & > div {
    width: 100%;
    margin-bottom: 3em;
  }

  & > div:last-of-type {
    margin-bottom: 0em;
  }

  @media ${device.md} {
    & > div {
      width: 45%;
    }
  }
`;

export const Tag = styled.p`
  text-align: center;
  font-weight: 600;
  margin-bottom: 0.5rem;

  @media ${device.md} {
    font-size: 1.25rem;
  }
`;

export const StyledTitle = styled(Title)`
  text-align: center;
  font-weight: 800;
  margin-top: 1rem;
  font-size: 1.75rem;

  @media ${device.base} {
    font-size: 2rem;
  }

  @media ${device.md} {
    font-size: 2.5rem;
  }

  @media ${device.lg} {
    font-size: 3rem;
  }
`;

export const StyledText = styled(Text)`
  text-align: center;
`;

export const StyledType = styled.span`
  color: var(--violet);
  border: 1.5px solid var(--supernova);
  border-radius: 50%;
  padding: 0.3rem 1rem 0.3rem 0rem;

  @media ${device.md} {
    border: 3px solid var(--supernova);
  }
`;
