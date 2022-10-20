import { useEffect, useState } from 'react';
import { Button, InputContainer } from '../../../shared';
import {
  GenerateLinkForm,
  LinkSection,
  InfoBox,
  Icon,
  CloseIcon,
  CheckIcon,
  ArrowIcon,
  MailInput,
  MailContainer,
  Row,
  Col,
  Center,
  LinkMessage,
  LinkInfo,
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
    type: 'email',
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
  const [isValidated, setIsValidated] = useState(false);

  function handlePaymentDetailsChange(event) {
    const { name, value } = event.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  }

  function handleGetPaymentLinkSubmit(paymentDetails) {
    const res = paymentDetailsValidator(paymentDetails);
    console.log(res);
    if (res.amount || res.mail) {
      setErrors(res);
    } else {
      setIsValidated(!isValidated);
      setErrors({});
    }
  }
  console.log(isValidated);

  return (
    <GenerateLinkForm>
      {isValidated === false && (
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
            <Icon className="ri-information-fill"></Icon>
            <p>
              By creating link, you agree to Slashit’s terms of use and privacy
              policy. We’ll also create a Merchant account for you on Slashit.
            </p>
          </InfoBox>

          <Col>
            <Button
              bg={'var(--violet)'}
              onClick={() => handleGetPaymentLinkSubmit(paymentDetails)}
            >
              Create Link
            </Button>
          </Col>
        </LinkSection>
      )}

      {isValidated === true && (
        <LinkSection>
          <Row>
            <p></p>
            <CloseIcon
              onClick={() => setIsValidated(false)}
              className="ri-close-fill"
            />
          </Row>

          <Center>
            <CheckIcon className="ri-checkbox-circle-fill" />
            <LinkMessage>Link created successfully!</LinkMessage>
            <LinkInfo>
              Copy and share link now to collect your money with Slashit
            </LinkInfo>
            <Button width={`100%`} bg={`var(--violet)`}>
              copy link
            </Button>
            <LinkInfo>or</LinkInfo>
            Send link to cutomers’ email
            <MailContainer>
              <MailInput
                name={'receiver-mail'}
                type={'email'}
                placeholder={`Receiver's Email`}
              />
              <ArrowIcon className={'ri-arrow-right-circle-fill'} />
            </MailContainer>
          </Center>
        </LinkSection>
      )}
    </GenerateLinkForm>
  );
}

export default GeneratePaymentLink;
