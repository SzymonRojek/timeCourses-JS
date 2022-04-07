export const getTotalDuration = (duration) => {
  const seconds = 60;

  return duration
    .map(({ length }) => length.split(":"))
    .flat()
    .reduce(
      (acc, currVal, i) => acc + (i % 2 === 0 ? +currVal * seconds : +currVal),
      0
    );
};
