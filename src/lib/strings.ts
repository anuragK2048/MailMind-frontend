export const wrapString = (string, maxChar) => {
  if (string.length <= maxChar) return string;
  const stringToDisplay = string.slice(0, maxChar);
  return `${stringToDisplay.trim()} ...`;
};
