import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../../shared';

export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Icon = styled.i``;

export const IconCancel = styled(Icon)`
  align-self: flex-end;
  background-color: white;
  color: var(--silver);
  font-size: 2rem;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`;

export const IconCheck = styled(Icon)`
  color: var(--violet);
  font-size: 7rem;
`;

export const Message = styled.p`
  text-align: center;
  font-weight: 600;
  margin: 2rem 0;
`;

function Success({ resetBox }) {
  const anyAction = useSelector((state) => state.helper.anyAction);

  return (
    <SuccessContainer>
      <IconCancel onClick={() => resetBox()} className="ri-close-fill" />
      <Inner>
        <IconCheck className="ri-checkbox-circle-fill" />
        <Message>{anyAction?.message}</Message>
        <Button onClick={() => resetBox()} bg={`var(--violet)`} width={`100%`}>
          Pay another
        </Button>
      </Inner>
    </SuccessContainer>
  );
}

export default Success;
