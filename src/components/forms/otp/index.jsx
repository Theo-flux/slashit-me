import { useState, useEffect } from 'react';
import { OtpInputContainer } from '../../../shared';
import {
  FormContainer,
  Wrapper,
  Column,
  Content,
  StyledTitle,
  A,
} from '../formStyles';

const otp_item = [
  {
    id: 'otp_digit_0',
    name: 'otp_digit_0',
  },

  {
    id: 'otp_digit_1',
    name: 'otp_digit_1',
  },

  {
    id: 'otp_digit_2',
    name: 'otp_digit_2',
  },

  {
    id: 'otp_digit_3',
    name: 'otp_digit_3',
  },

  {
    id: 'otp_digit_4',
    name: 'otp_digit_4',
  },

  {
    id: 'otp_digit_5',
    name: 'otp_digit_5',
  },
];

function OtpForm() {
  const [otpData, setOtpData] = useState(['']);

  function handleOtpOnChange(event, index) {
    const { value } = event.target;

    setOtpData((otpStr) => {
      otpStr[index] = value;
      return otpStr;
    });

    if (value) {
      if (index < 5) {
        document.getElementById(`otp_digit_${index + 1}`).focus();
      } else {
        document.getElementById(`otp_digit_${index}`).focus();
      }
    }

    if (!otpData[index]) {
      event.target.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          document.getElementById(`otp_digit_${index - 1}`)?.focus();
        }
        event.target.value = '';
      });
    }
  }

  useEffect(() => {
    if (otpData.length === 0) {
      document.getElementById(`otp_digit_0`).focus();
    }
  }, [otpData]);

  return (
    <FormContainer>
      <Wrapper>
        <StyledTitle>Enter the code sent to your email</StyledTitle>

        <Column>
          <Content id="otp_digit_group">
            {otp_item.map((otp_item, index) => {
              return (
                <OtpInputContainer
                  key={index}
                  id={otp_item.id}
                  name={otp_item.name}
                  onChange={(e) => handleOtpOnChange(e, index)}
                />
              );
            })}
          </Content>
        </Column>
      </Wrapper>
    </FormContainer>
  );
}

export default OtpForm;
