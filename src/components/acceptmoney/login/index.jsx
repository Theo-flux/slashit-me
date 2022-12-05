import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import statusCode from '../../../api/statusCode';
import {
  Login,
  MerchantExist,
  ShopperExist,
} from '../../../api/userAPI';
import { useLocalStorage, useToast } from '../../../hooks';
import { Section, Div, InputContainer, Button } from '../../../shared';
import { setIsLoggedIn, setUser } from '../../../store/reducers/auth';
import {
  LoginContainer,
  IconBack,
  StyledTitle,
  StyledForm,
  Row,
  Wrapper,
} from './loginStyles';

function LoginComponent() {
  const dispatch = useDispatch();
  const [isMailValidated, setIsMailValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastOptions, toast] = useToast();
  const { setSession} = useLocalStorage();
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  function handleFormOnchange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleEmailSubmit() {
    let errors = {};
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!form.email) {
      errors.email = "Email can't be empty!";
    } else if (!form.email.match(mailformat)) {
      errors.email = 'Invalid email!';
    } else {
      errors = {};
    }

    if (errors.email) {
      setError(errors);
    } else {
      validateShopper();
    }
  }

  function handlePasswordSubmit() {
    let errors = {};

    if (!form.password) {
      errors.password = 'Enter password!';
    } else {
      errors = {};
    }

    if (errors.password) {
      setError(errors);
    } else {
      login();
    }
  }

  async function login() {
    setLoading(true);
    let userInfo = {
      email: form.email,
      password: form.password,
      platform: 'web',
      deviceId: `${computerInfo.platform} ${computerInfo.os}`,
      ipAddress: computerInfo.ip,
    };

    let sendReq = await Login(userInfo);
    if (sendReq.success) {
      setSession({ userInfo, token: sendReq.token });
      dispatch(setUser(sendReq.user));
    } else {
      toast({
        text: sendReq?.message,
        backgroundColor: 'red',
        textColor: '#fff',
        duration: 15000,
      });
    }
    setLoading(false);
    return;
  }

  // async functions
  async function validateShopper() {
    setLoading(true);
    let sendReq = await MerchantExist(form.email);
    if (sendReq.success) {
      setIsMailValidated(true);
    } else {
      toast({
        text: sendReq?.message,
        backgroundColor: 'red',
        textColor: '#fff',
        duration: 15000,
      });
    }
    setLoading(false);
    return;
  }

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
              {!isMailValidated ? (
                <InputContainer
                  type="email"
                  placeholder="youremail@gmail.com"
                  id="email"
                  legend="Email"
                  onChange={(e) => handleFormOnchange(e)}
                />
              ) : (
                <InputContainer
                  type="password"
                  placeholder="yourpassword"
                  id="password"
                  legend="Password"
                  onChange={(e) => handleFormOnchange(e)}
                />
              )}
            </StyledForm>
            <Button
              onClick={() => {
                !isMailValidated ? handleEmailSubmit() : handlePasswordSubmit();
              }}
              bg={`var(--violet)`}
            >
              Continue
            </Button>
          </Wrapper>
        </LoginContainer>
      </Div>
    </Section>
  );
}

export default LoginComponent;
