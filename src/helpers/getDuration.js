const getDuration = (duration) => {
  const secondsPerMinute = 60;

  return duration
    .map(({ length }) => length.split(":"))
    .flat()
    .reduce(
      (acc, currVal, i) =>
        acc + (i % 2 === 0 ? +currVal * secondsPerMinute : +currVal),
      0
    );
};

export default getDuration;
