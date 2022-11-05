import Image from 'next/image';
import styled from 'styled-components';
import { device } from '../../utils';

export const Box = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

export const Prefix = styled.p`
  display: flex;
  padding: 0rem 0.5rem;
  border-right: 1px solid var(--alto);
  color: var(--silver);
`;

export const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.7rem;
  /* border: 1px solid magenta; */
`;

export const Input = styled.input`
  border-radius: 0.375rem;
  padding: 1rem;
  border: 1px solid var(--alto);
  width: 100%;
  outline: 0px;
  height: 100%;

  /* &:focus {
    outline: 1px solid var(--violet);
    ${(props) => (props.error ? 'outline: 1px solid red;' : '')}
  }

  &:invalid {
    outline: 1px solid red;
  } */
`;

export const StyledImage = styled.div`
  padding-top: 0.45rem;
  padding-left: 0.5rem;
  @media ${device.md} {
    padding-top: 0.35rem;
  }
`;

export const Select = styled.select`
  border-radius: 0.375rem;
  background-color: white;
  padding: 1rem;
  border: 1px solid var(--alto);
  width: 100%;

  &:focus {
    outline: 1px solid var(--violet);
  }

  & * {
    padding: 1rem;
    background-color: white;
  }
`;

export const Textarea = styled.textarea`
  border-radius: 0.375rem;
  padding: 1rem;
  border: 1px solid var(--alto);
  width: 100%;
  resize: none;
  margin-top: 0.7rem;

  &:focus {
    outline: 1px solid var(--violet);
  }
`;

export const Error = styled.small`
  color: red;
`;

export const BoxRow = styled.span`
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--alto);
  border-radius: 0.375rem;
  margin-top: 0.7rem;

  & > input {
    border-radius: 0rem;
    border: 0rem;
  }

  &:hover,
  &:active {
    border: 1px solid var(--violet);
    ${(props) => (props.error ? 'border: 1px solid red;' : '')}
  }

  &:focus {
    border: 1px solid var(--violet);
    ${(props) => (props.error ? 'border: 1px solid red;' : '')}
  }

  ${(props) => (props.error ? 'border: 1px solid red;' : '')}
  ${(props) => (props.error ? 'margin-bottom: 0.5rem;' : '')}
`;

export const OtpInput = styled.input`
  width: 35px;
  height: 35px;
  background-color: white;
  border: 1px solid var(--alto);
  border-radius: 0.175rem;
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  font-weight: 200;
  margin-right: 0.3rem;
  font-weight: 600;

  &:focus {
    outline: 1px solid var(--violet);
  }

  @media ${device.base} {
    width: 40px;
    height: 40px;
    margin-right: 0.75rem;
    border-radius: 0.375rem;
  }

  @media ${device.md} {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
    border-radius: 0.375rem;
  }
`;
