import styled from 'styled-components';

export const Box = styled.div`
  width: 100%;
  margin-bottom: 1rem;
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
