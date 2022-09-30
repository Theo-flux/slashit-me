import styled from 'styled-components';
import { device } from '../../../utils';

export const DownloadContainer = styled.div`
  color: white;
  border-radius: 0.375rem;
  background-color: var(--gray);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${device.md} {
    padding: 3rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;

  @media ${device.md} {
    font-size: 3rem;
    text-align: left;
  }

  @media ${device.lg} {
    font-size: 3rem;
  }
`;

export const Wrapper = styled.div`
  @media ${device.md} {
    &:first-of-type {
      width: 60%;
    }
  }

  @media ${device.lg} {
    &:first-of-type {
      width: 70%;
    }
  }
`;

export const Text = styled.p`
  color: white;
  width: 100%;
  text-align: center;
  max-width: 600px;
  font-weight: 200;
  opacity: 0.8;
  margin-bottom: 3rem;

  @media ${device.md} {
    font-size: 1.125rem;
    line-height: 2rem;
    margin: 0px;
    text-align: left;
  }

  @media ${device.lg} {
    font-size: 1.35rem;
    line-height: 2rem;
  }
`;

export const Spacer = styled.div`
  margin-bottom: 0.3rem;
`;
