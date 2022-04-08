const countDuration = (duration) => {
  const secondsPerMinute = 60;

  return duration
    .map(({ length }) => length.split(":"))
    .flat()
    .reduce((acc, currVal, i) => {
      const seconds = i % 2 === 0 ? +currVal * secondsPerMinute : +currVal;
      return acc + seconds;
    }, 0);
};

export default countDuration;