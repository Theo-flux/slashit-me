import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

:root {
  --violet: #6c21ff;
  --gray: #1d1d1d;
  --alto: #d9d9d9;
  --link: #f8fafd;
  --silver: #C2C2C2;
  --gr: linear-gradient(
    180deg,
    rgba(108, 33, 255, 0.2) 0%,
    rgba(237, 33, 255, 0.108) 100%
  );
}

html,
body {
  padding: 0;
  margin: 0;
  font-size: 0.9375rem;
  font-family: 'Montserrat', sans-serif;
}
`;
