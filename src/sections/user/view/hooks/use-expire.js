import { useCallback, useEffect, useMemo, useState } from "react";
// Date
import moment from "moment";

// ----------------------------------------------------------------------

export default function useExpire(endDate) {
  const [detailedTime, setDetailedTime] = useState(endDate);

  const getArabicNounForm = useCallback(
    (count, singular, dual, plural) => {
      if (count === 0) {
        return "";
      } if (count === 1) {
        return singular;
      } if (count === 2) {
        return dual;
      } if (count >= 3 && count <= 10) {
        return plural;
      } 
        return "";
      
    },
    []
  );

  const calculateTime = useCallback(() => {
    const now = moment();
    const futureDate = moment(endDate);
    const duration = moment.duration(futureDate.diff(now));
    const days = duration.days();
    const weeks = Math.floor(days / 7);
    const months = duration.months();
    const years = duration.years();
    const isPast = duration.asMilliseconds() < 0;
    const yearForm = getArabicNounForm(years, "سنة", "سنتين", "سنوات");
    const monthForm = getArabicNounForm(months, "شهر", "شهرين", "أشهر");
    const weekForm = getArabicNounForm(weeks % 4, "أسبوع", "أسبوعين", "أسابيع");
    const dayForm = getArabicNounForm(days % 7, "يوم", "يومين", "أيام");

    const yearString = yearForm ? `${years === 2 ? yearForm : `${years} ${yearForm}`}` : "";
    const monthString = monthForm ? `${months === 2 ? monthForm : ` و ${months} ${monthForm}`}` : "";
    const weekString = weekForm ? `${weeks === 2 ? weekForm : ` و ${weeks} ${weekForm}`}` : "";
    const dayString = dayForm ? `${days % 7 === 2 ? dayForm : ` و ${days % 7} ${dayForm}`}` : '';

    return isPast
      ? `انتهى منذ ${monthString}${weekString}${dayString}`
      : `ينتهي بعد ${yearString}${monthString}${weekString}${dayString}`;
  }, [endDate, getArabicNounForm]);

  const memoizedTime = useMemo(() => calculateTime(), [calculateTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDetailedTime(memoizedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [memoizedTime]);

  return detailedTime;
}
