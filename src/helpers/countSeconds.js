export const countSeconds = (duration) => {
  const splited = duration.split(":");

  const seconds = splited.reduce(
    (acc, currVal, i) => acc + (i % 2 === 0 ? +currVal * 60 : +currVal),
    0
  );

  return seconds;
};
