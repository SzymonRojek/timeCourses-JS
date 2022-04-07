function countMinutesAndHours(seconds) {
  const secondsPerHour = 3600;
  const secondsPerMinute = 60;
  const minutesModule = ~~((seconds % secondsPerHour) / secondsPerMinute);
  const hoursModule = ~~(seconds / secondsPerHour);

  return [minutesModule, hoursModule];
}

export default countMinutesAndHours;
