import styled from 'styled-components';
import { InputContainer } from '../../shared';
import { device, transition } from '../../utils';

export const ContactContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
`;

export const FormWrapper = styled.form`
  width: 100%;
  max-width: 400px;
  margin-top: 1.5rem;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
  margin: 2rem 0;
  width: 100%;
  max-width: 900px;

  @media ${device.md} {
    font-size: 2.3rem;
    max-width: 800px;
  }

  @media ${device.lg} {
    font-size: 3rem;
  }
`;

export const Text = styled.p`
  width: 100%;
  max-width: 600px;
  font-weight: 200;
  color: var(--gray);
  opacity: 0.8;

  @media ${device.md} {
    font-size: 1.125rem;
    line-height: 2rem;
  }

  @media ${device.lg} {
    font-size: 1.35rem;
    line-height: 2rem;
  }
`;

export const Clipper = styled.span`
  color: var(--violet);
  text-decoration: line-through 5px var(--gray);
`;

export const StyledInputContainer = styled.div`
  margin-bottom: 2rem;
`;
