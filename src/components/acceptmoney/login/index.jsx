import Link from 'next/link';
import { Section, Div, InputContainer, Button } from '../../../shared';
import {
  LoginContainer,
  IconBack,
  StyledTitle,
  StyledForm,
  Row,
  Wrapper,
} from './loginStyles';

function LoginComponent() {
  return (
    <Section>
      <Div>
        <LoginContainer>
          <Wrapper>
            <Link href="/acceptmoney">
              <Row>
                <IconBack className="ri-arrow-left-s-line" /> Go back
              </Row>
            </Link>
          </Wrapper>

          <Wrapper>
            <StyledTitle>Login or create a new account</StyledTitle>

            <StyledForm>
              <InputContainer
                type="email"
                placeholder="youremail@gmail.com"
                id="email"
                legend="Email"
              />

              <InputContainer
                type="password"
                placeholder="yourpassword"
                id="password"
                legend="Password"
              />
            </StyledForm>
            <Button bg={`var(--violet)`}>Continue</Button>
          </Wrapper>
        </LoginContainer>
      </Div>
    </Section>
  );
}

export default LoginComponent;
