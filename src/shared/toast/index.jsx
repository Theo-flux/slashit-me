import { ToastContainer, ToastIcon, ToastText } from './toastStyles';

export const Toast = ({
  showToast,
  showIcon,
  text,
  backgroundColor,
  textColor,
  top,
  left,
  right,
  bottom,
}) => {
  return (
    <ToastContainer
      showToast={showToast}
      backgroundColor={backgroundColor}
      top={top}
      right={right}
      left={left}
      bottom={bottom}
    >
      <ToastText showIcon={showIcon} textColor={textColor}>
        {text}
      </ToastText>
      {showIcon && (
        <ToastIcon
          showIcon={showIcon}
          textColor={textColor}
          className={`ri-close-line`}
        />
      )}
    </ToastContainer>
  );
};
