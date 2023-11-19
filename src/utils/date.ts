import { format, parseISO } from 'date-fns';

export default function dateFormated({ dateString }: { dateString: string }) {
  // parse of 'Fri Nov 03 2023 18:25:20 GMT+0100 (Central European Standard Time)' give me RangeError: Invalid time value
  const date = parseISO(dateString);
  const res = format(date, 'dd.MM.yy');
  // or something like   format(      new Date(parseISO(dateString)),     `DD, MM YY`,     { locale: ruRU } )}
  return res;
}
