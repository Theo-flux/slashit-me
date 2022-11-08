import { ToastContainer, ToastIcon, ToastText } from './toastStyles';

export const Toast = ({
  showIcon,
  text,
  backgroundColor,
  textColor,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}) => {
  return (
    <ToastContainer
      backgroundColor={backgroundColor}
      topLeft={topLeft}
      topRight={topRight}
      bottomLeft={bottomLeft}
      bottomRight={bottomRight}
    >
      {showIcon && (
        <ToastIcon
          showIcon={showIcon}
          textColor={textColor}
          className={`ri-close-line`}
        />
      )}
      <ToastText showIcon={showIcon} textColor={textColor}>
        {text}
      </ToastText>
    </ToastContainer>
  );
};
