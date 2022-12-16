import { useEffect, useState, useRef } from 'react';
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
  Error,
  Row,
  Col,
  Center,
  LinkMessage,
  LinkInfo,
} from './generatePaymentLinkStyles';
import { paymentDetailsValidator, recipientValidator } from '../../../helpers';
import {
  CreatePaymentLink,
  SharePaymentLink,
} from '../../../api/transactionAPI';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const paymentItem = [
  {
    legend: 'Amount to collect',
    id: 'amount-to-collect',
    type: 'text',
    prefix: 'NGN',
    placeholder: '20000',
    name: 'amount',
  },

  {
    legend: 'Your email',
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
  let toastMsg = '';
  const [showToast, setShowToast] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    mail: '',
    note: '',
  });
  const [recipient, setRecipient] = useState({ recipientMail: '' });
  const [errors, setErrors] = useState({});
  const [isValidated, setIsValidated] = useState(false);
  const [link, setLink] = useState('this link');

  function handlePaymentDetailsChange(event) {
    const { name, value } = event.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  }

  function handleRecipientMailChange(event) {
    const { name, value } = event.target;
    setRecipient({ ...recipient, [name]: value });
  }

  function handleGetPaymentLinkSubmit(paymentDetails) {
    const res = paymentDetailsValidator(paymentDetails);
    console.log(res);
    if (res.amount || res.mail) {
      setErrors(res);
    } else {
      //setIsValidated(!isValidated);
      //setErrors({});
      //Create payment link when there are no form errors //amount and mail are present
      createLink();
    }
  }

  function handleRecipientSubmit(recipient) {
    const res = recipientValidator(recipient);

    if (res.recipientMail) {
      setErrors(res);
    } else {
      setErrors({});
      shareLink();
    }
  }

  async function createLink() {
    let sendReq = await CreatePaymentLink(
      (currency = 'NGN'),
      paymentDetails.amount,
      paymentDetails.mail,
      paymentDetails.note,
    );

    if (sendReq.success) {
      setIsValidated(true);
      setLink(sendReq.result);
    } else {
      toastMsg = sendReq.message;
    }
  }

  async function shareLink() {
    let sendReq = await SharePaymentLink(recipient.recipientMail, link);
    if (sendReq.success) {
      toastMsg = 'Payment link has been sent';
    } else {
      toastMsg = sendReq.message;
    }
  }

  function resetBox() {
    setIsValidated(false);
    setPaymentDetails({
      amount: '',
      mail: '',
      note: '',
    });
  }

  useEffect(() => {
    if (toastMsg) {
      setShowToast(true);
    }
    setTimeout(() => setShowToast(false), 5000);
  }, [toastMsg]);

  useEffect(() => {
    return () => resetBox();
  }, []);

  let copyBtn = useRef(null);

  async function copyLink() {
    // console.log(acctEl.current.textContent);

    try {
      await navigator.clipboard.writeText(link);
      copyBtn.current.textContent = 'copied!';
      // console.log('Content copied to clipboard');
      setTimeout(() => {
        copyBtn.current.textContent = 'copy';
      }, 3000);
    } catch (err) {
      // console.error('Failed to copy: ', err);
    }
  }

  return (
    <GenerateLinkForm>
      {isValidated === true && (
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
              policy.
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

      {isValidated === false && (
        <LinkSection>
          <Row>
            <p></p>
            <CloseIcon onClick={() => resetBox()} className="ri-close-fill" />
          </Row>

          <Center>
            <CheckIcon className="ri-checkbox-circle-fill" />
            <LinkMessage>Link created successfully!</LinkMessage>
            <LinkInfo>
              Copy and share link now to collect your money with Slashit
            </LinkInfo>
            <Button
              ref={copyBtn}
              onClick={() => copyLink()}
              width={`100%`}
              bg={`var(--violet)`}
            >
              {/* {TODO - Copy Link url to clipboard  = ${APP_URL}/paymentLink/${link}} */}
              Copy link
            </Button>
            <LinkInfo>or</LinkInfo>
            Send link to cutomers’ email
            <MailContainer error={errors.recipientMail}>
              <MailInput
                name={'recipientMail'}
                type={'email'}
                placeholder={`Customer's Email`}
                onChange={(e) => handleRecipientMailChange(e)}
              />
              <ArrowIcon
                onClick={() => handleRecipientSubmit(recipient)}
                className={'ri-arrow-right-circle-fill'}
              />
            </MailContainer>
            <Error>{errors?.recipientMail}</Error>
          </Center>
        </LinkSection>
      )}
    </GenerateLinkForm>
  );
}

export default GeneratePaymentLink;
