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

  @media ${device.lg} {
    width: 60%;
  }
`;

export const StoreWrapper = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #d9d9d950;
  border-radius: 0.375rem;
  padding: 1rem;
`;

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d950;
  padding: 1rem 0rem;
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
  max-width: 50px;

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

export const ProcessWrapper = styled.div`
  margin: 2rem 0rem 8rem 0;
  border-radius: 0.375rem;
  overflow: hidden;
  border: 1px solid #d9d9d950;

  @media ${device.lg} {
    border: none;
  }
`;

export const ProcessContent = styled.div``;

export const EnvelopeCover = styled.div``;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1rem;
  cursor: pointer;

  background: linear-gradient(
    115.34deg,
    rgba(108, 33, 255, 0.3) 54.39%,
    rgba(255, 0, 214, 0.3) 72.64%
  );

  border-bottom: 1px solid #00000015;

  @media ${device.lg} {
    display: none;
  }
`;

export const ItemPod = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const ItemText = styled.p`
  margin-left: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
`;

export const Icon = styled.i`
  font-size: 1.5rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Text = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 500px;
`;
