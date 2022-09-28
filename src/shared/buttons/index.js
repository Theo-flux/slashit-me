import {
  ButtonContainer,
  InnerContainer,
  Icon,
  P,
  H3,
  AnchorButton,
} from './button';

export const GetAppButton = ({ data }) => {
  const { icon, tag, title } = data;
  return (
    <ButtonContainer>
      <Icon className={icon} />
      <InnerContainer>
        <P>{tag}</P>
        <H3>{title}</H3>
      </InnerContainer>
    </ButtonContainer>
  );
};

export const Button = ({ children }) => {
  return <AnchorButton>{children}</AnchorButton>;
};
