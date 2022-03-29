export const generateConfirmationCode = () => {
  return new Array(6).fill('').map(() => (
    Math.floor(Math.random() * 10).toString()
  )).join('');
};