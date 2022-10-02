import React from 'react';
import { Button, InputContainer } from '../../../shared';
import { PayForm, PaySection, InfoBox, Icon, Row, Col } from './payStyles';

function Pay() {
  return (
    <PayForm>
      <PaySection>
        <InputContainer
          legend={`Amount to pay`}
          id={'amount-to-pay'}
          type={'text'}
          placeholder={'NGN 8000'}
        />

        <InputContainer
          legend={`Recepient mail`}
          id={'amount-to-pay'}
          type={'email'}
          placeholder={'receivermail@gmail.com'}
        />

        <InputContainer
          legend={`Your mail`}
          id={'your-mail'}
          type={'email'}
          placeholder={'youremail@gmail.com'}
        />

        <InfoBox>
          <Icon className="fa-solid fa-circle-info"></Icon>
          Use your Slashit email address if you have a Slashit account
        </InfoBox>
      </PaySection>

      <PaySection>
        <Row>
          <div>How you’ll pay</div>
          <div>
            4 x installments <i class="fa-solid fa-caret-down"></i>
          </div>
        </Row>
        <Row>
          <div>Recipient gets within minutes</div>
          <div>NGN 8000</div>
        </Row>
      </PaySection>

      <PaySection>
        <Row>
          <div>Due Today</div>
          <div>NGN 8000</div>
        </Row>
        <Col>
          <Button bg={'var(--violet)'}>Pay NGN 2000</Button>
        </Col>
      </PaySection>
    </PayForm>
  );
}

export default Pay;
