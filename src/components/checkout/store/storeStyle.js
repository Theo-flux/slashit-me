import styled from 'styled-components';
import { device, transition } from '../../../utils';

export const StoreContainer = styled.aside`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 3rem;

  @media ${device.md} {
    width: 60%;
  }
`;

export const StoreWrapper = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #d9d9d950;
  border-radius: 0.375rem;
  padding: 2rem 1rem;
`;

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Profile = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const ProfileImg = styled.img`
  width: 40px;

  @media ${device.md} {
    width: 50px;
  }
`;

export const ProfileInfo = styled.div`
  margin-left: 1rem;
  width: fit-content;
  display: flex;
  flex-direction: column;
`;

export const ProfileName = styled.h3`
  margin-bottom: 0.2rem;
  font-size: 0.75rem;
  @media ${device.md} {
    font-size: 1rem;
  }
`;

export const ProfileMail = styled.p`
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;

  @media ${device.md} {
    max-width: 200px;
  }
`;

export const OrderPrice = styled.h3`
  font-size: 1rem;
  @media ${device.md} {
    font-size: 1rem;
  }
`;
