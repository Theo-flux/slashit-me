import {
  ButtonContainer,
  InnerContainer,
  Icon,
  P,
  H3,
  StyledButton,
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

export const Button = ({ onClick, width, bg, type, children, disabled }) => {
  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      width={width}
      bg={bg}
      type={type}
    >
      {children}
    </StyledButton>
  );
};

export const LinkButton = ({ href, isDisabled, children }) => {
  return (
    <StyledLink href={`${isDisabled ? `${href}` : `#`}`}>
      <StyledContent isDisabled={isDisabled}>{children}</StyledContent>
    </StyledLink>
  );
};
