import styled from 'styled-components';
import { device } from '../../../utils';

export const DownloadContainer = styled.div`
  color: white;
  border-radius: 0.375rem;
  background-color: var(--gray);
  padding: 2rem;

  @media ${device.md} {
    padding: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  max-width: 600px;
  font-weight: 200;
  opacity: 0.8;
  margin-bottom: 3rem;

  @media ${device.md} {
    font-size: 1.125rem;
    line-height: 2rem;
    margin: 0px;
  }

  @media ${device.lg} {
    font-size: 1.35rem;
    line-height: 2rem;
  }
`;

export const Spacer = styled.div`
  margin-bottom: 0.3rem;
`;
