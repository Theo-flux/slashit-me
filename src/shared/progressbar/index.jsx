import { Progress, Bar } from './progressStyles';

export const ProgressBar = ({ meter, bgColor }) => {
  return (
    <Progress>
      <Bar bgColor={bgColor} meter={meter}></Bar>
    </Progress>
  );
};
