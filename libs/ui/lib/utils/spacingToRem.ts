export const spacingToRem = (
  spacingValue: number,
  remValue = 0
): string => {
  return `${spacingValue / 4 + remValue}rem`;
};
