import { Titlecontainer, H2, H3, H4, H5, H6, P, Small } from './typeStyled';

export const Title = ({ children }) => {
  return <Titlecontainer>{children}</Titlecontainer>;
};

export const Header2 = ({ children }) => {
  return <H2>{children}</H2>;
};

export const Header3 = ({ children }) => {
  return <H3>{children}</H3>;
};

export const Header4 = ({ children }) => {
  return <H4>{children}</H4>;
};

export const Header5 = ({ children }) => {
  return <H5>{children}</H5>;
};

export const Header6 = ({ children }) => {
  return <H6>{children}</H6>;
};

export const Paragraph = ({ children }) => {
  return <P>{children}</P>;
};

export const SmallText = ({ children }) => {
  return <Small>{children}</Small>;
};
