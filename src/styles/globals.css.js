import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

:root {
  --violet: #7521FF;
  --purple: #FF00D6;
  --gray: #1d1d1d;
  --alto: #d9d9d9;
  --link: #f8fafd;
  --silver: #C2C2C2;
  --supernova: #FFC701;
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

.reveal-ans {
  font-size: 0.9375rem;
  font-weight: 300;
  /* unshrink, then fade in */
  transition: font-size .25s,
  margin .25s,
  padding .25s,
  opacity .5s .25s;
}

.hide-ans {
  font-size: 0;
  margin: 0;
  opacity: 0;
  padding: 0;
  /* fade out, then shrink */
  transition: opacity .25s,
    font-size .5s .25s,
    margin .5s .25s,
    padding .5s .25s;
}
`;
