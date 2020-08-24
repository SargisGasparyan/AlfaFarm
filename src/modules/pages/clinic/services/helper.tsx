export const getRegistrationTimeRanges = (duration: number, today = false) => {
  const result: string[] = [];
  const date = new Date();

  date.setHours(9);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  // 18:00 - 1 For starting minutes
  while (date.getHours() <= 17) {
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