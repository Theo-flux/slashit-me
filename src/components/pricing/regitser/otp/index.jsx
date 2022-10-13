import { useState, useEffect } from 'react';
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
    name: 'otp_digit_1',
    dataNext: 'otp_digit_2',
  },

  {
    id: 'otp_digit_2',
    name: 'otp_digit_2',
    dataNext: 'otp_digit_3',
    dataPrevious: 'otp_digit_1',
  },

  {
    id: 'otp_digit_3',
    name: 'otp_digit_3',
    dataNext: 'otp_digit_4',
    dataPrevious: 'otp_digit_2',
  },

  {
    id: 'otp_digit_4',
    name: 'otp_digit_4',
    dataNext: 'otp_digit_5',
    dataPrevious: 'otp_digit_3',
  },

  {
    id: 'otp_digit_5',
    name: 'otp_digit_5',
    dataNext: 'otp_digit_6',
    dataPrevious: 'otp_digit_5',
  },

  {
    id: 'otp_digit_6',
    name: 'otp_digit_6',
    dataNext: 'otp_digit_7',
    dataPrevious: 'otp_digit_5',
  },
];

function OtpForm() {
  const [otpData, setOtpData] = useState({
    otp_digit_1: '',
    otp_digit_2: '',
    otp_digit_3: '',
    otp_digit_4: '',
    otp_digit_5: '',
    otp_digit_6: '',
  });

  let otpDataCombination = '';

  function handleOtpOnChange(event, index) {
    const { name, value } = event.target;
    setOtpData({ ...otpData, [name]: parseInt(value) });
    let current = document.getElementById(`otp_digit_${index + 1}`);
    // console.log(current.value);

    if (current.value) {
      if (index < 5) {
        document.getElementById(`otp_digit_${index + 2}`).focus();
      } else {
        document.getElementById(`otp_digit_${index + 1}`).focus();
      }
    }
  }

  function combineData(otpData) {
    for (let el in otpData) {
      if (otpData[el] >= 0) otpDataCombination += otpData[el];
    }
    console.log(otpDataCombination);
  }

  useEffect(() => {
    combineData(otpData);
  }, [otpData]);

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
                  onChange={(e) => handleOtpOnChange(e, index)}
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
