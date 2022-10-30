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
          <Orderer />
          <Scheduler />
          <Confirmer />
        </ProcessWrapper>

        <ButtonWrapper>
          <Button width={`100%`}>Pay now</Button>
        </ButtonWrapper>
      </StoreWrapper>
    </StoreContainer>
  );
}

export default Store;
