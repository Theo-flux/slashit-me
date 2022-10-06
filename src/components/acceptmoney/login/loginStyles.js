import styled from 'styled-components';
import { Title } from '../../../shared';
import { device } from '../../../utils';

export const LoginContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid magenta; */
  height: 100%;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 350px;
  /* border: 1px solid magenta; */

  margin-bottom: 1.5rem;

  &:last-of-type {
    margin-bottom: 0rem;
  }

  & > button {
    width: 100%;
  }
`;

export const Row = styled.div`
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.875rem;
  cursor: pointer;


  &:hover {
    color: var(--violet);
  }
`;

export const IconBack = styled.i`
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;

export const StyledTitle = styled(Title)`
  font-size: 1.125rem;
  text-align: center;

  @media ${device.md} {
    font-size: 1.5rem;
  }

  @media ${device.lg} {
    font-size: 1.5rem;
  }
`;

export const StyledForm = styled.form`
  /* border: 1px solid magenta; */
  width: 100%;
  margin-top: 1.5rem;

  & > div {
    margin-bottom: 2rem;
  }
`;
