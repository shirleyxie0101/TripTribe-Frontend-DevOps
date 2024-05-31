import { useEffect, useState } from 'react';

export const useCountDown = () => {
  const [countDown, setCountDown] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown > 0) setCountDown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isDisabled]);

  return { countDown, isDisabled, setCountDown, setIsDisabled };
};
