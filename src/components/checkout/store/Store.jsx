import { useState } from 'react';
import { Button } from '../../../shared';
import {
  StoreContainer,
  StoreWrapper,
  ProfileContainer,
  Profile,
  ProfileInfo,
  ProfileImg,
  ProfileName,
  ProfileMail,
  OrderPrice,
  ProcessWrapper,
  ButtonWrapper,
} from './storeStyle';
import Confirmer from './confirmer/Confirmer';
import Orderer from './orderer/Orderer';
import Scheduler from './scheduler/Scheduler';

function Store() {
  const [openOrder, setOpenOrder] = useState(false);
  const [orderer, setOrderer] = useState({
    email: '',
    pass: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState({});

  function handleOrdererOnchange(event) {
    const { name, value } = event.target;

    setOrderer({ ...orderer, [name]: value });
  }

  function handleEmailContinue() {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!orderer.email) {
      setError({ ...error, email: 'Email is empty!' });
    } else if (!orderer.email.match(mailformat)) {
      setError({ ...error, email: 'Invalid Email!' });
    } else {
      setError({});
    }

    if (error?.email) {
      setShowPass(false);
    } else {
      setShowPass(true);
    }
  }

  return (
    <StoreContainer>
      <StoreWrapper>
        <ProfileContainer>
          <Profile>
            <ProfileImg src="/images/profile.png" alt="prpfile" />

            <ProfileInfo>
              <ProfileName>Kwik Stores</ProfileName>
              <ProfileMail>kwikstores@gmail.com</ProfileMail>
            </ProfileInfo>
          </Profile>

          <OrderPrice>
            <sup>NGN</sup> 12,002.00
          </OrderPrice>
        </ProfileContainer>

        <ProcessWrapper>
          <Orderer
            openOrder={openOrder}
            error={error}
            handleOrdererOnchange={handleOrdererOnchange}
          />
          <Scheduler />
          <Confirmer />
        </ProcessWrapper>

        <ButtonWrapper>
          {openOrder || (
            <Button onClick={() => setOpenOrder(true)} width={`100%`}>
              Pay now
            </Button>
          )}

          {openOrder && (
            <Button onClick={() => handleEmailContinue()} width={`100%`}>
              Continue
            </Button>
          )}
        </ButtonWrapper>
      </StoreWrapper>
    </StoreContainer>
  );
}

export default Store;
