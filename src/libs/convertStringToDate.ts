export default function convertStringToDate(str: Date): string {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const date = new Date(+str - tzoffset);
    const formattedDate = date.toISOString().slice(0, 10);
    return formattedDate;
  };