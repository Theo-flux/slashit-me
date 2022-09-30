import styled from 'styled-components';
import { device } from '../../../utils';

export const BannerContainer = styled.div`
  background: url('./images/getpaid-banner-mobile.png') no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 500px;

  @media ${device.base} {
    background: url('./images/getpaid-banner-tablet.png') no-repeat;
    background-position: right center;
  }

  @media ${device.md} {
    background: url('./images/getpaid-banner-desktop.png') no-repeat;
    background-position: right center;
    height: 700px;
  }
`;
