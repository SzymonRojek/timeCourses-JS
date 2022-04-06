export function countMinutesAndHours(seconds) {
  const minutes = ~~((seconds % 3600) / 60);
  const hours = ~~(seconds / 3600);

  return [minutes, hours];
}
