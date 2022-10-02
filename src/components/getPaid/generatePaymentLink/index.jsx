import React from 'react';
import { Button, InputContainer } from '../../../shared';
import {
  GenerateLinkForm,
  LinkSection,
  InfoBox,
  Icon,
  Row,
  Col,
} from './generatePaymentLinkStyles';

function GeneratePaymentLink() {
  return (
    <GenerateLinkForm>
      <LinkSection>
        <InputContainer
          legend={`Amount to collect`}
          id={'amount-to-collect'}
          type={'text'}
          placeholder={'NGN 2000'}
        />

        <InputContainer
          legend={`Your mail`}
          id={'your-mail'}
          type={'email'}
          placeholder={'youremail@gmail.com'}
        />

        <InputContainer
          legend={`Note (optional)`}
          id={'note'}
          type={'text'}
          placeholder={'Pay me on Slashit 🙏'}
        />

        <InfoBox>
          <Icon className="fa-solid fa-circle-info"></Icon>
          By creating link, you agree to Slashit’s terms of use and privacy
          policy. We’ll also create a Merchant account for you on Slashit.
        </InfoBox>
      </LinkSection>

      <LinkSection>
        <Col>
          <Button bg={'var(--violet)'}>Create Link</Button>
        </Col>
      </LinkSection>
    </GenerateLinkForm>
  );
}

export default GeneratePaymentLink;
