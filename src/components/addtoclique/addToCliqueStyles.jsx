import styled from 'styled-components';
import { device } from '../../utils';
import { Title } from '../../shared';

export const CliqueDiv = styled.div`
  width: 100%;
  margin: 0rem auto;
  max-width: 600px;
  /* border: 1px solid magenta; */
`;

export const SmallText = styled.small``;

export const Wrapper = styled.div`
  margin-top: 1rem;
`;

export const StyledTitle = styled(Title)`
  font-size: 1.5rem;

  @media ${device.md} {
    font-size: 1.8rem;
  }

  @media ${device.lg} {
    font-size: 2rem;
  }
`;

export const StyledSubTitle = styled(Title)`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray);

  @media ${device.md} {
    font-size: 1rem;
  }

  @media ${device.lg} {
    font-size: 1.5rem;
  }
`;

export const CliqueMembers = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  /* border: 1px solid magenta; */
  width: fit-content;
  margin-bottom: 2rem;

  & > div:not(:first-of-type) {
    margin-left: -0.7rem;
  }
`;

export const Member = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const Name = styled.p`
  margin-top: 0.5rem;
  font-size: 0.6rem;
  font-weight: 600;
`;

export const Details = styled.div`
  width: 100%;
  max-width: 350px;
`;
