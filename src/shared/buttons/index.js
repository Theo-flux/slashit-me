import {
  ButtonContainer,
  InnerContainer,
  Icon,
  P,
  H3,
  AnchorButton,
  StyledLink,
  StyledContent,
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

export const Button = ({ width, bg, type, children }) => {
  return (
    <AnchorButton width={width} bg={bg} type={type}>
      {children}
    </AnchorButton>
  );
};

export const LinkButton = ({ href, isDisabled, children }) => {
  return (
    <StyledLink href={`${isDisabled ? `${href}` : `#`}`}>
      <StyledContent isDisabled={isDisabled}>{children}</StyledContent>
    </StyledLink>
  );
};
