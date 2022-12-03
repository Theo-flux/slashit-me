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
  --brown: #EDEDED;
  --border : #d9d9d950;
  --solitude : #E1EDFF;
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

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track{
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: var(--alto);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--violet);
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


.container {
  display: block;
  position: relative;
  padding-left: 2rem;
  margin-bottom: 2rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 0.875rem;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  background-color: #eee;
  border-radius: 2px;
  transition: 500ms all ease-in-out;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a violet background */
.container input:checked ~ .checkmark {
  transition: 500ms all ease-in-out;
  background-color: var(--violet);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  transition: 500ms all ease-in-out;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
  transition: 500ms all ease-in-out;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  transition: 500ms all ease-in-out;
  left: 8px;
  top: -3px;
  width: 3px;
  height: 10px;
  border: 0.2px solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

`;
