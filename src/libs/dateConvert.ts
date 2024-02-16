export function convertDateToString(date: Date): string {
  const tzoffset = (new Date()).getTimezoneOffset() * 60000;
  const newDate = new Date(+date - tzoffset);
  const formattedDate = newDate.toISOString().slice(0, 10);
  return formattedDate;
};

export function timeZoneSkip(date: Date): Date {
  const tzoffset = (new Date()).getTimezoneOffset() * 60000;
  const newDate = new Date(+date - tzoffset);
  return newDate;
}