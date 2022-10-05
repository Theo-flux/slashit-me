import {
  Section,
  Div,
  InputContainer,
  TextAreaContainer,
  Button,
} from '../../shared';
import {
  ContactContainer,
  FormWrapper,
  Title,
  StyledInputContainer,
} from './contactusStyles';

const contactDetails = [
  {
    type: 'text',
    placeholder: 'first name',
    id: 'first-name',
    legend: 'First name',
  },

  {
    type: 'text',
    placeholder: 'last name',
    id: 'last-name',
    legend: 'Last name',
  },

  {
    type: 'email',
    placeholder: 'yourmail@gmail.com',
    id: 'email-address',
    legend: 'Email address',
  },
];

function Contact() {
  return (
    <Section>
      <Div>
        <ContactContainer>
          <Title>Reach out and we’ll get back to you as soon as possible</Title>

          <FormWrapper>
            {contactDetails.map((contact, index) => {
              const { placeholder, id, legend, type } = contact;
              return (
                <StyledInputContainer key={index}>
                  <InputContainer
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    legend={legend}
                  />
                </StyledInputContainer>
              );
            })}

            <StyledInputContainer>
              <TextAreaContainer
                legend={'How can we help you ?'}
                placeholder={'type here...'}
              />
            </StyledInputContainer>
          </FormWrapper>

          <Button>Send</Button>
        </ContactContainer>
      </Div>
    </Section>
  );
}

export default Contact;
