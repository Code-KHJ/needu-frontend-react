const formattedDate = (date: Date) => {
  date.setHours(date.getHours() + 9);
  return date.toISOString();
};

export default formattedDate;
