export const countSeconds = (duration) => {
  const splited = duration.split(":");
  const secondsPerMinute = 60;

  const totalSeconds = splited.reduce(
    (acc, currVal, i) =>
      acc + (i % 2 === 0 ? +currVal * secondsPerMinute : +currVal),
    0
  );

  return totalSeconds;
};
