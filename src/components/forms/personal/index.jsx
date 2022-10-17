import Link from 'next/link';
import { InputContainer, PhoneInputContainer, Button } from '../../../shared';
import {
  FormContainer,
  Wrapper,
  Row,
  Column,
  StyledText,
  StyledTitle,
  A,
} from '../formStyles';

const personal_item = [
  {
    type: 'text',
    legend: 'First Name',
    placeholder: 'First name',
    id: 'first_name',
  },

  {
    type: 'text',
    legend: 'First Name',
    placeholder: 'Last name',
    id: 'first_name',
  },

  {
    type: 'email',
    legend: 'Email address',
    placeholder: 'yourmail@gmail.com',
    id: 'email_address',
  },

  {
    type: 'phone',
    legend: 'Phone Number',
    placeholder: '081 2345 6789',
    id: 'phone_number',
  },
];

function PersonalForm({ handleActive }) {
  return (
    <FormContainer>
      <Wrapper>
        <StyledTitle>Let’s get to know you</StyledTitle>
        <StyledText>Provide some basic information about yourself</StyledText>
        <Row>
          {personal_item.slice(0, 2).map((reg, index) => {
            const { type, legend, placeholder, id } = reg;
            return (
              <InputContainer
                key={index}
                type={type}
                legend={legend}
                placeholder={placeholder}
                id={id}
              />
            );
          })}
        </Row>

        <Column>
          {personal_item.slice(2).map((reg, index) => {
            const { type, legend, placeholder, id } = reg;
            return (
              <>
                {type !== 'phone' ? (
                  <InputContainer
                    key={index}
                    type={type}
                    legend={legend}
                    placeholder={placeholder}
                    id={id}
                  />
                ) : (
                  <PhoneInputContainer
                    key={index}
                    type={type}
                    legend={legend}
                    placeholder={placeholder}
                    id={id}
                  />
                )}
              </>
            );
          })}
        </Column>
        <Button width={`100%`} onClick={() => handleActive('business')}>
          Next
        </Button>

        <Column>
          <Link href={'/'}>
            <A>Already have an account?</A>
          </Link>
        </Column>
      </Wrapper>
    </FormContainer>
  );
}

export default PersonalForm;
