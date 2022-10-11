import styled from 'styled-components';

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

export const Legend = styled.legend`
  font-size: 0.875rem;
  margin-bottom: 0.7rem;
`;

export const Input = styled.input`
  border-radius: 0.375rem;
  padding: 1rem;
  border: 1px solid var(--alto);
  width: 100%;

  &:focus {
    outline: 1px solid var(--violet);
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

  &:focus {
    outline: 1px solid var(--violet);
  }
`;

export const Error = styled.small``;

export const BoxRow = styled.span`
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--alto);
  border-radius: 0.375rem;

  & > input {
    border-radius: 0rem;
    border: 0rem;
  }

  &:hover,
  &:active {
    border: 1px solid var(--violet);
  }
`;
