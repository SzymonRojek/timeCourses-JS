export const getTotalDuration = (duration) => {
  return duration
    .map(({ length }) => length.split(":"))
    .flat()
    .reduce(
      (acc, currVal, i) => acc + (i % 2 === 0 ? +currVal * 60 : +currVal),
      0
    );
};
