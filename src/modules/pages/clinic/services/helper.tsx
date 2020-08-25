import { clinicOpeningTime, clinicCloseTime } from '../constants';

// today mean is user's chosen day today
export const getRegistrationTimeRanges = (duration: number, today = false) => {
  const result: string[] = [];
  const date = new Date();

  date.setHours(clinicOpeningTime);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  // - 1 Hour To validate minutes
  while (date.getHours() <= clinicCloseTime - 1) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    (!today || date > new Date()) && result.push(`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`);
    date.setMinutes(date.getMinutes() + duration);
  }

  const lastHours = date.getHours();
  const lastMinutes = date.getMinutes();
  !lastMinutes && result.push(`${lastHours < 10 ? `0${lastHours}` : lastHours}:00`);

  return result;
}