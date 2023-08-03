import { useEffect, useState } from "react";

const RelativeDate = ({ date }: { date: string }) => {
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const then = new Date(date);
      const diff = now.getTime() - then.getTime();
      setMonths(Math.floor(diff / (1000 * 60 * 60 * 24 * 30)));
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor(diff / (1000 * 60 * 60)));
      setMinutes(Math.floor(diff / (1000 * 60)));
      setSeconds(Math.floor(diff / 1000));
    };
    compute();
    const interval = setInterval(compute, 1000);
    return () => clearInterval(interval);
  }, [date]);
  return (
    <span>
      {months > 0
        ? `${months} month${months > 1 ? "s" : ""} ago`
        : days > 0
        ? `${days} day${days > 1 ? "s" : ""} ago`
        : hours > 0
        ? `${hours} hour${hours > 1 ? "s" : ""} ago`
        : minutes > 0
        ? `${minutes} minute${minutes > 1 ? "s" : ""} ago`
        : `${seconds} second${seconds > 1 ? "s" : ""} ago`}
    </span>
  );
};

export default RelativeDate;
