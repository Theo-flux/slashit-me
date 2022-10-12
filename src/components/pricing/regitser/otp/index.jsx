import { useEffect } from 'react';
import { OtpInputContainer } from '../../../../shared';
import {
  RegisterContainer,
  Wrapper,
  Column,
  Content,
  StyledTitle,
  A,
} from '../registerStyles';

const otp_item = [
  {
    id: 'otp_digit_1',
    name: 'otp-digit_1',
    dataNext: 'otp_digit_2',
  },

  {
    id: 'otp_digit_2',
    name: 'otp-digit_2',
    dataNext: 'otp_digit_3',
    dataPrevious: 'otp_digit_1',
  },

  {
    id: 'otp_digit_3',
    name: 'otp-digit_3',
    dataNext: 'otp_digit_4',
    dataPrevious: 'otp_digit_2',
  },

  {
    id: 'otp_digit_4',
    name: 'otp-digit_4',
    dataNext: 'otp_digit_5',
    dataPrevious: 'otp_digit_3',
  },

  {
    id: 'otp_digit_5',
    name: 'otp-digit_5',
    dataNext: 'otp_digit_6',
    dataPrevious: 'otp_digit_5',
  },

  {
    id: 'otp_digit_6',
    name: 'otp-digit_6',
    dataNext: 'otp_digit_7',
    dataPrevious: 'otp_digit_5',
  },
];

function OtpForm() {
  useEffect(() => {
    const otpGroup = document.getElementById('otp_digit_group');

    otpGroup.childNodes.forEach((item) => {
      item.addEventListener('keyup', function (event) {
        let parent = item.parentElement;

        if (event.keyCode === 8 || event.keyCode === 37) {
          let prev = parent.querySelector(`input[data-previous]`);
          console.log(prev);

          if (prev.length) {
            prev.focus();
            prev.select();
          } else if (
            (event.keyCode >= 48 && event.keyCode <= 57) ||
            (event.keyCode >= 65 && event.keyCode <= 90) ||
            (event.keyCode >= 96 && event.keyCode <= 105) ||
            event.keyCode === 39
          ) {
            let next = parent.querySelector(`input[data-next]`);
            if (next.length) {
              next.focus();
              next.select();
            } else {
              if (parent.data('autosubmit')) {
                parent.submit();
              }
            }
          }
        }
      });
    });
  });
  return (
    <RegisterContainer>
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
                  dataNext={otp_item.dataNext}
                  dataPrevious={otp_item.dataPrevious}
                />
              );
            })}
          </Content>
        </Column>
      </Wrapper>
    </RegisterContainer>
  );
}

export default OtpForm;
