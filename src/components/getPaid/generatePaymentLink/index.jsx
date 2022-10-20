import { useState, useEffect } from 'react';
import { Button, InputContainer } from '../../../shared';
import {
  GenerateLinkForm,
  LinkSection,
  InfoBox,
  Icon,
  Row,
  Col,
} from './generatePaymentLinkStyles';
import { paymentDetailsValidator } from '../../../helpers';

const paymentItem = [
  {
    legend: 'Amount to collect',
    id: 'amount-to-collect',
    type: 'text',
    prefix: 'NGN',
    placeholder: '2000',
    name: 'amount',
  },

  {
    legend: 'Your mail',
    id: 'your-mail',
    type: 'mail',
    placeholder: 'youremail@gmail.com',
    name: 'mail',
  },

  {
    legend: 'Note (optional)',
    id: 'note',
    type: 'text',
    placeholder: 'Pay me on Slashit 🙏',
    name: 'note',
  },
];

function GeneratePaymentLink({ id }) {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    mail: '',
    note: '',
  });
  const [errors, setErrors] = useState({});

  function handlePaymentDetailsChange(event) {
    const { name, value } = event.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  }

  function handleGetPaymentLinkSubmit(paymentDetails) {
    const res = paymentDetailsValidator(paymentDetails);
    console.log(res);
    setErrors(res);
  }

  console.log(paymentDetails.amount);
  return (
    <GenerateLinkForm>
      <LinkSection id={id}>
        {paymentItem.map((item, index) => {
          const { name, id, legend, placeholder, type, prefix } = item;
          return (
            <InputContainer
              key={index}
              legend={legend}
              id={id}
              prefix={prefix}
              type={type}
              placeholder={placeholder}
              name={name}
              onChange={(e) => handlePaymentDetailsChange(e)}
              error={errors[`${name}`]}
            />
          );
        })}

        <InfoBox>
          <Icon className="fa-solid fa-circle-info"></Icon>
          By creating link, you agree to Slashit’s terms of use and privacy
          policy. We’ll also create a Merchant account for you on Slashit.
        </InfoBox>
      </LinkSection>

      <LinkSection>
        <Col>
          <Button
            bg={'var(--violet)'}
            onClick={() => handleGetPaymentLinkSubmit(paymentDetails)}
          >
            Create Link
          </Button>
        </Col>
      </LinkSection>
    </GenerateLinkForm>
  );
}

export default GeneratePaymentLink;
