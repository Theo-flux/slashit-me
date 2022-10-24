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
} from './storeStyle';

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
      </StoreWrapper>
    </StoreContainer>
  );
}

export default Store;
