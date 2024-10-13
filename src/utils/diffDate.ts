const diffDate = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = endDate === "9999-12-31" ? new Date() : new Date(endDate);

  let yearDiff = end.getFullYear() - start.getFullYear();
  let monthDiff = end.getMonth() - start.getMonth();
  if (monthDiff < 0) {
    yearDiff -= 1;
    monthDiff += 12;
  }

  return { year: yearDiff, month: monthDiff };
};

export default diffDate;
