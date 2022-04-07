export function countMinutesAndHours(seconds) {
  const secondsPerHour = 3600;
  const secondsPerMinute = 60;
  const minutes = ~~((seconds % secondsPerHour) / secondsPerMinute);
  const hours = ~~(seconds / secondsPerHour);

  return [minutes, hours];
}

export default countMinutesAndHours;
