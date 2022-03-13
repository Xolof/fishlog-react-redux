export default () => {
  const today = new Date();
  const fullYear = today.getFullYear();
  let month = today.getMonth() + 1;
  month = parseInt(month) < 10 ? "0" + month.toString() : month;
  const date = today.getDate();
  return `${fullYear}-${month}-${date}`;
};
