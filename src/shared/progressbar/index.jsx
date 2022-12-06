import { useEffect, useState } from 'react';
import { Progress, Bar } from './progressStyles';

export const ProgressBar = ({ bgColor, loading }) => {
  const [meter, setMeter] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setMeter(meter + 10);
    }, 100);
    return () => {
      clearInterval(timer);
    };
  });

  if (!loading) return <></>;

  return (
    <Progress>
      <Bar bgColor={bgColor} meter={meter >= 100 ? 100 : meter}></Bar>
    </Progress>
  );
};
